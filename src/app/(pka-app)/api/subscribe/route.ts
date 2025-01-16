import { EmailTemplate } from "@/components/Journal/EmailTemplate";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const data = await req.json();

  try {
    const { error } = await resend.emails.send({
      from: "Peace Adventures <onboarding@resend.dev>",
      to: ["support@digiolive.com"],
      // to: ["stadnyk.andy@gmail.com"],
      subject: "Peace Adventures",
      react: EmailTemplate({ data }),
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
