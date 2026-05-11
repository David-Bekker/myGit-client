"use client";
import { useState } from "react";
import Link from "next/link"; // Use next/link
import { usePathname, useRouter } from "next/navigation"; // Use next/navigation
import { Search, GitBranch, Bell, Plus } from "lucide-react";

export function Layout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In Next.js, we use router.push
      router.push(`/search?q=${encodeURIComponent(searchQuery)}&type=repositories`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3]">
      <header className="border-b border-[#30363d] bg-[#010409]">
        <div className="mx-auto px-4 py-3 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80">
            <GitBranch className="w-8 h-8" />
            <span className="text-xl font-semibold">GitHub</span>
          </Link>

          <div className="flex-1 max-w-xl">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7d8590]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search or jump to..."
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-md pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:border-[#1f6feb]"
              />
            </form>
          </div>

          <nav className="flex items-center gap-4 text-sm font-medium">
            <Link href="/pulls" className="hover:text-[#539bf5]">Pull requests</Link>
            <Link href="/issues" className="hover:text-[#539bf5]">Issues</Link>
            <button className="hover:text-[#539bf5]">Marketplace</button>
            <button className="hover:text-[#539bf5]">Explore</button>
          </nav>

          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 cursor-pointer hover:text-[#539bf5]" />
            <Plus className="w-5 h-5 cursor-pointer hover:text-[#539bf5]" />
            <div className="w-8 h-8 rounded-full bg-[#1f6feb] flex items-center justify-center cursor-pointer">
              <span>U</span>
            </div>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}