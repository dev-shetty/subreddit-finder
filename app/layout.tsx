import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"
import { Footer } from "@/components/footer"
import { GitHubRibbon } from "@/components/github-ribbon"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Reddit Subreddit Finder",
  description: "Find the best subreddits for your question or problem",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Reddit Subreddit Finder",
    description: "Find the best subreddits for your question or problem",
    images: "/og.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reddit Subreddit Finder",
    description: "Find the best subreddits for your question or problem",
    images: "/og.png",
  },
  authors: [{ name: "Deveesh Shetty" }],
  creator: "Deveesh Shetty",
  themeColor: "#000000",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <GitHubRibbon />
        <div className="flex-grow">{children}</div>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
