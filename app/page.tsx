import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          Welcome to <span className="text-primary">Jinx.to</span>
        </h1>
        <p className="text-muted-foreground mb-8 text-lg">
          A production-ready Next.js starter with modern tooling
        </p>
        <div className="flex gap-4">
          <Link
            href="/dashboard"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2"
          >
            Get Started
          </Link>
          <Link
            href="https://nextjs.org/docs"
            target="_blank"
            className="border-border hover:bg-accent rounded-md border px-4 py-2"
          >
            Documentation
          </Link>
        </div>
      </div>
    </main>
  )
}
