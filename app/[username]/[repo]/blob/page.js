// app/[username]/[repo]/blob/[branch]/page.js
import { redirect } from 'next/navigation';

export default async function BranchRoot({ params }) {
  const { username, repo } = await params;
  // Send them back to the main repo view
  redirect(`/${username}/${repo}`);
}