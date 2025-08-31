"use client";
import { useEffect, useState } from "react";

type UsuarioInfo = { nome: string; online: boolean; ultimoLogin: string; };

function Semaforo({ on }: { on: boolean }){
  const color = on ? "#84cc16" : "#ef4444";
  return <span style={{display:"inline-block",width:14,height:14,borderRadius:"9999px",background:color,boxShadow:`0 0 0 2px ${on?"#a3e635":"#f87171"}`}}/>;
}

export default function UsuariosPainel(){
  const [info,setInfo] = useState<UsuarioInfo>({
    nome:"admin",
    online:true,
    ultimoLogin:new Date().toISOString()
  });

  useEffect(()=>{
    const t = setInterval(()=>setInfo(v=>({...v, online: Math.random()>0.2 })), 20000);
    return ()=>clearInterval(t);
  },[]);

  return (
    <div>
      <h1 style={{margin:"6px 0 12px",fontSize:24}}>Usuários • Painel</h1>

      <div style={{display:"grid",gap:12,gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))"}}>
        <div style={{background:"#111827",border:"1px solid #1f2937",borderRadius:12,padding:16}}>
          <div style={{fontSize:12,opacity:.7}}>Usuário</div>
          <div style={{marginTop:6,fontSize:18,fontWeight:700}}>{info.nome}</div>
        </div>
        <div style={{background:"#111827",border:"1px solid #1f2937",borderRadius:12,padding:16}}>
          <div style={{fontSize:12,opacity:.7}}>Status</div>
          <div style={{marginTop:6,display:"flex",alignItems:"center",gap:8,fontSize:18}}>
            <Semaforo on={info.online}/> {info.online?"Online":"Offline"}
          </div>
        </div>
        <div style={{background:"#111827",border:"1px solid #1f2937",borderRadius:12,padding:16}}>
          <div style={{fontSize:12,opacity:.7}}>Último login</div>
          <div style={{marginTop:6,fontSize:18}}>{new Date(info.ultimoLogin).toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}
