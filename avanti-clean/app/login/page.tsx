"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Logo() {
  return (
    <div style={{display:"flex",gap:8,alignItems:"center"}}>
      <svg width="24" height="24" viewBox="0 0 24 24">
        <rect x="2" y="12" width="4" height="9" rx="1" fill="#84cc16"/>
        <rect x="9" y="9" width="4" height="12" rx="1" fill="#84cc16"/>
        <rect x="16" y="5" width="4" height="16" rx="1" fill="#84cc16"/>
      </svg>
      <b>Avanti <span style={{color:"#84cc16"}}>GR</span></b>
    </div>
  );
}

export default function LoginPage(){
  const router = useRouter();
  const [user,setUser] = useState("");
  const [pass,setPass] = useState("");
  const [show,setShow] = useState(false);

  function submit(e: React.FormEvent){
    e.preventDefault();
    router.push("/app");
  }

  return (
    <main style={{display:"grid",placeItems:"center",minHeight:"100vh",padding:24}}>
      <div style={{width:"100%",maxWidth:440, background:"#111827", border:"1px solid #1f2937",
                   borderRadius:16, padding:24, boxShadow:"0 15px 40px rgba(0,0,0,.35)"}}>
        <div style={{display:"flex",justifyContent:"center",marginBottom:12}}><Logo/></div>
        <p style={{textAlign:"center",opacity:.8,marginBottom:16}}>Acesso ao sistema</p>

        <form onSubmit={submit}>
          <label style={{fontSize:12,opacity:.8,display:"block",marginBottom:6}}>Usuário</label>
          <input value={user} onChange={e=>setUser(e.target.value)} required
            placeholder="Digite seu usuário"
            style={{width:"100%",padding:"12px",borderRadius:10,border:"1px solid #374151",background:"#1f2937",color:"#e5e7eb"}} />

          <div style={{height:12}}/>

          <label style={{fontSize:12,opacity:.8,display:"block",marginBottom:6}}>Senha</label>
          <div style={{position:"relative"}}>
            <input type={show?"text":"password"} value={pass} onChange={e=>setPass(e.target.value)} required
              placeholder="••••••••"
              style={{width:"100%",padding:"12px 44px 12px 12px",borderRadius:10,border:"1px solid #374151",background:"#1f2937",color:"#e5e7eb"}} />
            <button type="button" onClick={()=>setShow(v=>!v)}
              title={show?"Ocultar senha":"Mostrar senha"}
              style={{position:"absolute",right:6,top:6,border:"1px solid #84cc16",borderRadius:8,
                      background:"#1f2937",width:32,height:32,display:"grid",placeItems:"center",cursor:"pointer"}}>
              {show ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#84cc16" strokeWidth="2">
                  <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C7 20 2.73 16.11 1 12c.55-1.25 1.3-2.42 2.22-3.46M9.9 4.24A10.42 10.42 0 0 1 12 4c5 0 9.27 3.89 11 8-.32.74-.74 1.45-1.25 2.11M1 1l22 22"/>
                  <path d="M14.12 14.12A3 3 0 0 1 9.88 9.88"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#84cc16" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12Z"/><circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
          </div>

          <div style={{height:16}}/>
          <button type="submit"
            style={{width:"100%",padding:"12px",borderRadius:10,background:"#84cc16",color:"#111827",fontWeight:700,border:"none",cursor:"pointer"}}>
            Entrar
          </button>
        </form>

        <div style={{textAlign:"center",marginTop:12}}>
          <a href="/recuperar-senha" style={{fontSize:12,color:"#a3e635",textDecoration:"underline"}}>Esqueci a senha</a>
        </div>
      </div>
    </main>
  );
}
