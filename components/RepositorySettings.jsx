"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { 
  ChevronRight, 
  AlertTriangle, 
  Trash2, 
  Check, 
  Shield, 
  Key, 
  Globe, 
  Settings, 
  Webhook, 
  GitBranch,
  Loader2
} from "lucide-react";

export default function RepositorySettings() {
  const { owner, repo } = useParams();
  const router = useRouter();

  // --- States ---
  const [activeSection, setActiveSection] = useState("general");
  const [repoName, setRepoName] = useState(repo || "");
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Feature Toggles State
  const [features, setFeatures] = useState({
    issues: true,
    wikis: true,
    sponsorships: false,
    mergeCommits: true,
    squashMerging: true,
    rebaseMerging: false,
  });

  // Handle auto-clear success message
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // --- Handlers ---
  const handleFeatureToggle = (feature) => {
    setFeatures(prev => ({ ...prev, [feature]: !prev[feature] }));
  };

  const handleRename = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSuccessMessage("Repository renamed successfully!");
    setIsSaving(false);
  };

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete ${owner}/${repo}? This cannot be undone.`)) {
      setIsDeleting(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      router.push(`/${owner}`);
    }
  };

  const navItems = [
    { id: "general", label: "General", icon: Settings },
    { id: "access", label: "Access", icon: Shield },
    { id: "branches", label: "Branches", icon: GitBranch },
    { id: "webhooks", label: "Webhooks", icon: Webhook },
    { id: "secrets", label: "Secrets", icon: Key },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 text-[#e6edf3] animate-in fade-in duration-500">
      {/* Breadcrumb */}
      <div className="mb-4 flex items-center gap-2 text-sm text-[#7d8590]">
        <Link href={`/${owner}/${repo}`} className="text-[#539bf5] hover:underline">
          {owner}/{repo}
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span>Settings</span>
      </div>

      <h1 className="text-2xl font-semibold mb-6">Repository Settings</h1>

      <div className="grid grid-cols-12 gap-8">
        {/* Sidebar Navigation */}
        <nav className="col-span-12 md:col-span-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left text-sm rounded-md transition-colors ${
                activeSection === item.id
                  ? "bg-[#161b22] text-[#e6edf3] font-medium border-l-2 border-[#fd8c73]"
                  : "text-[#7d8590] hover:bg-[#161b22] border-l-2 border-transparent"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Main Content Area */}
        <main className="col-span-12 md:col-span-9 space-y-6">
          {activeSection === "general" ? (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              
              {/* Repository Name Card */}
              <section className="border border-[#30363d] rounded-md p-6 bg-[#0d1117]">
                <h2 className="text-lg font-semibold mb-2">Repository name</h2>
                <p className="text-sm text-[#7d8590] mb-4">
                  Renaming this repository can be a destructive action.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={repoName}
                    onChange={(e) => setRepoName(e.target.value)}
                    className="w-full max-w-md bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-[#1f6feb] focus:border-[#1f6feb] outline-none"
                  />
                  <button 
                    disabled={isSaving || repoName === repo}
                    onClick={handleRename}
                    className="px-4 py-2 text-sm font-semibold bg-[#21262d] border border-[#30363d] rounded-md hover:bg-[#30363d] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSaving && <Loader2 className="w-3 h-3 animate-spin" />}
                    Rename
                  </button>
                </div>
                {successMessage && (
                  <p className="mt-3 text-sm text-[#3fb950] flex items-center gap-1">
                    <Check className="w-4 h-4" /> {successMessage}
                  </p>
                )}
              </section>

              {/* Visibility Card */}
              <section className="border border-[#30363d] rounded-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <Globe className="w-5 h-5 text-[#7d8590]" />
                      Visibility
                    </h2>
                    <p className="text-sm text-[#7d8590] mt-1">
                      Currently: <span className="text-[#e6edf3] font-medium">Public</span>
                    </p>
                  </div>
                  <button className="px-4 py-2 text-sm font-semibold border border-[#30363d] rounded-md hover:bg-[#21262d]">
                    Change visibility
                  </button>
                </div>
              </section>

              {/* Features Toggle Group */}
              <section className="border border-[#30363d] rounded-md overflow-hidden">
                <div className="p-6 border-b border-[#30363d]">
                  <h2 className="text-lg font-semibold">Features</h2>
                </div>
                <div className="divide-y divide-[#30363d]">
                  {[
                    { id: "issues", title: "Issues", desc: "Track work with project boards." },
                    { id: "wikis", title: "Wikis", desc: "Share documentation." },
                    { id: "sponsorships", title: "Sponsorships", desc: "Accept financial contributions." }
                  ].map((feat) => (
                    <div key={feat.id} className="p-4 flex items-start gap-4 hover:bg-[#161b22]/50 transition-colors">
                      <input
                        type="checkbox"
                        checked={features[feat.id]}
                        onChange={() => handleFeatureToggle(feat.id)}
                        className="mt-1.5 h-4 w-4 rounded border-[#30363d] bg-[#0d1117] text-[#1f6feb] focus:ring-[#1f6feb]"
                      />
                      <div>
                        <div className="text-sm font-semibold">{feat.title}</div>
                        <div className="text-xs text-[#7d8590]">{feat.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Danger Zone */}
              <section className="border border-[#d73a49] rounded-md overflow-hidden mt-12 bg-[#161b22]/20">
                <div className="p-4 bg-[#161b22]/40 border-b border-[#d73a49]">
                  <h2 className="font-semibold flex items-center gap-2 text-[#d73a49]">
                    <AlertTriangle className="w-5 h-5" />
                    Danger Zone
                  </h2>
                </div>
                <div className="divide-y divide-[#30363d]">
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold">Archive this repository</div>
                      <div className="text-xs text-[#7d8590]">Mark this repository as read-only.</div>
                    </div>
                    <button className="px-3 py-1.5 text-xs font-bold text-[#f85149] border border-[#30363d] rounded-md hover:bg-[#b62324] hover:text-white transition-all">
                      Archive
                    </button>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold">Delete this repository</div>
                      <div className="text-xs text-[#7d8590]">Once deleted, it is gone forever.</div>
                    </div>
                    <button 
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="px-3 py-1.5 text-xs font-bold text-white bg-[#da3633] rounded-md hover:bg-[#b62324] flex items-center gap-2"
                    >
                      {isDeleting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                      Delete
                    </button>
                  </div>
                </div>
              </section>
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center border border-dashed border-[#30363d] rounded-md text-[#7d8590]">
              <Settings className="w-12 h-12 mb-2 opacity-20" />
              <p>Section "{activeSection}" is under construction.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}