import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res){
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const { messages } = req.body || { messages: [] };
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.3,
      messages,
    });
    res.status(200).json({ text: completion.choices[0]?.message?.content ?? "" });
  } catch (e) {
    res.status(500).json({ error: e?.message || "Erro" });
  }
}
