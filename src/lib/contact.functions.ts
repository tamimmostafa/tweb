import { createServerFn } from "@tanstack/react-start";
import { contactSchema } from "./contact.schemas";

const EMAIL_RECIPIENT = "support.tamim@gmail.com";

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error: dbError } = await supabaseAdmin.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    });

    if (dbError) {
      console.error("Contact form DB error:", dbError);
      throw new Error("Unable to save your message. Please try again.");
    }

    const resendKey = process.env.RESEND_API_KEY;
    const lovableKey = process.env.LOVABLE_API_KEY;
    let emailSent = false;

    if (resendKey && lovableKey) {
      try {
        const response = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${lovableKey}`,
            "X-Connection-Api-Key": resendKey,
          },
          body: JSON.stringify({
            from: "Tamim's Portfolio <onboarding@resend.dev>",
            to: [EMAIL_RECIPIENT],
            subject: `[Portfolio] ${data.subject}`,
            html: `<p><strong>Name:</strong> ${data.name}</p><p><strong>Email:</strong> ${data.email}</p><p>${data.message}</p>`,
            reply_to: data.email,
          }),
        });

        if (!response.ok) {
          const body = await response.text();
          console.error(`Resend email failed [${response.status}]:`, body);
        } else {
          emailSent = true;
        }
      } catch (e) {
        console.error("Resend email error:", e);
      }
    }

    return { ok: true, emailSent };
  });
