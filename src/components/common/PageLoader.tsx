export default function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-primary">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <span
          className="h-10 w-10 animate-spin rounded-full
                     border-2 border-muted border-t-brand"
          aria-label="Loading"
        />

        {/* Text */}
        <p className="text-sm text-muted tracking-wide">
          Loading…
        </p>
      </div>
    </div>
  );
}
