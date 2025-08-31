function IconBank(){return(
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 10h18M5 10V7l7-4 7 4v3M5 22h14M6 10v8M10 10v8M14 10v8M18 10v8"/>
  </svg>
);}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header style={{position:"sticky",top:0,background:"#0b1220d9",backdropFilter:"blur(8px)",borderBottom:"1px solid #1f2937"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"10px 16px",display:"flex",alignItems:"center",gap:8}}>
          <IconBank/> <b>Avanti <span style={{color:"#84cc16"}}>GR</span></b>
          <div style={{marginLeft:"auto",opacity:.8,fontSize:14}}>Olá, <b>admin</b></div>
        </div>
      </header>

      <div style={{maxWidth:1200,margin:"0 auto",padding:"16px",display:"grid",gridTemplateColumns:"260px 1fr",gap:16}}>
        <aside style={{background:"#111827",border:"1px solid #1f2937",borderRadius:12,padding:12,height:"max-content"}}>
          <div style={{fontSize:12,opacity:.7,margin:"0 8px 6px"}}>Menu Admin</div>
          <div style={{fontSize:12,opacity:.7,margin:"8px 8px 6px"}}>Usuários</div>
          <nav style={{display:"grid",gap:6}}>
            <a href="/app/usuarios"
               style={{display:"block",padding:"8px 12px",borderRadius:8,background:"#1f2937",border:"1px solid #374151",color:"#e5e7eb",textDecoration:"none"}}>Painel</a>
            <a href="/app/usuarios/novo"
               style={{display:"block",padding:"8px 12px",borderRadius:8,background:"#1f2937",border:"1px solid #374151",color:"#e5e7eb",textDecoration:"none"}}>Novo Usuário</a>
          </nav>
        </aside>
        <main style={{minWidth:0}}>{children}</main>
      </div>
    </div>
  );
}
