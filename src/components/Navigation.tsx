import Link from "next/link";

export default function Navigation() {
  return (
    <div className="flex justify-between px-12 py-10 border-b border-b-slate-200">
      <Link href="/" className="font-bold">
        Interview Ace
      </Link>
      <Link href="/">Home</Link>
    </div>
  );
}
