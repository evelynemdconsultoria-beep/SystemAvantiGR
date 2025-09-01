import OpenAI from "openai";
import { NextResponse } from "next/server";

export const runtime = "edge";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
type Msg = { role: "system" | "user" | "assistant"; content: string };

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as { messages: Msg[] };
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.3,
      messages,
    });
    const text = completion.choices[0]?.message?.content ?? "";
    return NextResponse.json({ text });
  } catch (e:any) {
    return NextResponse.json({ error: e.message || "Erro" }, { status: 500 });
  }
}
