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
  provider: "web3forms" | "smtp" | "resend" | "ethereal" | "file";
  previewUrl?: string;
}

function sanitizeAppPassword(password: string) {
  return password.replace(/\s+/g, "").trim();
}

function getRecipientEmail() {
  return process.env.CONTACT_EMAIL?.trim() || "akliludesalegn3@gmail.com";
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

function formatEmailError(error: unknown) {
  const message = error instanceof Error ? error.message : "Unknown email error";

  if (message.includes("BadCredentials") || message.includes("535-5.7.8")) {
    return "Gmail rejected the App Password. Create a new one at https://myaccount.google.com/apppasswords (requires 2-Step Verification), update SMTP_PASS in .env.local, and restart the server.";
  }

  if (message.includes("Web3Forms")) {
    return message;
  }

  return "Unable to send your message right now. Please try again or email akliludesalegn3@gmail.com directly.";
}

async function sendViaWeb3Forms(payload: ContactEmailPayload): Promise<SendContactEmailResult> {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY?.trim();

  if (!accessKey) {
    throw new Error(
      "Web3Forms is not configured. Get a free access key at https://web3forms.com and add WEB3FORMS_ACCESS_KEY to .env.local.",
    );
  }

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `Portfolio contact from ${payload.name}`,
      from_name: payload.name,
      email: payload.email,
      message: payload.message,
    }),
  });

  const data = (await response.json()) as { success?: boolean; message?: string };

  if (!response.ok || !data.success) {
    throw new Error(data.message ?? "Web3Forms failed to send the message.");
  }

  return { provider: "web3forms" };
}

async function sendViaResend(payload: ContactEmailPayload): Promise<SendContactEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = getRecipientEmail();
  const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey) {
    throw new Error("Resend is not configured. Set RESEND_API_KEY in .env.local.");
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
  const user = process.env.SMTP_USER?.trim();
  const pass = sanitizeAppPassword(process.env.SMTP_PASS ?? "");
  const to = getRecipientEmail();

  if (!user || !pass) {
    throw new Error("SMTP is not configured. Set SMTP_USER and SMTP_PASS in .env.local.");
  }

  const { subject, text, html } = buildEmailContent(payload);
  const mailOptions = {
    from: `"Portfolio Contact" <${user}>`,
    to,
    replyTo: payload.email,
    subject,
    text,
    html,
  };

  const transportOptions = [
    { service: "gmail" as const },
    { host: "smtp.gmail.com", port: 465, secure: true },
    {
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
    },
  ];

  let lastError: unknown;

  for (const options of transportOptions) {
    try {
      const transporter = nodemailer.createTransport({
        ...options,
        auth: { user, pass },
      });

      await transporter.sendMail(mailOptions);
      return { provider: "smtp" };
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
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
  const hasWeb3Forms = Boolean(process.env.WEB3FORMS_ACCESS_KEY?.trim());
  const hasResend = Boolean(process.env.RESEND_API_KEY?.trim());
  const hasSmtp = Boolean(
    process.env.SMTP_USER?.trim() &&
      sanitizeAppPassword(process.env.SMTP_PASS ?? "") &&
      getRecipientEmail(),
  );

  return {
    configured: hasWeb3Forms || hasResend || hasSmtp,
    web3forms: hasWeb3Forms,
    resend: hasResend,
    smtp: hasSmtp,
    recipient: getRecipientEmail(),
  };
}

export async function sendContactEmail(
  payload: ContactEmailPayload,
): Promise<SendContactEmailResult> {
  const status = getEmailConfigStatus();
  const providers: Array<() => Promise<SendContactEmailResult>> = [];

  if (status.web3forms) {
    providers.push(() => sendViaWeb3Forms(payload));
  }

  if (status.resend) {
    providers.push(() => sendViaResend(payload));
  }

  if (status.smtp) {
    providers.push(() => sendViaSmtp(payload));
  }

  if (providers.length === 0) {
    if (process.env.NODE_ENV === "development") {
      return saveToFile(payload);
    }

    throw new Error(
      "Email is not configured. Add WEB3FORMS_ACCESS_KEY or valid Gmail SMTP credentials to .env.local.",
    );
  }

  let lastError: unknown;

  for (const send of providers) {
    try {
      return await send();
    } catch (error) {
      lastError = error;
      console.error("[email] Provider failed:", error);
    }
  }

  throw new Error(formatEmailError(lastError));
}
