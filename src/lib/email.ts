import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@sanaera.com',
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
}

export function getOrderConfirmationEmail(orderNumber: string, total: number) {
  return `
    <div style="font-family: 'Cormorant Garamond', serif; color: #1A0905;">
      <h1 style="color: #5E1020;">Order Confirmed</h1>
      <p>Your order <strong>${orderNumber}</strong> has been confirmed.</p>
      <p>Total Amount: <strong>₹${total}</strong></p>
      <p>Thank you for shopping at SANAÉRA!</p>
    </div>
  `;
}
