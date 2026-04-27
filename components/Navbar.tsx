import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-white hover:text-indigo-400 transition">
            JF
          </Link>

          <div className="flex gap-8 items-center">
            <Link
              href="/"
              className="text-gray-300 hover:text-indigo-400 font-medium transition"
            >
              Home
            </Link>
            <Link
              href="/projects"
              className="text-gray-300 hover:text-indigo-400 font-medium transition"
            >
              Projects
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
