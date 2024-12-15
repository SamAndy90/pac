import { EmailTemplate } from "@/components/Journal/EmailTemplate";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  try {
    const { error } = await resend.emails.send({
      from: "Peace Adventures <onboarding@resend.dev>",
      to: ["support@digiolive.com"],
      subject: "Peace Adventures",
      react: EmailTemplate({ email }),
    });
    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
    return NextResponse.json({
      message: "Email send successfully",
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
