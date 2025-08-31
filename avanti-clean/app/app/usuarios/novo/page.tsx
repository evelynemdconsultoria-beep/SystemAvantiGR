"use client";
import { useMemo, useState } from "react";

const FUNCOES = ["Admin","Analista I","Analista II","Analista III","Gestor","Assistência","Visualizador"] as const;
type Funcao = typeof FUNCOES[number];

function slugify(s: string){
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g,"")
          .toLowerCase().replace(/[^a-z0-9]+/g,".").replace(/^\.+|\.+$/g,"");
}
function maskPhone(v:string){
  const n = v.replace(/\D/g,"").slice(0,11);
  const p1=n.slice(0,2), p2=n.length>6?n.slice(2,7):n.slice(2,6), p3=n.length>6?n.slice(7):n.slice(6);
  if(n.length<=2) return n;
  if(n.length<=6) return `(${p1}) ${p2}`;
  return `(${p1}) ${p2}-${p3}`;
}

export default function NovoUsuario(){
  const [abrir,setAbrir] = useState(true);
  const [nome,setNome] = useState("");
  const [email,setEmail] = useState("");
  const [telefone,setTelefone] = useState("");
  const [funcoes,setFuncoes] = useState<Funcao[]>([]);

  const usuario = useMemo(()=>{
    if(!nome) return "";
    const base = slugify(nome).split(".").filter(Boolean).slice(0,2).join(".");
    const rand = Math.floor(100+Math.random()*900);
    return `${base}.${rand}`;
  },[nome]);

  function salvar(e: React.FormEvent){
    e.preventDefault();
    if(!nome || !email){ alert("Preencha Nome e E-mail."); return; }
    const payload = {nome, email, telefone, usuario, funcoes};
    console.log("NOVO USUÁRIO:", payload);
    alert("Usuário criado!");
    setNome(""); setEmail(""); setTelefone(""); setFuncoes([]); setAbrir(false);
  }

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12}}>
        <h1 style={{margin:"6px 0 12px",fontSize:24}}>Usuários • Novo</h1>
        {!abrir && (
          <button onClick={()=>setAbrir(true)}
            style={{padding:"10px 14px",borderRadius:10,background:"#84cc16",color:"#111827",fontWeight:700,border:"none",cursor:"pointer"}}>
            Adicionar
          </button>
        )}
      </div>

      {abrir && (
        <form onSubmit={salvar}
          style={{background:"#111827",border:"1px solid #1f2937",borderRadius:12,padding:16,display:"grid",gap:12}}>
          <div style={{display:"grid",gap:12,gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))"}}>
            <div>
              <label style={{fontSize:12,opacity:.7,display:"block",marginBottom:6}}>Nome</label>
              <input value={nome} onChange={e=>setNome(e.target.value)} required
                placeholder="Nome completo"
                style={{width:"100%",padding:"12px",borderRadius:10,border:"1px solid #374151",background:"#1f2937",color:"#e5e7eb"}}/>
            </div>
            <div>
              <label style={{fontSize:12,opacity:.7,display:"block",marginBottom:6}}>E-mail</label>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required
                placeholder="nome@empresa.com"
                style={{width:"100%",padding:"12px",borderRadius:10,border:"1px solid #374151",background:"#1f2937",color:"#e5e7eb"}}/>
            </div>
            <div>
              <label style={{fontSize:12,opacity:.7,display:"block",marginBottom:6}}>Telefone</label>
              <input value={telefone} onChange={e=>setTelefone(maskPhone(e.target.value))}
                placeholder="(11) 99999-9999"
                style={{width:"100%",padding:"12px",borderRadius:10,border:"1px solid #374151",background:"#1f2937",color:"#e5e7eb"}}/>
            </div>
            <div>
              <label style={{fontSize:12,opacity:.7,display:"block",marginBottom:6}}>Usuário (gerado)</label>
              <input value={usuario} readOnly
                style={{width:"100%",padding:"12px",borderRadius:10,border:"1px solid #374151",background:"#0b1220",color:"#a3e635"}}/>
            </div>
          </div>

          <div>
            <label style={{fontSize:12,opacity:.7,display:"block",marginBottom:6}}>Funções (Ctrl/Cmd para múltiplas)</label>
            <select
              multiple
              value={funcoes as unknown as string[]}
              onChange={e=>{
                const list = [...e.currentTarget.options].filter(o=>o.selected).map(o=>o.value as Funcao);
                setFuncoes(list);
              }}
              style={{width:"100%",minHeight:120,padding:12,borderRadius:10,border:"1px solid #374151",background:"#1f2937",color:"#e5e7eb"}}
            >
              {FUNCOES.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>

          <div style={{display:"flex",gap:8}}>
            <button type="submit"
              style={{padding:"10px 14px",borderRadius:10,background:"#84cc16",color:"#111827",fontWeight:700,border:"none",cursor:"pointer"}}>
              Salvar
            </button>
            <button type="button" onClick={()=>setAbrir(false)}
              style={{background:"transparent",border:"none",textDecoration:"underline",color:"#a3e635",cursor:"pointer"}}>
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
