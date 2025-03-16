export function Footer() {
  return (
    <footer className="py-6 border-t">
      <div className="container flex items-center justify-center text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()}{" "}
          <a
            href="https://subreddit-finder.shetty.me/"
            className="hover:text-foreground transition-colors"
          >
            Subreddit Finder
          </a>
        </p>
      </div>
    </footer>
  )
}
