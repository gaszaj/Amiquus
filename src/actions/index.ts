// Path: src/actions/index.ts
// Purpose: Server-side actions for form submissions and email handling. Internationalized.
// Dependencies: astro:actions, zod, fs/promises for reading i18n data.

import { defineAction, ActionError } from 'astro:actions';
import { z } from 'zod';
import commonData from '../data/common.json';

// --- Type Definition for our i18n object ---
type CommonData = typeof commonData[0];

/**
 * Retrieves the translation object for a given locale.
 * @param locale The locale string (e.g., 'si', 'hr').
 * @returns The corresponding translation object from common.json.
 */
function getTranslationsForLocale(locale: string): CommonData | undefined {
  const translations = commonData.find(lang => lang.M_SLUG === locale);
  if (!translations) {
    console.error(`No translations found for locale: ${locale}. Falling back to the first available.`);
    return commonData[0]; // Fallback to the first language (e.g., Slovenian)
  }
  return translations;
}

// --- Dynamic Order Form Schema ---
// Validation messages are now handled on the client-side using data from common.json.
// The schema ensures data integrity on the server.
const orderFormSchema = z.object({
  productTitle: z.string(),
  Name: z.string().min(1),
  "Last Name": z.string().min(1),
  Company: z.string().optional(),
  "VAT ID": z.string().optional(),
  Street: z.string().min(1),
  Location: z.string().min(1),
  "Postal Code": z.string().min(1),
  email: z.string().email(),
  "Telephone Number": z.string().min(1),
  Quantity: z.string().min(1),
  Payment: z.string().min(1),
  Message: z.string().optional(),
  Conditions: z.literal("on"),
  pageUrl: z.string().url(),
  locale: z.string().min(1), // Crucial for i18n
});

// --- Dynamic Contact Form Schema ---
const contactFormSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
  terms: z.literal("on"),
  pageUrl: z.string().url(),
  pageTitle: z.string().min(1),
  locale: z.string().min(1), // Crucial for i18n
});

// --- Shared Email Sending Logic ---
async function sendEmail(payload: object, apiKey: string) {
    return fetch('https://api.emailit.com/v1/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
}


// --- ACTIONS ---

export const submitOrder = defineAction({
  accept: 'form',
  input: orderFormSchema,
  handler: async (formData) => {
    const common = getTranslationsForLocale(formData.locale);
    if (!common) {
      throw new ActionError({ code: 'BAD_REQUEST', message: 'Invalid locale provided.' });
    }

    try {
      const apiKey = import.meta.env.EMAILIT_API_KEY;
      const fromName = import.meta.env.EMAIL_FROM_NAME;
      const fromAddress = import.meta.env.EMAIL_FROM_ADDRESS;
      const adminToAddress = import.meta.env.EMAIL_TO_ADDRESS;
      
      if (!apiKey || !fromName || !fromAddress || !adminToAddress) {
        console.error("Missing one or more email environment variables!");
        throw new ActionError({ code: 'INTERNAL_SERVER_ERROR', message: common.FORM_EMAIL_ERROR_CONFIG });
      }

      const adminEmailSubject = `${common.FORM_EMAIL_ORDER_ADMIN_SUBJECT}: ${formData.productTitle}`;
      const customerEmailAddress = formData.email;
      const submissionDate = new Date().toLocaleString(common.PAGE_LOCALE.replace('-', '_'), {
          year: 'numeric', month: '2-digit', day: '2-digit',
          hour: '2-digit', minute: '2-digit', hour12: false
      });

      const fieldLabels = {
        productTitle: common.FORM_LABEL_PRODUCT,
        Name: common.FORM_LABEL_NAME.replace('*', ''),
        "Last Name": common.FORM_LABEL_SURNAME.replace('*', ''),
        Company: common.FORM_LABEL_COMPANY.replace(' (ni obvezno)', ''),
        "VAT ID": common.FORM_LABEL_VAT_ID.replace(' (izpolni samo podjetje)', ''),
        Street: common.FORM_LABEL_STREET.replace('*', ''),
        Location: common.FORM_LABEL_CITY.replace('*', ''),
        "Postal Code": common.FORM_LABEL_ZIP.replace('*', ''),
        email: common.FORM_LABEL_EMAIL.replace('*', ''),
        "Telephone Number": common.FORM_LABEL_PHONE.replace('*', ''),
        Quantity: common.FORM_LABEL_QUANTITY.replace('*', ''),
        Payment: common.FORM_LABEL_PAYMENT,
        Message: common.FORM_LABEL_MESSAGE,
        Conditions: common.FORM_LABEL_TERMS.replace('*', ''),
      };
      
      const adminEmailFieldOrder: (keyof typeof formData)[] = [
          "Name", "Last Name", "Company", "VAT ID", "Street", "Location", 
          "Postal Code", "email", "Telephone Number", "Quantity", "Payment", 
          "Message", "Conditions"
      ];

      // Build Admin Email
      let adminEmailHtmlBody = `<h3>${common.FORM_EMAIL_ORDER_INTRO_ADMIN} ${formData.productTitle}:</h3><ul>`;
      adminEmailFieldOrder.forEach(key => {
        const value = formData[key as keyof typeof formData];
        const label = fieldLabels[key as keyof typeof fieldLabels] || key;
        let displayValue = String(value);

        if (key === "Conditions" && value === "on") {
            displayValue = common.FORM_FIELD_YES;
        }

        if (value !== undefined && value !== null && String(value).trim() !== '') {
            adminEmailHtmlBody += `<li><strong>${label}:</strong> ${displayValue}</li>`;
        } else {
            adminEmailHtmlBody += `<li><strong>${label}:</strong> ${common.FORM_FIELD_NOT_ENTERED}</li>`;
        }
      });
      adminEmailHtmlBody += `<li><strong>${common.FORM_FIELD_SUBMISSION_DATE}:</strong> ${submissionDate}</li>`;
      adminEmailHtmlBody += `<li><strong>${common.FORM_FIELD_URL} oddaje:</strong> <a href="${formData.pageUrl}">${formData.pageUrl}</a></li>`;
      adminEmailHtmlBody += `</ul>`;

      // Send Admin Email
      const adminResponse = await sendEmail({
        from: `${fromName} <${fromAddress}>`,
        to: adminToAddress,
        reply_to: customerEmailAddress,
        subject: adminEmailSubject,
        html: adminEmailHtmlBody,
      }, apiKey);

      if (!adminResponse.ok) {
        const errorBody = await adminResponse.json().catch(() => ({}));
        console.error('Emailit API Error (Admin Email):', adminResponse.status, errorBody);
        throw new ActionError({ code: 'INTERNAL_SERVER_ERROR', message: `Admin email error (${adminResponse.status}): ${errorBody.message || 'Unknown'}` });
      }

      // Build and Send Customer Confirmation Email
      let customerEmailHtmlBody = `<p>${common.FORM_EMAIL_ORDER_INTRO_CUSTOMER}</p><ul>`;
      (Object.keys(formData) as (keyof typeof formData)[]).filter(k => k !== 'locale' && k !== 'pageUrl').forEach(key => {
        const value = formData[key];
        const label = fieldLabels[key as keyof typeof fieldLabels] || key;
        let displayValue = value !== undefined && value !== null && String(value).trim() !== '' ? String(value) : common.FORM_FIELD_NOT_ENTERED;
        if (key === "Conditions" && value === "on") displayValue = common.FORM_FIELD_YES;
        customerEmailHtmlBody += `<li><strong>${label}:</strong> ${displayValue}</li>`;
      });
      customerEmailHtmlBody += `</ul><p>${common.FORM_EMAIL_ORDER_DISCLAIMER}</p><p>${common.FORM_EMAIL_GREETING}</p>`;

      await sendEmail({
        from: `${fromName} <${fromAddress}>`,
        to: customerEmailAddress, 
        reply_to: fromAddress, 
        subject: common.FORM_EMAIL_ORDER_THANKS_SUBJECT,
        html: customerEmailHtmlBody,
      }, apiKey).catch(err => console.error("Failed to send customer confirmation:", err));

      return { success: true, message: common.FORM_SUCCESS_ORDER };

    } catch (error) {
      console.error('Error in submitOrder action:', error);
      if (error instanceof ActionError) throw error;
      throw new ActionError({ code: 'INTERNAL_SERVER_ERROR', message: common.FORM_EMAIL_ERROR_GENERIC_SERVER });
    }
  },
});

export const submitContactForm = defineAction({
  accept: 'form',
  input: contactFormSchema,
  handler: async (formData) => {
    const common = getTranslationsForLocale(formData.locale);
    if (!common) {
      throw new ActionError({ code: 'BAD_REQUEST', message: 'Invalid locale provided.' });
    }

    try {
      const apiKey = import.meta.env.EMAILIT_API_KEY;
      const fromName = import.meta.env.EMAIL_FROM_NAME;
      const fromAddress = import.meta.env.EMAIL_FROM_ADDRESS;
      const adminToAddress = import.meta.env.EMAIL_TO_ADDRESS;

      if (!apiKey || !fromName || !fromAddress || !adminToAddress) {
        console.error("Missing email env vars for contact form!");
        throw new ActionError({ code: 'INTERNAL_SERVER_ERROR', message: common.FORM_EMAIL_ERROR_CONFIG });
      }

      const adminEmailSubject = `${common.FORM_EMAIL_CONTACT_ADMIN_SUBJECT}: ${formData.pageTitle}`;
      const customerEmailAddress = formData.email;
      const submissionDate = new Date().toLocaleString(common.PAGE_LOCALE.replace('-', '_'), {
          year: 'numeric', month: '2-digit', day: '2-digit',
          hour: '2-digit', minute: '2-digit', hour12: false
      });

      const fieldLabels = {
        fullName: common.FORM_LABEL_FULLNAME.replace('*',''),
        email: common.FORM_LABEL_EMAIL.replace('*',''),
        message: common.FORM_LABEL_MESSAGE,
        terms: common.FORM_LABEL_TERMS.replace('*',''),
      };

      // 1. Send Email to Admin
      let adminEmailHtmlBody = `<h3>${common.FORM_EMAIL_CONTACT_INTRO_ADMIN} "${formData.pageTitle}":</h3><ul>`;
      adminEmailHtmlBody += `<li><strong>${fieldLabels.fullName}:</strong> ${formData.fullName}</li>`;
      adminEmailHtmlBody += `<li><strong>${fieldLabels.email}:</strong> ${formData.email}</li>`;
      adminEmailHtmlBody += `<li><strong>${fieldLabels.message}:</strong> <div style="white-space: pre-wrap; border: 1px solid #eee; padding: 5px;">${formData.message}</div></li>`;
      adminEmailHtmlBody += `<li><strong>${fieldLabels.terms}:</strong> ${formData.terms === "on" ? common.FORM_FIELD_YES : common.FORM_FIELD_NO}</li>`;
      adminEmailHtmlBody += `<li><strong>${common.FORM_FIELD_SUBMISSION_DATE}:</strong> ${submissionDate}</li>`;
      adminEmailHtmlBody += `<li><strong>URL oddaje:</strong> <a href="${formData.pageUrl}">${formData.pageUrl}</a></li>`;
      adminEmailHtmlBody += `</ul>`;

      const adminResponse = await sendEmail({
        from: `${fromName} <${fromAddress}>`,
        to: adminToAddress,
        reply_to: customerEmailAddress,
        subject: adminEmailSubject,
        html: adminEmailHtmlBody,
      }, apiKey);

      if (!adminResponse.ok) {
        const errorBody = await adminResponse.json().catch(() => ({}));
        console.error('Emailit API Error (Admin Contact Email):', adminResponse.status, errorBody);
        throw new ActionError({ code: 'INTERNAL_SERVER_ERROR', message: `Admin email error (${adminResponse.status}): ${errorBody.message || 'Unknown'}`});
      }

      // 2. Send Confirmation Email to Customer
      let customerEmailHtmlBody = `<p>${common.FORM_EMAIL_DEAR} ${formData.fullName},</p>`;
      customerEmailHtmlBody += `<p>${common.FORM_EMAIL_CONTACT_INTRO_CUSTOMER} "${formData.pageTitle}". ${common.FORM_EMAIL_CONTACT_DATA_RECEIVED}</p><ul>`;
      customerEmailHtmlBody += `<li><strong>${fieldLabels.fullName}:</strong> ${formData.fullName}</li>`;
      customerEmailHtmlBody += `<li><strong>${fieldLabels.email}:</strong> ${formData.email}</li>`;
      customerEmailHtmlBody += `<li><strong>${fieldLabels.message}:</strong> <div style="white-space: pre-wrap; border: 1px solid #eee; padding: 5px;">${formData.message}</div></li>`;
      customerEmailHtmlBody += `</ul>`;
      customerEmailHtmlBody += `<p>${common.FORM_EMAIL_CONTACT_OUTRO_CUSTOMER}</p>`;
      customerEmailHtmlBody += `<p>${common.FORM_EMAIL_GREETING},</p><p>${fromName}</p>`;

      await sendEmail({
        from: `${fromName} <${fromAddress}>`,
        to: customerEmailAddress,
        reply_to: fromAddress,
        subject: common.FORM_EMAIL_CONTACT_CONFIRM_SUBJECT,
        html: customerEmailHtmlBody,
      }, apiKey).catch(err => console.error("Failed to send customer contact confirmation:", err));

      return { success: true, message: common.FORM_SUCCESS_CONTACT };

    } catch (error) {
      console.error('Error in submitContactForm action:', error);
      if (error instanceof ActionError) throw error;
      throw new ActionError({ code: 'INTERNAL_SERVER_ERROR', message: common.FORM_EMAIL_ERROR_GENERIC_SERVER });
    }
  },
});

export const server = {
  submitOrder,
  submitContactForm
};