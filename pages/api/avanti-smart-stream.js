import OpenAI from "openai";
export default async function handler(req, res) {
  if (req.method !== "POST") { res.setHeader("Allow","POST"); return res.status(405).json({error:"Method not allowed"}); }
  try {
    const { messages = [] } = req.body || {};
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    res.setHeader("Content-Type","text/event-stream; charset=utf-8");
    res.setHeader("Cache-Control","no-cache, no-transform");
    res.setHeader("Connection","keep-alive");
    res.flushHeaders?.();
    const stream = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.3,
      stream: true,
      messages,
    });
    for await (const chunk of stream) {
      const delta = chunk?.choices?.[0]?.delta?.content;
      if (delta) res.write(`data: ${JSON.stringify(delta)}\n\n`);
    }
    res.write(`data: "[DONE]"\n\n`); res.end();
  } catch (e) {
    try { res.write(`data: ${JSON.stringify("<<ERRO: " + (e?.message || "Falha na IA") + ">>")}\n\n`); res.write(`data: "[DONE]"\n\n`); res.end(); } catch {}
  }
}
