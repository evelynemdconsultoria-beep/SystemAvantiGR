import { useEffect, useState } from "react";
import RonIcon from "./RonIcon";

const C = { bg:"#1f1f23", mid:"#2a2a30", text:"#f5f5f5", border:"#2f2f36" };

export default function AvantiWidget() {
  const [open, setOpen] = useState(false);

  // ESC fecha e evento global para abrir via menu
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    const onOpen = () => setOpen(true);
    window.addEventListener("open-avanti-widget", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-avanti-widget", onOpen);
    };
  }, []);

  return (
    <>
      {/* Botão flutuante (ícone do Ron) */}
      <RonIcon floating onClick={() => setOpen(true)} showLabel />

      {/* Janela do chat */}
      {open && (
        <div role="dialog" aria-label="Chat Avanti Smart"
          style={{
            position:"fixed", right:20, bottom:88, width:420, height:560, zIndex:10000,
            background:C.bg, color:C.text, border:`1px solid ${C.border}`, borderRadius:16,
            overflow:"hidden", boxShadow:"0 16px 40px rgba(0,0,0,.55)", display:"flex", flexDirection:"column"
          }}>
          <div style={{
            display:"flex", alignItems:"center", justifyContent:"space-between",
            padding:"10px 12px", background:C.mid, borderBottom:`1px solid ${C.border}`
          }}>
            <div style={{display:"flex", alignItems:"center", gap:10}}>
              <img src="/ron.png?v=3" alt="Ron" style={{ width:22, height:22, borderRadius:"50%" }} />
              <b>Ron</b>
            </div>
            <div style={{display:"flex", alignItems:"center", gap:10}}>
              <a href="/avanti-smart" title="Abrir em tela cheia"
                 style={{color:C.text, textDecoration:"none", opacity:.8}}>↗</a>
              <button onClick={()=>setOpen(false)} aria-label="Fechar"
                style={{background:"transparent", border:"none", color:C.text, cursor:"pointer", fontSize:16}}>✖</button>
            </div>
          </div>
          <iframe title="Avanti Smart" src="/avanti-smart" style={{border:"none", width:"100%", height:"100%", background:"#111"}} />
        </div>
      )}
    </>
  );
}
