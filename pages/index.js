import { useEffect } from "react";
import { useRouter } from "next/router";
export default function Home(){
  const r = useRouter();
  useEffect(()=>{
    const ok = typeof window!=="undefined" && localStorage.getItem("logado")==="true";
    r.replace(ok?"/painel":"/login");
  },[r]);
  return null;
}
