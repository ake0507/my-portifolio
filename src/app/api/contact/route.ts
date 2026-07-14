import { NextResponse } from "next/server";
import { z } from "zod";
import { getEmailConfigStatus, sendContactEmail } from "@/lib/email";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please enter a valid email"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be under 2000 characters"),
});

export async function GET() {
  const status = getEmailConfigStatus();

  return NextResponse.json({
    configured: status.configured,
    providers: {
      web3forms: status.web3forms,
      resend: status.resend,
      smtp: status.smtp,
    },
    recipient: status.recipient,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "Invalid form data";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const result = await sendContactEmail(parsed.data);

    const response: Record<string, string | boolean> = {
      success: true,
      message: "Your message has been sent. I'll get back to you within 48 hours.",
    };

    if (result.previewUrl) {
      response.previewUrl = result.previewUrl;
      response.message =
        "Message sent in development mode. Open the preview link to view the test email.";
    }

    if (result.provider === "file") {
      response.message =
        "Message saved locally in development mode. Add WEB3FORMS_ACCESS_KEY to .env.local to send real emails.";
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Contact form error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Unable to send your message right now. Please try again or email directly.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
