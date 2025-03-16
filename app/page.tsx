"use client"

import type React from "react"

import { useState } from "react"
import { Loader2, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { SubredditResult } from "./subreddit-result"

export default function Home() {
  const [problem, setProblem] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<Array<{
    name: string
    description: string
    members: string
    url: string
  }> | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!problem.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/find-subreddits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ problem }),
      })

      if (!response.ok) {
        throw new Error("Failed to get recommendations")
      }

      const data = await response.json()
      setResults(data.subreddits)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="container max-w-4xl py-10 px-4 md:px-6">
      <div className="flex flex-col items-center text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Find the Perfect Subreddit</h1>
        <p className="text-muted-foreground max-w-[700px]">
          Describe your problem or question, and our AI will recommend the most relevant subreddits for you to post in.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>What's your question or problem?</CardTitle>
          <CardDescription>Be specific to get the most relevant recommendations.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Textarea
              placeholder="E.g., I'm trying to learn Python and struggling with understanding functions..."
              className="min-h-[120px]"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading || !problem.trim()}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Finding subreddits...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Find Subreddits
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {results && results.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Recommended Subreddits</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {results.map((subreddit) => (
              <SubredditResult
                key={subreddit.name}
                name={subreddit.name}
                description={subreddit.description}
                members={subreddit.members}
                url={subreddit.url}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  )
}

