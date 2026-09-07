import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const RECIPIENT_EMAIL = process.env.CONTACT_RECIPIENT_EMAIL || "roacstech@gmail.com";
const SMTP_HOST = process.env.MAIL_HOST || process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = Number(process.env.MAIL_PORT || process.env.SMTP_PORT) || 465;
const SMTP_SECURE = process.env.MAIL_SECURE !== undefined ? process.env.MAIL_SECURE === "true" : SMTP_PORT === 465;
const SMTP_SERVICE = process.env.MAIL_SERVICE;
const SMTP_USER = process.env.EMAIL_USER || process.env.SMTP_USER || "roacstech@gmail.com";
const SMTP_PASS = process.env.EMAIL_PASS || process.env.SMTP_PASSWORD || process.env.SMTP_PASS;

function generateCleanEmailHtml(data: {
  name: string;
  email: string;
  message: string;
  phone?: string;
}) {
  const { name, email, message, phone } = data;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Travel Website Inquiry</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);">
          
          <!-- Top Brand Gradient Bar -->
          <tr>
            <td style="height: 6px; background: linear-gradient(90deg, #fe2c6a 0%, #f97316 100%);"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding: 28px 32px 20px 32px; border-bottom: 1px solid #f1f5f9;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="display: inline-block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #fe2c6a; background-color: #fff1f2; padding: 4px 10px; border-radius: 20px; border: 1px solid #ffe4e6;">
                      New Lead Inquiry
                    </span>
                    <h1 style="margin: 12px 0 4px 0; font-size: 22px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em;">
                      Roacs Corporation
                    </h1>
                    <p style="margin: 0; font-size: 13px; color: #64748b;">
                      A new client inquiry was received from the <strong>Travel &amp; Tours</strong> landing page.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Inquiry Details Card -->
          <tr>
            <td style="padding: 28px 32px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                
                <!-- Client Name -->
                <tr>
                  <td style="padding-bottom: 16px;">
                    <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 4px;">
                      Client Name
                    </div>
                    <div style="font-size: 16px; font-weight: 700; color: #0f172a;">
                      ${name}
                    </div>
                  </td>
                </tr>

                <!-- Client Email -->
                <tr>
                  <td style="padding-bottom: 16px;">
                    <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 4px;">
                      Email Address
                    </div>
                    <div style="font-size: 15px; font-weight: 600;">
                      <a href="mailto:${email}" style="color: #fe2c6a; text-decoration: none;">
                        ${email}
                      </a>
                    </div>
                  </td>
                </tr>

                <!-- Phone (if provided) -->
                ${
                  phone && phone !== "Not specified"
                    ? `<tr>
                        <td style="padding-bottom: 16px;">
                          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 4px;">
                            Phone Number
                          </div>
                          <div style="font-size: 15px; font-weight: 600; color: #0f172a;">
                            ${phone}
                          </div>
                        </td>
                      </tr>`
                    : ""
                }

                <!-- Message / Requirement -->
                <tr>
                  <td style="padding-top: 6px;">
                    <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 8px;">
                      Requirement Details
                    </div>
                    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap;">${message}</div>
                  </td>
                </tr>

                <!-- Quick Action Button -->
                <tr>
                  <td style="padding-top: 26px;" align="center">
                    <a href="mailto:${email}?subject=Re:%20Travel%20Website%20Inquiry%20-%20Roacs%20Corporation" style="display: inline-block; background: linear-gradient(90deg, #fe2c6a 0%, #f97316 100%); color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; padding: 12px 28px; border-radius: 8px; box-shadow: 0 4px 12px rgba(254, 44, 106, 0.25);">
                      Reply to ${name} &rarr;
                    </a>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 18px 32px; border-top: 1px solid #f1f5f9; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                Direct submission from Roacs Corporation Travel Website
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, phone, subject } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    // Option 1: If SMTP credentials are provided, send clean white-label email
    if (SMTP_PASS) {
      try {
        const transportConfig: any = {
          host: SMTP_HOST,
          port: SMTP_PORT,
          secure: SMTP_SECURE,
          auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
          },
        };
        if (SMTP_SERVICE) {
          transportConfig.service = SMTP_SERVICE;
        }

        const transporter = nodemailer.createTransport(transportConfig);

        await transporter.sendMail({
          from: `"Roacs Corporation" <${SMTP_USER}>`,
          to: RECIPIENT_EMAIL,
          replyTo: `"${name}" <${email}>`,
          subject: subject || `New Travel Website Inquiry from ${name}`,
          html: generateCleanEmailHtml({ name, email, message, phone }),
        });

        return NextResponse.json({
          success: true,
          message: "Inquiry sent successfully via secure SMTP!",
          mode: "smtp",
        });
      } catch (smtpError: any) {
        console.error("SMTP sending failed, falling back to form endpoint:", smtpError);
      }
    }

    // Option 2: Fallback to FormSubmit with streamlined payload
    const referer = request.headers.get("referer") || "https://roacs.com";
    const origin = request.headers.get("origin") || "https://roacs.com";

    const payload: Record<string, string> = {
      name,
      email,
      message,
      _subject: subject || `New Travel Website Inquiry from ${name}`,
      _template: "table",
      _captcha: "false",
    };

    if (phone && phone !== "Not specified") {
      payload.phone = phone;
    }

    const response = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Referer: referer,
        Origin: origin,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    return NextResponse.json({
      success: true,
      message: "Inquiry sent successfully!",
      recipient: RECIPIENT_EMAIL,
      mode: "fallback",
      data,
    });
  } catch (error: any) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to send inquiry. Please try again later." },
      { status: 500 }
    );
  }
}
