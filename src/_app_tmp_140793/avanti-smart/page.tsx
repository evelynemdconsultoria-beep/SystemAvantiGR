"use client";
import { useEffect, useRef, useState } from "react";
type Msg = { role: "system" | "user" | "assistant"; content: string };

export default function AvantiSmartPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "system", content: "Você é o Avanti Smart, assistente da Avanti GR." },
  ]);
  const [input, setInput] = useState(""); const [loading, setLoading]=useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(()=>{scrollRef.current?.scrollTo({top:scrollRef.current.scrollHeight,behavior:"smooth"})},[messages,loading]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const text=input.trim(); if(!text) return;
    const next=[...messages,{role:"user",content:text} as Msg];
    setMessages(next); setInput(""); setLoading(true);
    try{
      const r=await fetch("/api/avanti-smart",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:next})});
      const d=await r.json();
      setMessages([...next,{role:"assistant",content:d?.text||"Sem resposta."}]);
    }catch{
      setMessages([...next,{role:"assistant",content:"Erro ao consultar a IA."}]);
    }finally{ setLoading(false); }
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="border-b p-4"><h1 className="text-lg font-semibold">Avanti Smart</h1></header>
      <main className="flex-1 overflow-hidden">
        <div ref={scrollRef} className="h-full overflow-auto p-4 space-y-3">
          {messages.filter(m=>m.role!=="system").map((m,i)=>(
            <div key={i} className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-6 ${m.role==="user"?"ml-auto bg-neutral-900 text-white":"mr-auto bg-neutral-100"}`}>{m.content}</div>
          ))}
          {loading && <div className="mr-auto bg-neutral-100 rounded-2xl px-4 py-2 text-sm">Digitando…</div>}
        </div>
      </main>
      <footer className="border-t p-3">
        <form onSubmit={handleSend} className="flex gap-2">
          <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Digite sua pergunta" className="flex-1 rounded-xl border px-3 py-2 outline-none"/>
          <button type="submit" disabled={loading} className="rounded-xl px-4 py-2 bg-neutral-900 text-white disabled:opacity-50">Enviar</button>
        </form>
      </footer>
    </div>
  );
}
