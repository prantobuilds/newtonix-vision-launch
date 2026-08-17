export async function onRequest(context: any) {
  if (context.request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const RESEND_API_KEY = "re_7vAmV6RG_Kuf2AsFRoHHL1Zpic7Ku7yNZ";

  try {
    const payload = await context.request.json();

    if (!payload.name || !payload.email || !payload.phone) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: "samiul.pranto@viserx.net",
        subject: `New project inquiry from ${payload.name}`,
        html: `
          <h2>New Project Inquiry</h2>
          <p><strong>Name:</strong> ${payload.name}</p>
          <p><strong>Email:</strong> ${payload.email}</p>
          <p><strong>Phone:</strong> ${payload.phone}</p>
          <p><strong>Company:</strong> ${payload.company}</p>
          <p><strong>Service:</strong> ${payload.service}</p>
          <p><strong>Details:</strong></p>
          <p>${payload.details.replace(/\n/g, "<br>")}</p>
        `,
        reply_to: payload.email,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return new Response(
        JSON.stringify({ error: error.message || "Failed to send email" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Inquiry sent successfully",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Server error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}