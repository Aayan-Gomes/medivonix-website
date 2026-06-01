import { z } from "zod";

const companyEmail = "contact@medivonixhealthcare.com";

const enquirySchema = z.object({
  name: z.string().trim().min(2).max(120),
  contactDetail: z.string().trim().min(5).max(160),
  description: z.string().trim().min(10).max(3000),
});

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ??
    "Medivonix Website <onboarding@resend.dev>";

  if (!resendApiKey) {
    return Response.json(
      { error: "Email delivery is not configured." },
      { status: 503 },
    );
  }

  const parsed = enquirySchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return Response.json({ error: "Invalid enquiry." }, { status: 400 });
  }

  const { name, contactDetail, description } = parsed.data;

  const html = `
    <h2>New Medivonix enquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Phone or email:</strong> ${escapeHtml(contactDetail)}</p>
    <p><strong>Enquiry:</strong></p>
    <p>${escapeHtml(description).replaceAll("\n", "<br />")}</p>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: companyEmail,
      reply_to: contactDetail.includes("@") ? contactDetail : undefined,
      subject: `Medivonix enquiry from ${name}`,
      html,
      text: [
        "New Medivonix enquiry",
        "",
        `Name: ${name}`,
        `Phone or email: ${contactDetail}`,
        "",
        "Enquiry:",
        description,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    return Response.json(
      { error: "Email delivery failed." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
