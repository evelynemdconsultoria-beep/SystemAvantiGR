import "./globals.css";

export const metadata = { title: "Avanti GR", description: "Sistema Avanti GR" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={{background: "linear-gradient(#2a3343,#0e1525)", minHeight: "100vh", color:"#e5e7eb"}}>
        {children}
      </body>
    </html>
  );
}
