import { Search } from "@/components/Search";

export default function HomePage() {
  return (
    <main>
      {/* You can put a Hero section or just your Search component here */}
      <h1 className="text-center mt-10 text-2xl font-bold">Search GitHub Repos</h1>
      <Search />
    </main>
  );
}