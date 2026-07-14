import nodemailer from "nodemailer";
import { Resend } from "resend";
import { appendFile, mkdir } from "fs/promises";
import path from "path";

export interface ContactEmailPayload {
  name: string;
  email: string;
  message: string;
}

export interface SendContactEmailResult {
  provider: "smtp" | "resend" | "ethereal" | "file";
  previewUrl?: string;
}

let etherealAccount: nodemailer.TestAccount | null = null;

async function getEtherealAccount() {
  if (!etherealAccount) {
    etherealAccount = await nodemailer.createTestAccount();
    console.log("[email] Dev mode: using Ethereal test inbox");
    console.log(`[email] Test inbox user: ${etherealAccount.user}`);
  }
  return etherealAccount;
}

function buildEmailContent(payload: ContactEmailPayload) {
  const subject = `New message from ${payload.name} — Portfolio Contact`;
  const text = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");
  const html = `
    <h2>New Portfolio Contact Message</h2>
    <p><strong>Name:</strong> ${payload.name}</p>
    <p><strong>Email:</strong> <a href="mailto:${payload.email}">${payload.email}</a></p>
    <hr />
    <p><strong>Message:</strong></p>
    <p>${payload.message.replace(/\n/g, "<br />")}</p>
  `;

  return { subject, text, html };
}

async function sendViaResend(payload: ContactEmailPayload): Promise<SendContactEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey || !to) {
    throw new Error("Resend is not configured. Set RESEND_API_KEY and CONTACT_EMAIL.");
  }

  const resend = new Resend(apiKey);
  const { subject, html, text } = buildEmailContent(payload);

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: payload.email,
    subject,
    html,
    text,
  });

  if (error) {
    throw new Error(error.message);
  }

  return { provider: "resend" };
}

async function sendViaSmtp(payload: ContactEmailPayload): Promise<SendContactEmailResult> {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_EMAIL ?? user;

  if (!host || !user || !pass || !to) {
    throw new Error("SMTP is not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS, and CONTACT_EMAIL.");
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    tls: port === 587 ? { rejectUnauthorized: true } : undefined,
  });

  await transporter.verify();

  const { subject, text, html } = buildEmailContent(payload);
  await transporter.sendMail({
    from: `"Portfolio Contact" <${user}>`,
    to,
    replyTo: payload.email,
    subject,
    text,
    html,
  });

  return { provider: "smtp" };
}

async function sendViaEthereal(payload: ContactEmailPayload): Promise<SendContactEmailResult> {
  const account = await getEtherealAccount();
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: account.user,
      pass: account.pass,
    },
  });

  const { subject, text, html } = buildEmailContent(payload);
  const info = await transporter.sendMail({
    from: `"Portfolio Contact" <${account.user}>`,
    to: process.env.CONTACT_EMAIL ?? account.user,
    replyTo: payload.email,
    subject,
    text,
    html,
  });

  const previewUrl = nodemailer.getTestMessageUrl(info) || undefined;
  if (previewUrl) {
    console.log(`[email] Preview message: ${previewUrl}`);
  }

  return { provider: "ethereal", previewUrl };
}

async function saveToFile(payload: ContactEmailPayload): Promise<SendContactEmailResult> {
  const submissionsDir = path.join(process.cwd(), "data");
  const submissionsFile = path.join(submissionsDir, "contact-submissions.jsonl");

  await mkdir(submissionsDir, { recursive: true });
  await appendFile(
    submissionsFile,
    `${JSON.stringify({ ...payload, receivedAt: new Date().toISOString() })}\n`,
    "utf8",
  );

  console.log(`[email] Saved contact submission to ${submissionsFile}`);
  return { provider: "file" };
}

export function getEmailConfigStatus() {
  const hasResend = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL);
  const hasSmtp = Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      (process.env.CONTACT_EMAIL || process.env.SMTP_USER),
  );

  return {
    configured: hasResend || hasSmtp,
    resend: hasResend,
    smtp: hasSmtp,
    developmentFallback: process.env.NODE_ENV === "development",
  };
}

export async function sendContactEmail(
  payload: ContactEmailPayload,
): Promise<SendContactEmailResult> {
  const status = getEmailConfigStatus();

  if (status.resend) {
    return sendViaResend(payload);
  }

  if (status.smtp) {
    return sendViaSmtp(payload);
  }

  if (process.env.NODE_ENV === "development") {
    try {
      return await sendViaEthereal(payload);
    } catch (error) {
      console.error("[email] Ethereal fallback failed:", error);
      return saveToFile(payload);
    }
  }

  throw new Error(
    "Email is not configured. Add SMTP or Resend credentials to .env.local and restart the server.",
  );
}
