import { Link, useLocation } from "wouter";
import { useState, useEffect, useRef } from "react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [, setLocation] = useLocation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    setOpen(false);
    setValue("");
    setLocation(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      {/* Brutalist Header */}
      <header className="border-b-[3px] border-border py-4 px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sticky top-0 bg-background z-50">
        <Link href="/" className="group inline-block">
          <div className="text-4xl sm:text-5xl font-black tracking-tighter text-primary group-hover:text-foreground transition-colors duration-200">Martins1981</div>
          <div className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-muted-foreground group-hover:text-primary transition-colors">
            For engineers running prod
          </div>
        </Link>

        <nav className="flex flex-wrap items-center gap-x-8 gap-y-4 font-mono text-xs uppercase tracking-wider font-bold">
          <Link href="/articles" className="hover:text-primary transition-colors">ARTIGOS</Link>
          <div className="flex flex-col gap-1 hidden md:flex">
            <Link href="/categories/sre" className="hover:text-primary transition-colors">SRE</Link>
            <Link href="/categories/devops" className="hover:text-primary transition-colors">DevOps</Link>
          </div>
          <div className="flex flex-col gap-1 hidden md:flex">
            <Link href="/categories/platform" className="hover:text-primary transition-colors">Platform</Link>
            <Link href="/categories/incidents" className="hover:text-primary transition-colors">Incidents</Link>
          </div>
          <Link href="/about" className="hover:text-primary transition-colors">SOBRE MIM</Link>
          <Link href="/newsletter" className="text-primary hover:text-white transition-colors">Newsletter</Link>
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 border-[2px] border-border px-3 py-1.5 hover:border-primary hover:text-primary transition-colors"
            aria-label="Open search"
            data-testid="button-open-search"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span>Search</span>
            <span className="text-[9px] text-muted-foreground border border-border/60 px-1 ml-1">⌘K</span>
          </button>
        </nav>
      </header>
      {/* Search overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-start justify-center pt-[12vh] px-6"
          onClick={() => setOpen(false)}
        >
          <form
            onSubmit={submit}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl border-[3px] border-primary bg-background"
          >
            <div className="flex items-center px-6 py-5 border-b-[3px] border-primary">
              <span className="font-mono text-xs uppercase tracking-widest text-primary mr-4">
                /search
              </span>
              <input
                ref={inputRef}
                type="search"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search SIGNAL…"
                className="flex-1 bg-transparent text-2xl md:text-3xl font-bold outline-none placeholder:text-muted-foreground/60"
                data-testid="input-quick-search"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground border border-border px-2 py-1 ml-4 hover:text-primary hover:border-primary transition-colors"
              >
                ESC
              </button>
            </div>
            <div className="px-6 py-4 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <span>Press Enter to search the archive</span>
              <span className="text-primary">↵</span>
            </div>
          </form>
        </div>
      )}
      <main className="flex-1">
        {children}
      </main>
      {/* Heavy Editorial Footer */}
      <footer className="border-t-[3px] border-border mt-20 bg-card py-16 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h2 className="text-6xl font-black text-primary mb-4 tracking-tighter">SIGNAL</h2>
            <p className="text-lg font-serif text-muted-foreground max-w-md italic">
              A bold publication for SREs, DevOps engineers, and platform teams. Written by people who have been paged at 3am.
            </p>
          </div>
          
          <div>
            <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-primary mb-6">Categories</h3>
            <ul className="space-y-3 font-sans font-medium">
              <li><Link href="/categories/sre" className="hover:text-primary transition-colors">SRE</Link></li>
              <li><Link href="/categories/devops" className="hover:text-primary transition-colors">DevOps</Link></li>
              <li><Link href="/categories/platform" className="hover:text-primary transition-colors">Platform</Link></li>
              <li><Link href="/categories/observability" className="hover:text-primary transition-colors">Observability</Link></li>
              <li><Link href="/categories/incidents" className="hover:text-primary transition-colors">Incidents & Postmortems</Link></li>
              <li><Link href="/categories/culture" className="hover:text-primary transition-colors">Engineering Culture</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-primary mb-6">Colophon</h3>
            <ul className="space-y-3 font-sans font-medium">
              <li><Link href="/about" className="hover:text-primary transition-colors">About the Publication</Link></li>
              <li><Link href="/newsletter" className="hover:text-primary transition-colors">The Weekly Pager</Link></li>
              <li><Link href="/search" className="hover:text-primary transition-colors">Search the Archive</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">RSS Feed</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm font-mono text-muted-foreground">
          <p>© {new Date().getFullYear()} SIGNAL Publication. All rights reserved.</p>
          <p>Built for the terminal generation.</p>
        </div>
      </footer>
    </div>
  );
}
