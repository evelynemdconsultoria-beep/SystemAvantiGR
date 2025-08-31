"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RecuperarSenha(){
  const [valor,setValor] = useState("");
  const [tipo,setTipo] = useState<"email"|"telefone">("email");
  const router = useRouter();

  const soNum = (s:string)=>s.replace(/\D/g,"");
  const maskPhone = (v:string)=>{
    const n = soNum(v).slice(0,11);
    const p1=n.slice(0,2), p2=n.length>6?n.slice(2,7):n.slice(2,6), p3=n.length>6?n.slice(7):n.slice(6);
    if(n.length<=2) return n;
    if(n.length<=6) return `(${p1}) ${p2}`;
    return `(${p1}) ${p2}-${p3}`;
  };

  function submit(e: React.FormEvent){
    e.preventDefault();
    alert(`Código de recuperação enviado para ${tipo==="email"?"o e-mail":"o telefone"}: ${valor}`);
    router.push("/login");
  }

  return (
    <main style={{display:"grid",placeItems:"center",minHeight:"100vh",padding:24}}>
      <div style={{width:"100%",maxWidth:460, background:"#111827", border:"1px solid #1f2937", borderRadius:16, padding:24}}>
        <h2 style={{marginTop:0}}>Recuperar senha</h2>
        <form onSubmit={submit}>
          <div style={{display:"flex",gap:8,marginBottom:12}}>
            <label style={{display:"flex",alignItems:"center",gap:6,fontSize:14}}>
              <input type="radio" name="tipo" checked={tipo==="email"} onChange={()=>setTipo("email")} /> E-mail
            </label>
            <label style={{display:"flex",alignItems:"center",gap:6,fontSize:14}}>
              <input type="radio" name="tipo" checked={tipo==="telefone"} onChange={()=>setTipo("telefone")} /> Telefone
            </label>
          </div>

          <input
            value={valor}
            onChange={e=>setValor(tipo==="telefone" ? maskPhone(e.target.value) : e.target.value)}
            placeholder={tipo==="email" ? "seu@email.com" : "(11) 99999-9999"}
            required
            style={{width:"100%",padding:"12px",borderRadius:10,border:"1px solid #374151",background:"#1f2937",color:"#e5e7eb"}}
          />

          <div style={{height:16}}/>
          <button type="submit"
            style={{width:"100%",padding:"12px",borderRadius:10,background:"#84cc16",color:"#111827",fontWeight:700,border:"none",cursor:"pointer"}}>
            Enviar
          </button>
        </form>

        <div style={{textAlign:"center",marginTop:12}}>
          <a href="/login" style={{fontSize:12,textDecoration:"underline",color:"#a3e635"}}>Voltar ao login</a>
        </div>
      </div>
    </main>
  );
}
