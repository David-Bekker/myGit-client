import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/NavBar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MyGit - GitHub Clone",
  description: "A full-stack GitHub clone built with Spring Boot and Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0d1117]">
        {/* The Navbar stays here so it shows up on every page */}
        <Navbar />
        
        {/* The "main" wrapper ensures content fills the screen correctly */}
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}