import { useEffect, useMemo, useRef, useState } from "react";

const colors = {
  graphite: "#1f1f23", graphiteMid: "#2a2a30", graphiteLight: "#3a3a42",
  lime: "#b2ff00", text: "#f5f5f5", subtext: "#bdbdbd", border: "#2f2f36",
};
const STORAGE_KEY = "avanti-smart-history-v1";

// preços GPT-4o-mini
const USD_INPUT = 0.15 / 1_000_000;
const USD_OUTPUT = 0.60 / 1_000_000;
const USD_BRL = 5.50;

function estimateTokens(text) {
  const words = text.trim().split(/\s+/).length;
  return Math.round(words * 1.3);
}

export default function AvantiSmartPage() {
  const [messages, setMessages] = useState([
    { role: "system", content: "Você é o Avanti Smart, assistente da Avanti GR. Resuma e organize processos, avalie risco para transporte de carga e responda de forma objetiva." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const scrollRef = useRef(null);
  const uiMsgs = useMemo(() => messages.filter(m => m.role !== "system"), [messages]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (Array.isArray(saved) && saved.length)
          setMessages([{ role: "system", content: messages[0].content }, ...saved]);
      }
    } catch {}
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.filter(m => m.role !== "system"))); } catch {}
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [uiMsgs, loading]);

  async function handleSend(e) {
    e.preventDefault();
    const text = input.trim(); if (!text) return;

    const base = [...messages, { role: "user", content: text }];
    setMessages(base); setInput(""); setLoading(true);

    const idx = base.length;
    setMessages(prev => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/avanti-smart-stream", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: base }),
      });

      const reader = res.body.getReader(); const decoder = new TextDecoder(); let buf = "";
      while (true) {
        const { value, done } = await reader.read(); if (done) break;
        buf += decoder.decode(value, { stream: true });
        const parts = buf.split("\n\n"); buf = parts.pop() || "";
        for (const p of parts) {
          const line = p.trim(); if (!line.startsWith("data:")) continue;
          const payload = line.slice(5).trim(); if (payload === '"[DONE]"') break;
          let piece = ""; try { piece = JSON.parse(payload); } catch { piece = payload; }
          setMessages(prev => {
            const c = prev.slice();
            c[idx] = { role: "assistant", content: (c[idx]?.content || "") + piece };
            return c;
          });
        }
      }
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Erro: verifique sua OPENAI_API_KEY." }]);
    } finally { setLoading(false); }
  }

  async function copyLast() {
    const last = [...uiMsgs].reverse().find(m => m.role === "assistant");
    if (!last?.content) return;
    try {
      await navigator.clipboard.writeText(last.content);
      setCopied(true); setTimeout(() => setCopied(false), 1200);
    } catch {}
  }

  function estimateCost(userMsg, assistantMsg) {
    const inTokens = estimateTokens(userMsg || "");
    const outTokens = estimateTokens(assistantMsg || "");
    const usd = inTokens * USD_INPUT + outTokens * USD_OUTPUT;
    const brl = usd * USD_BRL;
    return { inTokens, outTokens, brl };
  }

  // custo acumulado
  const totalBrl = uiMsgs.reduce((sum, m, i) => {
    if (m.role === "assistant" && uiMsgs[i - 1]?.role === "user") {
      const c = estimateCost(uiMsgs[i - 1].content, m.content);
      return sum + c.brl;
    }
    return sum;
  }, 0);

  return (
    <div style={{ display: "flex", height: "100vh", background: colors.graphite, color: colors.text }}>
      <aside style={{ width: 260, borderRight: `1px solid ${colors.border}`, background: colors.graphiteMid, padding: 16 }}>
        <div style={{ fontWeight: 700 }}>Avanti <span style={{ color: colors.lime }}>GR</span></div>
        <div style={{ marginTop: 12 }}>💬 Avanti Smart</div>
        <button onClick={copyLast} style={{ marginTop: 20, padding: "6px 10px", borderRadius: 6, background: colors.lime, border: "none", cursor: "pointer" }}>
          {copied ? "✅ Copiado!" : "📋 Copiar última resposta"}
        </button>
      </aside>

      <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div ref={scrollRef} style={{ flex: 1, overflow: "auto", padding: 16 }}>
          {uiMsgs.map((m, i) => {
            const mine = m.role === "user";
            const partner = uiMsgs[i + 1];
            const cost = (!mine && partner) ? estimateCost(uiMsgs[i - 1]?.content, m.content) : null;
            return (
              <div key={i} style={{
                maxWidth: "80%", alignSelf: mine ? "flex-end" : "flex-start",
                background: mine ? colors.graphiteLight : "#f3f3f3",
                color: mine ? colors.text : "#111",
                padding: "10px 12px", borderRadius: 12, marginBottom: 6
              }}>
                {m.content}
                {!mine && cost && (
                  <div style={{ fontSize: 11, marginTop: 4, opacity: 0.7 }}>
                    ~R$ {cost.brl.toFixed(4)} (in {cost.inTokens}t / out {cost.outTokens}t)
                  </div>
                )}
              </div>
            );
          })}
          {loading && <div style={{ background: "#f3f3f3", color: "#111", padding: "10px 12px", borderRadius: 12 }}>Digitando…</div>}
        </div>

        <div style={{ padding: 12, borderTop: `1px solid ${colors.border}`, fontSize: 13, opacity: 0.8 }}>
          💰 Total estimado da sessão: <b>R$ {totalBrl.toFixed(4)}</b>
        </div>

        <form onSubmit={handleSend} style={{ display: "flex", gap: 8, borderTop: `1px solid ${colors.border}`, padding: 12 }}>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={2}
            style={{ flex: 1, background: colors.graphiteMid, color: colors.text, border: `1px solid ${colors.border}`, borderRadius: 8, padding: "8px 10px" }}
            placeholder="Digite sua pergunta…" />
          <button type="submit" disabled={loading} style={{ background: colors.lime, border: "none", borderRadius: 8, padding: "0 14px", fontWeight: 700 }}>Enviar</button>
        </form>
      </main>
    </div>
  );
}
