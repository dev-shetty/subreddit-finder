import { ExternalLink, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface SubredditResultProps {
  name: string
  description: string
  members: string
  url: string
}

export function SubredditResult({ name, description, members, url }: SubredditResultProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">r/{name}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <Users className="h-3 w-3" />
          {members} members
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-4">{description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            Visit Subreddit
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}

