import { useEffect, useRef, useState } from "react";
export default function AvantiSmartPage() {
  const [msgs, setMsgs] = useState([{ role: "system", content: "Avanti Smart" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  useEffect(() => { if(scrollRef.current){ scrollRef.current.scrollTop = scrollRef.current.scrollHeight; } }, [msgs, loading]);
  async function handleSend(e){
    e.preventDefault();
    const text = input.trim(); if(!text) return;
    const next = [...msgs, { role: "user", content: text }];
    setMsgs(next); setInput(""); setLoading(true);
    try{
      const r = await fetch("/api/avanti-smart", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ messages: next }) });
      const d = await r.json();
      setMsgs([...next, { role:"assistant", content: d?.text || "Sem resposta." }]);
    }catch{
      setMsgs([...next, { role:"assistant", content:"Erro ao consultar a IA." }]);
    }finally{ setLoading(false); }
  }
  return (
    <div style={{display:"flex",flexDirection:"column",height:"100vh",fontFamily:"sans-serif"}}>
      <header style={{borderBottom:"1px solid #e5e5e5",padding:16}}><b>Avanti Smart</b></header>
      <main style={{flex:1,overflow:"hidden"}}>
        <div ref={scrollRef} style={{height:"100%",overflow:"auto",padding:16}}>
          {msgs.filter(m=>m.role!=="system").map((m,i)=>(
            <div key={i} style={{maxWidth:"85%",margin:m.role==="user"?"8px 0 8px auto":"8px auto 8px 0",padding:"10px 12px",borderRadius:16,background:m.role==="user"?"#111":"#f3f3f3",color:m.role==="user"?"#fff":"#000"}}>
              {m.content}
            </div>
          ))}
          {loading && <div style={{maxWidth:"85%",margin:"8px auto 8px 0",padding:"10px 12px",borderRadius:16,background:"#f3f3f3"}}>Digitando…</div>}
        </div>
      </main>
      <footer style={{borderTop:"1px solid #e5e5e5",padding:12}}>
        <form onSubmit={handleSend} style={{display:"flex",gap:8}}>
          <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Pergunte algo"
                 style={{flex:1,border:"1px solid #ddd",borderRadius:8,padding:"8px 10px",outline:"none"}} />
          <button type="submit" disabled={loading} style={{borderRadius:8,padding:"8px 14px"}}>Enviar</button>
        </form>
      </footer>
    </div>
  );
}
