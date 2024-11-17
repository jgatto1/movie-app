"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoggedIn = pathname.startsWith("/movies"); // Simple check, can be replaced with actual auth logic

  const handleLogout = () => {
    router.replace("/login");
  };

  return (
    <div>
      <nav className="p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/movies" className="text-white text-xl font-bold">
            Home
          </Link>

          <div>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-white px-4 py-2 rounded transition-colors flex items-center gap-2"
              >
                Logout <FiLogOut />
              </button>
            ) : (
              <Link
                href="/login"
                className="text-white px-4 py-2 rounded transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {children}
    </div>
  );
}
