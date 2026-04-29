export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground">
      <div className="text-center max-w-lg px-6">
        <div className="text-primary font-mono font-bold text-sm mb-4 uppercase tracking-widest border border-primary inline-block px-3 py-1">Error 404</div>
        <h1 className="text-6xl sm:text-8xl font-black uppercase tracking-tighter mb-6">Route Dropped</h1>
        <p className="text-xl font-serif text-muted-foreground italic mb-10">
          The requested path could not be resolved. The resource may have been migrated, deleted, or never existed.
        </p>
        <a href="/" className="inline-block bg-primary text-background font-black uppercase tracking-widest py-3 px-8 hover:bg-white transition-colors text-sm">
          Return to Safe Harbor
        </a>
      </div>
    </div>
  );
}
