import { Layout } from "@/components/Layout";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { searchArticles } from "@/lib/search";

function useQueryParam(name: string): [string, (next: string) => void] {
  const [location, setLocation] = useLocation();
  const value = useMemo(() => {
    const search = typeof window !== "undefined" ? window.location.search : "";
    return new URLSearchParams(search).get(name) ?? "";
  }, [location, name]);

  const setValue = (next: string) => {
    const params = new URLSearchParams(window.location.search);
    if (next) params.set(name, next);
    else params.delete(name);
    const qs = params.toString();
    setLocation(`/search${qs ? `?${qs}` : ""}`);
  };

  return [value, setValue];
}

function highlight(text: string, query: string) {
  if (!query) return text;
  const lower = text.toLowerCase();
  const q = query.toLowerCase();
  const parts: Array<{ text: string; match: boolean }> = [];
  let cursor = 0;
  let idx = lower.indexOf(q, cursor);
  while (idx !== -1) {
    if (idx > cursor) parts.push({ text: text.slice(cursor, idx), match: false });
    parts.push({ text: text.slice(idx, idx + query.length), match: true });
    cursor = idx + query.length;
    idx = lower.indexOf(q, cursor);
  }
  if (cursor < text.length) parts.push({ text: text.slice(cursor), match: false });
  return parts.map((p, i) =>
    p.match ? (
      <mark key={i} className="bg-primary text-background px-0.5">
        {p.text}
      </mark>
    ) : (
      <span key={i}>{p.text}</span>
    ),
  );
}

export default function Search() {
  const [query, setQuery] = useQueryParam("q");
  const [input, setInput] = useState(query);

  useEffect(() => {
    setInput(query);
  }, [query]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (input !== query) setQuery(input);
    }, 200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  const results = useMemo(() => searchArticles(query), [query]);

  return (
    <Layout>
      <div className="px-6 sm:px-10 lg:px-16 py-16 max-w-7xl mx-auto min-h-[60vh]">
        <div className="mb-12">
          <div className="font-mono text-xs uppercase tracking-widest text-primary mb-4">
            // Search the archive
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-primary mb-8">
            Find a post
          </h1>

          <div className="relative border-b-[3px] border-border focus-within:border-primary transition-colors">
            <input
              type="search"
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search titles, tags, authors, body…"
              className="w-full bg-transparent text-2xl md:text-4xl font-bold py-4 pr-16 outline-none placeholder:text-muted-foreground/60 text-foreground"
              data-testid="input-search"
            />
            <div className="absolute right-2 bottom-5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {query ? `${results.length} ${results.length === 1 ? "hit" : "hits"}` : "type to search"}
            </div>
          </div>
        </div>

        {!query && (
          <div className="font-serif italic text-muted-foreground text-lg max-w-2xl">
            Try searching for <span className="text-primary not-italic font-mono text-sm uppercase">on-call</span>,{" "}
            <span className="text-primary not-italic font-mono text-sm uppercase">postmortem</span>, or{" "}
            <span className="text-primary not-italic font-mono text-sm uppercase">kubernetes</span>.
          </div>
        )}

        {query && results.length === 0 && (
          <div className="border-[3px] border-border p-10">
            <div className="font-mono text-xs uppercase tracking-widest text-destructive mb-3">
              // No results
            </div>
            <p className="text-2xl font-bold mb-2">Nothing matched "{query}".</p>
            <p className="font-serif italic text-muted-foreground">
              Try fewer words, or browse the{" "}
              <Link href="/articles" className="text-primary underline">
                full archive
              </Link>
              .
            </p>
          </div>
        )}

        {query && results.length > 0 && (
          <div className="divide-y-[3px] divide-border border-t-[3px] border-b-[3px] border-border">
            {results.map((hit, i) => (
              <motion.article
                key={hit.article.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="py-10 grid grid-cols-1 md:grid-cols-[140px_1fr] gap-6 group"
                data-testid={`result-${hit.article.slug}`}
              >
                <div className="flex md:flex-col gap-3 md:gap-2 font-mono text-xs uppercase tracking-widest">
                  <span
                    className={
                      hit.article.category === "Incidents"
                        ? "text-destructive font-bold"
                        : "text-primary font-bold"
                    }
                  >
                    {hit.article.category}
                  </span>
                  <span className="text-muted-foreground">
                    {format(new Date(hit.article.publishedAt), "MMM dd, yyyy")}
                  </span>
                  <span className="text-muted-foreground">{hit.article.readTime}</span>
                </div>

                <div>
                  <Link
                    href={`/articles/${hit.article.slug}`}
                    className="block text-2xl md:text-3xl font-black leading-tight tracking-tight mb-3 group-hover:text-primary transition-colors"
                  >
                    {highlight(hit.article.title, query)}
                  </Link>

                  <p className="font-serif italic text-muted-foreground text-base md:text-lg mb-4 max-w-3xl">
                    {highlight(hit.excerpt, query)}
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {hit.article.author.name}
                    </span>
                    <span className="text-border">/</span>
                    <div className="flex flex-wrap gap-1.5">
                      {hit.article.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono border border-border bg-card px-1.5 py-0.5 text-muted-foreground uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-border">/</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                      matched: {hit.matchedIn.join(", ")}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
