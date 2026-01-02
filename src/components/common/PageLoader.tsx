export default function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <span
          className="h-10 w-10 animate-spin rounded-full
                     border-2 border-foreground border-t-foreground"
          aria-label="Loading"
        />

        {/* Text */}
        <p className="text-sm text-foreground tracking-wide">
          Loading…
        </p>
      </div>
    </div>
  );
}
