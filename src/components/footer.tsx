export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="container py-6 md:py-8">
        <p className="text-center text-sm text-muted-foreground">
          Built by{' '}
          <span className="font-medium text-foreground">Native ShadCN</span>
          . The source code is available on{' '}
          <a
            href="https://github.com/nativeshadcn/native-shadcn"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
