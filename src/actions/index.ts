// src/actions/index.ts
import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro:schema';

// Define the schema for your form inputs
// Names should match the 'name' attributes in your form
const orderFormSchema = z.object({
  productTitle: z.string(),
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
  pageUrl: z.string().url({ message: "URL strani ni veljaven." }),
});

export const server = {
  submitOrder: defineAction({
    accept: 'form',
    input: orderFormSchema,
    handler: async (formData) => {
      try {
        const apiKey = import.meta.env.EMAILIT_API_KEY;
        const fromName = import.meta.env.EMAIL_FROM_NAME;
        const fromAddress = import.meta.env.EMAIL_FROM_ADDRESS;
        const adminToAddress = import.meta.env.EMAIL_TO_ADDRESS;
        const customerConfirmationSubject = "Hvala za vaše naročilo"; // Hardcoded subject

        if (!apiKey || !fromName || !fromAddress || !adminToAddress) {
          console.error("Missing one or more email environment variables!");
          throw new ActionError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Konfiguracija strežnika ni popolna. Prosimo, obvestite administratorja.',
          });
        }

        const adminEmailSubject = `Novo naročilo: ${formData.productTitle}`;
        const customerEmailAddress = formData.email;
        const submissionDate = new Date().toLocaleString('sl-SI', {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', hour12: false
        });

        const fieldLabels: Record<string, string> = {
          productTitle: "Izdelek",
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
          // pageUrl will be handled specially for the admin email body
        };
        
        // --- 1. Send Email to Admin ---
        let adminEmailHtmlBody = `<h3>Podatki o naročilu za ${formData.productTitle}:</h3><ul>`;
        
        // Create an ordered list of keys for admin email, to control sequence if desired
        const adminEmailFieldOrder: (keyof typeof formData)[] = [
            "Name", "Last Name", "Company", "VAT ID", 
            "Street", "Location", "Postal Code", "email", "Telephone Number",
            "Quantity", "Payment", "Message", "Conditions" 
            // productTitle is in subject, pageUrl and submissionDate handled separately
        ];

        for (const key of adminEmailFieldOrder) {
            const value = formData[key as keyof typeof formData]; // Cast key
            const label = fieldLabels[key as keyof typeof fieldLabels] || key;
            let displayValue = String(value);

            if (key === "Conditions" && value === "on") {
                displayValue = "DA";
            }

            if (value !== undefined && value !== null) {
                adminEmailHtmlBody += `<li><strong>${label}:</strong> ${displayValue}</li>`;
            } else if (key === "Company" || key === "VAT ID" || key === "Message"){ // Explicitly show as (ni vneseno)
                adminEmailHtmlBody += `<li><strong>${label}:</strong> (ni vneseno)</li>`;
            }
        }
        // Add Submission Date and Page URL to admin email
        adminEmailHtmlBody += `<li><strong>Datum oddaje:</strong> ${submissionDate}</li>`;
        adminEmailHtmlBody += `<li><strong>URL oddaje:</strong> <a href="${formData.pageUrl}">${formData.pageUrl}</a></li>`;
        adminEmailHtmlBody += `</ul>`;

        const adminEmailPayload = {
          from: `${fromName} <${fromAddress}>`,
          to: adminToAddress,
          reply_to: customerEmailAddress,
          subject: adminEmailSubject,
          html: adminEmailHtmlBody,
        };

        const adminResponse = await fetch('https://api.emailit.com/v1/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(adminEmailPayload),
        });

        if (!adminResponse.ok) {
          const errorBody = await adminResponse.json().catch(() => ({ message: "Unknown error sending admin email" }));
          console.error('Emailit API Error (Admin Email):', adminResponse.status, errorBody);
          throw new ActionError({
            code: 'INTERNAL_SERVER_ERROR',
            message: `Napaka pri pošiljanju naročila administratorju (${adminResponse.status}). ${errorBody.message || ''}`,
          });
        }

        // --- 2. Send Confirmation Email to Customer ---
        let customerEmailHtmlBody = `<p>Na spletni strani EUSIGNAL.com ste pravkar oddali naročilo. Tukaj so podatki vašega naročila:</p><ul>`;
        
        const customerEmailFieldOrder: (keyof typeof formData)[] = [
            "productTitle", "Name", "Last Name", "Company", "VAT ID", 
            "Street", "Location", "Postal Code", "email", "Telephone Number",
            "Quantity", "Payment", "Message", "Conditions"
        ];

        for (const key of customerEmailFieldOrder) {
            const value = formData[key];
            const label = fieldLabels[key] || key; 
            let displayValue = value !== undefined && value !== null ? String(value) : '(ni vneseno)';

            if (key === "Conditions" && value === "on") {
                displayValue = "DA";
            }
            if (key === "Company" || key === "VAT ID" || key === "Message") {
                if (value === undefined || value === null || String(value).trim() === '') {
                    displayValue = '(ni vneseno)';
                }
            }
            customerEmailHtmlBody += `<li><strong>${label}:</strong> ${displayValue}</li>`;
        }
        
        customerEmailHtmlBody += `<li><strong>Datum:</strong> ${submissionDate}</li>`;
        customerEmailHtmlBody += `<li><strong>URL:</strong> <a href="${formData.pageUrl}">${formData.pageUrl}</a></li>`;
        customerEmailHtmlBody += `</ul>`;
        customerEmailHtmlBody += `<p>V kolikor to niste bili vi, potem na ta mail odgovorite z "POMOTA".</p><p>Lep pozdrav</p>`;

        const customerEmailPayload = {
          from: `${fromName} <${fromAddress}>`,
          to: customerEmailAddress, 
          reply_to: fromAddress, 
          subject: customerConfirmationSubject,
          html: customerEmailHtmlBody,
        };

        const customerResponse = await fetch('https://api.emailit.com/v1/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(customerEmailPayload),
        });

        if (!customerResponse.ok) {
          const errorBody = await customerResponse.json().catch(() => ({ message: "Unknown error sending customer confirmation" }));
          console.error('Emailit API Error (Customer Email):', customerResponse.status, errorBody);
        }

        return { success: true, message: "Naročilo uspešno oddano! Potrditev smo vam poslali tudi na vaš e-naslov." };

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