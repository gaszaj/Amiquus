// src/actions/index.ts
import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro:schema'; // CORRECT IMPORT FOR ZOD

// Define the schema for your form inputs
// Names should match the 'name' attributes in your form
const orderFormSchema = z.object({
  productTitle: z.string(), // Hidden field for email subject
  Name: z.string().min(1, { message: "Ime je obvezno." }),
  "Last Name": z.string().min(1, { message: "Priimek je obvezen." }),
  Company: z.string().optional(),
  "VAT ID": z.string().optional(),
  Street: z.string().min(1, { message: "Ulica je obvezna." }),
  Location: z.string().min(1, { message: "Kraj je obvezen." }),
  "Postal Code": z.string().min(1, { message: "Poštna številka je obvezna." }),
  email: z.string().email({ message: "Vnesite veljaven e-poštni naslov." }),
  "Telephone Number": z.string().min(1, { message: "Telefonska številka je obvezna." }),
  Quantity: z.string().min(1, { message: "Količina je obvezna." }),
  Payment: z.string().min(1, { message: "Način plačila je obvezen." }),
  Message: z.string().optional(),
  Conditions: z.literal("on", { errorMap: () => ({ message: "Strinjanje s pogoji je obvezno." }) }),
});

export const server = {
  submitOrder: defineAction({
    accept: 'form', // To accept FormData
    input: orderFormSchema,
    handler: async (formData) => {
      try {
        // Ensure environment variables are loaded. If these are undefined, it could cause issues.
        const apiKey = import.meta.env.EMAILIT_API_KEY;
        const fromName = import.meta.env.EMAIL_FROM_NAME;
        const fromAddress = import.meta.env.EMAIL_FROM_ADDRESS;
        const toAddress = import.meta.env.EMAIL_TO_ADDRESS;

        if (!apiKey || !fromName || !fromAddress || !toAddress) {
          console.error("Missing one or more email environment variables!");
          throw new ActionError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Konfiguracija strežnika ni popolna. Prosimo, obvestite administratorja.',
          });
        }

        const emailSubject = `Novo naročilo: ${formData.productTitle}`;
        const customerEmail = formData.email;

        let emailHtmlBody = `<h3>Podatki o naročilu za ${formData.productTitle}:</h3><ul>`;
        const fieldLabels: Record<string, string> = {
          Name: "Ime",
          "Last Name": "Priimek",
          Company: "Podjetje",
          "VAT ID": "ID za DDV",
          Street: "Ulica",
          Location: "Kraj",
          "Postal Code": "Poštna številka",
          email: "Elektronski naslov",
          "Telephone Number": "Telefonska številka",
          Quantity: "Količina",
          Payment: "Način plačila",
          Message: "Sporočilo",
          Conditions: "Strinjanje s pogoji",
        };

        for (const [key, value] of Object.entries(formData)) {
          if (key === "productTitle") continue; 

          const label = fieldLabels[key as keyof typeof fieldLabels] || key;
          let displayValue = String(value); // Ensure value is a string for display
          if (key === "Conditions" && value === "on") {
            displayValue = "DA";
          }
          // Check if value is not undefined or null. Empty strings are okay for optional fields.
          if (value !== undefined && value !== null) {
             emailHtmlBody += `<li><strong>${label}:</strong> ${displayValue}</li>`;
          } else if (key === "Company" || key === "VAT ID" || key === "Message"){ 
             emailHtmlBody += `<li><strong>${label}:</strong> (ni vneseno)</li>`;
          }
        }
        emailHtmlBody += `</ul>`;

        const emailPayload = {
          from: `${fromName} <${fromAddress}>`,
          to: toAddress,
          reply_to: customerEmail,
          subject: emailSubject,
          html: emailHtmlBody,
        };

        const response = await fetch('https://api.emailit.com/v1/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailPayload),
        });

        if (!response.ok) {
          const errorBody = await response.json().catch(() => ({ message: "Unknown error sending email" }));
          console.error('Emailit API Error:', response.status, errorBody);
          throw new ActionError({
            code: 'INTERNAL_SERVER_ERROR',
            message: `Napaka pri pošiljanju naročila (${response.status}). Poskusite znova kasneje. ${errorBody.message || ''}`,
          });
        }

        return { success: true, message: "Naročilo uspešno oddano!" };

      } catch (error) {
        console.error('Error in submitOrder action:', error);
        if (error instanceof ActionError) {
          throw error;
        }
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Prišlo je do nepričakovane napake pri obdelavi naročila.',
        });
      }
    },
  }),
};