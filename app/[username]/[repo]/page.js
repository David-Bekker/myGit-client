import Repository from "@/components/Repository";

export default async function RepoPage({ params }) {
  const { username, repo } = await params;

  return (
    <main>
      {/* This component will now know exactly which repo to show */}
      <Repository username={username} repoName={repo} />
      <code />
    </main>
  );
}