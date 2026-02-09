import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendContactEmail(
  name: string,
  email: string,
  message: string,
  phone?: string
): Promise<{ success: boolean; error?: string }> {
  if (!resend) {
    console.log('Email not sent: RESEND_API_KEY not configured');
    console.log('Contact form submission:', { name, email, phone, message });
    return { success: true };
  }

  try {
    const phoneSection = phone ? `<p><strong>Phone:</strong> ${phone}</p>` : '';

    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.CONTACT_EMAIL || 'contact@example.com',
      subject: `Portfolio Contact from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phoneSection}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email,
    });

    console.log('Resend response:', JSON.stringify(result));

    return { success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to send email' };
  }
}
