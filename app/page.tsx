import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          Welcome to <span className="text-primary">Jinx.to</span>
        </h1>
        <p className="mb-8 text-lg text-muted-foreground">
          A production-ready Next.js starter with modern tooling
        </p>
        <div className="flex gap-4">
          <Link
            href="/dashboard"
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
          >
            Get Started
          </Link>
          <Link
            href="https://nextjs.org/docs"
            target="_blank"
            className="rounded-md border border-border px-4 py-2 hover:bg-accent"
          >
            Documentation
          </Link>
        </div>
      </div>
    </main>
  )
}
