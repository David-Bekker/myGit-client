"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GitBranchIcon, Loader2, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // Store token in localStorage or a cookie
        localStorage.setItem("token", data.token);
        router.push("/"); // Redirect to home/dashboard
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center px-4">
      <div className="mb-8 text-center">
        <GitBranchIcon className="w-12 h-12 text-[#f0f6fc] mx-auto mb-4" />
        <h1 className="text-2xl font-light text-[#f0f6fc]">Sign in to GitHub Clone</h1>
      </div>

      <div className="w-full max-w-[340px] bg-[#161b22] border border-[#30363d] rounded-md p-5 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-normal text-[#f0f6fc] mb-2">Username or email address</label>
            <input
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-sm text-[#e6edf3] focus:ring-1 focus:ring-[#1f6feb] focus:border-[#1f6feb] outline-none"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-normal text-[#f0f6fc]">Password</label>
              <Link href="#" className="text-xs text-[#539bf5] hover:underline">Forgot password?</Link>
            </div>
            <input
              required
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-sm text-[#e6edf3] focus:ring-1 focus:ring-[#1f6feb] focus:border-[#1f6feb] outline-none"
            />
          </div>

          {error && <p className="text-xs text-[#f85149] bg-[#f851491a] border border-[#f8514966] p-2 rounded">{error}</p>}

          <button
            disabled={isLoading}
            className="w-full bg-[#238636] hover:bg-[#2ea043] text-white font-semibold py-1.5 rounded-md text-sm transition-colors flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            Sign in
          </button>
        </form>
      </div>

      <div className="mt-4 w-full max-w-[340px] border border-[#30363d] rounded-md p-4 text-center">
        <p className="text-sm text-[#f0f6fc]">
          New to GitHub Clone?{" "}
          <Link href="/signup" className="text-[#539bf5] hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
}