// Cloudflare Pages Function for POST /api/lead

export async function onRequestPost(context: { request: Request; env: Record<string, string> }) {
  try {
    const request = context.request;
    const env = context.env;

    // Retrieve environment variables
    const TELEGRAM_BOT_TOKEN = env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("Missing Telegram environment variables");
      return new Response(JSON.stringify({ error: "Server configuration error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Parse the request JSON
    const body = await request.json();
    const rawText = body.rawText;

    if (!rawText) {
      return new Response(JSON.stringify({ error: "Missing rawText in request body" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Send the message via Telegram Bot API
    const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const telegramResponse = await fetch(telegramApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: rawText,
        parse_mode: "Markdown",
      }),
    });

    const telegramData = await telegramResponse.json();

    if (!telegramData.ok) {
      console.error("Telegram API Error:", telegramData.description);
      return new Response(JSON.stringify({ error: "Failed to send message to Telegram" }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Success response
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Function error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}