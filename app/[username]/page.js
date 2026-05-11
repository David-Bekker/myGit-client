import Profile from "@/components/Profile";

export default async function UserProfilePage({ params }) {
  // In Next.js, we await params to get the dynamic segments
  const { username } = await params; 

  return (
    <main>
      {/* Pass the username to your component to fetch that user's data */}
      <Profile username={username} />
    </main>
  );
}