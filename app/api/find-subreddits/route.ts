import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { problem } = await req.json()

    if (!problem || typeof problem !== "string") {
      return NextResponse.json(
        { error: "Problem description is required" },
        { status: 400 }
      )
    }

    const prompt = {
      instructions:
        "Based on the following problem or question, recommend 4-6 most relevant subreddits where the user should post. Give it as raw JSON, dont put it in a code block or anything else. Avoid any NSFW subreddits.",
      input: {
        problem: problem,
      },
      output_format: {
        type: "json",
        schema: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: "string - subreddit name without r/ prefix",
              description: "string - brief description of the subreddit",
              members:
                "string - approximate member count (e.g. '2.5M' or '500K')",
              url: "string - full URL to the subreddit",
            },
          },
        },
      },
    }

    const { text } = await generateText({
      model: google("gemini-1.5-flash"),
      prompt: JSON.stringify(prompt),
      temperature: 0.7,
      maxTokens: 1000,
    })

    const subreddits = JSON.parse(text)

    return NextResponse.json({ subreddits })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    )
  }
}
