import Code from "@/components/Code";

// Just ONE default export
export default async function CodeViewerPage({ params }) {
  // We don't even need to destructure here if Code uses useParams()
  return (
    <main className="bg-[#0d1117] min-h-screen">
      <Code />
    </main>
  );
}