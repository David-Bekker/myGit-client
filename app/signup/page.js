"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GitBranchIcon, Loader2 } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/login"); // Redirect to login after successful signup
      } else {
        const data = await response.json();
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center px-4 py-12">
      <GitBranchIcon className="w-12 h-12 text-[#f0f6fc] mb-6" />
      <h1 className="text-3xl font-light text-[#f0f6fc] mb-8">Create your account</h1>

      <div className="w-full max-w-[440px] bg-[#161b22] border border-[#30363d] rounded-md p-6 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#f0f6fc] mb-2">Username</label>
            <input
              required
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-sm text-[#e6edf3] focus:ring-1 focus:ring-[#1f6feb] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#f0f6fc] mb-2">Email address</label>
            <input
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-sm text-[#e6edf3] focus:ring-1 focus:ring-[#1f6feb] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#f0f6fc] mb-2">Password</label>
            <input
              required
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-sm text-[#e6edf3] focus:ring-1 focus:ring-[#1f6feb] outline-none"
            />
          </div>

          <p className="text-xs text-[#7d8590]">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </p>

          {error && <p className="text-xs text-[#f85149] bg-[#f851491a] border border-[#f8514966] p-3 rounded">{error}</p>}

          <button
            disabled={isLoading}
            className="w-full bg-[#238636] hover:bg-[#2ea043] text-white font-bold py-2 rounded-md transition-colors flex items-center justify-center gap-2 mt-4"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            Create account
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-[#30363d] text-center">
          <p className="text-sm text-[#7d8590]">
            Already have an account?{" "}
            <Link href="/login" className="text-[#539bf5] hover:underline">Sign in →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}