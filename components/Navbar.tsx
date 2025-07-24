import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-[#212225] px-8 py-4 flex gap-8 items-center shadow-lg">
      <span className="font-bold text-xl tracking-tight text-yellow-400">MANDLACX</span>
      <Link href="/" className="hover:underline">Dashboard</Link>
      <Link href="/cameras" className="hover:underline">Cameras</Link>
      <Link href="/incidents" className="hover:underline">Incidents</Link>
      <Link href="/users" className="hover:underline">Users</Link>
      <div className="ml-auto flex gap-2 items-center">
        <div className="bg-yellow-400 w-8 h-8 rounded-full" />
        <div className="bg-orange-400 w-8 h-8 rounded-full" />
        <div className="bg-gray-400 w-8 h-8 rounded-full" />
      </div>
    </nav>
  );
}
