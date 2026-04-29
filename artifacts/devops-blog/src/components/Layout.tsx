import { Link } from "wouter";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      {/* Brutalist Header */}
      <header className="border-b-[3px] border-border py-4 px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sticky top-0 bg-background z-50">
        <Link href="/" className="group inline-block">
          <div className="text-4xl sm:text-5xl font-black tracking-tighter text-primary group-hover:text-foreground transition-colors duration-200">
            SIGNAL
          </div>
          <div className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-muted-foreground group-hover:text-primary transition-colors">
            For engineers running prod
          </div>
        </Link>

        <nav className="flex flex-wrap gap-x-8 gap-y-4 font-mono text-xs uppercase tracking-wider font-bold">
          <Link href="/articles" className="hover:text-primary transition-colors">Articles</Link>
          <div className="flex flex-col gap-1 hidden md:flex">
            <Link href="/categories/sre" className="hover:text-primary transition-colors">SRE</Link>
            <Link href="/categories/devops" className="hover:text-primary transition-colors">DevOps</Link>
          </div>
          <div className="flex flex-col gap-1 hidden md:flex">
            <Link href="/categories/platform" className="hover:text-primary transition-colors">Platform</Link>
            <Link href="/categories/incidents" className="hover:text-primary transition-colors">Incidents</Link>
          </div>
          <Link href="/about" className="hover:text-primary transition-colors">About</Link>
          <Link href="/newsletter" className="text-primary hover:text-white transition-colors">Newsletter</Link>
        </nav>
      </header>

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
              <li><a href="#" className="hover:text-primary transition-colors">Pitch an Article</a></li>
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
