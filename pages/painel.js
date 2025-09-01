import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ui = {
  bg: "#0d0d0f", side: "#111a22", card: "#14202b",
  border: "#243041", lime: "#b2ff00", text: "#f5f5f5"
};

export default function Painel() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");

  useEffect(()=>{
    const ok = localStorage.getItem("logado")==="true";
    const u  = localStorage.getItem("usuario") || "admin";
    setUsuario(u);
    if(!ok) router.replace("/login");
  },[router]);

  function abrirWidget() {
    window.dispatchEvent(new CustomEvent("open-avanti-widget"));
  }
  function sair() {
    localStorage.removeItem("logado");
    router.push("/login");
  }

  return (
    <div style={{ display: "flex", height: "100vh", background: ui.bg, color: ui.text, fontFamily: "system-ui, sans-serif" }}>
      {/* Sidebar */}
      <aside style={{ width: 260, background: ui.side, borderRight: `1px solid ${ui.border}`, padding: 20 }}>
        <h2 style={{ margin: 0, marginBottom: 20 }}>
          Avanti <span style={{ color: ui.lime }}>GR</span>
        </h2>

        <h4 style={{ marginTop: 0, marginBottom: 8, fontSize: 14, opacity: .8 }}>Usuários</h4>
        <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <a href="/painel" style={linkStyle}>📊 Painel</a>
          <a href="/usuarios/novo" style={linkStyle}>➕ Novo Usuário</a>
        </nav>

        <h4 style={{ marginTop: 20, marginBottom: 8, fontSize: 14, opacity: .8 }}>Assistente</h4>
        <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <a href="/avanti-smart" style={linkStyle}>🤖 Avanti Smart (página)</a>
          <button onClick={abrirWidget} style={{ ...btnStyle, background: ui.lime, color: "#111" }}>
            Abrir Avanti Smart (widget)
          </button>
        </nav>

        <div style={{marginTop:24,opacity:.7}}>Logado como <b>{usuario}</b></div>
        <button onClick={sair} style={{ ...btnStyle, marginTop: 10, border: `1px solid ${ui.border}` }}>
          Sair
        </button>
      </aside>

      {/* Conteúdo principal */}
      <main style={{ flex: 1, padding: 40 }}>
        <h1>Usuários • Painel</h1>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16,marginTop:16}}>
          <div style={card}>Usuário<br/><b>{usuario}</b></div>
          <div style={card}>Status<br/><span style={{display:"inline-flex",alignItems:"center",gap:8}}><span style={{width:10,height:10,background:"#67f56f",borderRadius:"50%"}}/>Online</span></div>
          <div style={card}>Último login<br/>{new Date().toLocaleString()}</div>
        </div>
      </main>
    </div>
  );
}

const linkStyle = {
  textDecoration: "none",
  color: "#f5f5f5",
  background: "#1b2732",
  padding: "10px 12px",
  borderRadius: 8,
  display: "inline-block",
  border: "1px solid #243041"
};
const btnStyle = {
  cursor: "pointer",
  padding: "10px 12px",
  borderRadius: 8,
  background: "#1b2732",
  color: "#f5f5f5",
  border: "none",
  textAlign: "left"
};
const card = {background:"#14202b",border:"1px solid #243041",borderRadius:12,padding:16};
