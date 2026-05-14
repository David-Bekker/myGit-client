"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { GitBranchIcon, Plus, Bell, ChevronDown, LogOut, User, Settings } from "lucide-react";

export default function Navbar() {
    // Inside the Navbar component:
  const pathname = usePathname();
  if (pathname === "/login" || pathname === "/signup") return null;
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleNewRepo = () => {
    router.push("/new");
  };

  const handleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  useEffect(() => {
    // Get username from localStorage after component mounts
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <header className="bg-[#161b22] border-b border-[#30363d] px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <Link href="/">
          <GitBranchIcon className="w-8 h-8 text-[#f0f6fc] hover:text-[#7d8590] transition-colors" />
        </Link>
        
        {/* Search Bar - Hidden on small screens */}
        <div className="hidden md:block w-72">
          <input
            type="text"
            placeholder="Search or jump to..."
            className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1 text-sm text-[#e6edf3] focus:w-96 transition-all focus:ring-1 focus:ring-[#1f6feb] outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={handleNewRepo} className="text-[#7d8590] hover:text-[#e6edf3] p-1" title="Create new">
          <Plus className="w-5 h-5" />
        </button>
        <button onClick={handleNotifications} className="text-[#7d8590] hover:text-[#e6edf3] p-1 relative" title="Notifications">
          <Bell className="w-5 h-5" />
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-12 w-64 bg-[#161b22] border border-[#30363d] rounded-md shadow-2xl z-50 py-2">
              <div className="px-4 py-2 text-sm text-[#7d8590] text-center">No new notifications</div>
            </div>
          )}
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1 hover:opacity-80 transition-opacity"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 to-green-500 flex items-center justify-center text-[10px] font-bold uppercase text-white border border-[#30363d]">
              {username ? username[0] : "G"}
            </div>
            <ChevronDown className="w-3 h-3 text-[#7d8590]" />
          </button>

          {isDropdownOpen && (
            <>
              {/* Invisible backdrop to close dropdown when clicking outside */}
              <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
              
              <div className="absolute right-0 mt-2 w-48 bg-[#161b22] border border-[#30363d] rounded-md shadow-2xl z-20 py-1 animate-in fade-in zoom-in duration-100">
                <div className="px-4 py-2 border-b border-[#30363d] text-xs">
                  <p className="text-[#7d8590]">Signed in as</p>
                  <p className="font-semibold text-[#e6edf3] truncate">{username}</p>
                </div>
                
                <Link 
                  href={`/${username}`} 
                  className="flex items-center gap-2 px-4 py-2 text-sm text-[#e6edf3] hover:bg-[#1f6feb] transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <User className="w-4 h-4" /> Your profile
                </Link>
                
                <Link 
                  href="/settings" 
                  className="flex items-center gap-2 px-4 py-2 text-sm text-[#e6edf3] hover:bg-[#1f6feb] transition-colors"
                >
                  <Settings className="w-4 h-4" /> Settings
                </Link>

                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#f85149] hover:bg-[#1f6feb] hover:text-white transition-colors border-t border-[#30363d] mt-1"
                >
                  <LogOut className="w-4 h-4" /> Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}