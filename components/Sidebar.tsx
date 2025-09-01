import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="w-60 border-r p-4">
      <nav className="space-y-2">
        <Link href="/" className="block px-3 py-2 rounded hover:bg-neutral-100">Dashboard</Link>
        <Link href="/avanti-smart" className="block px-3 py-2 rounded hover:bg-neutral-100">Avanti Smart</Link>
      </nav>
    </aside>
  );
}
