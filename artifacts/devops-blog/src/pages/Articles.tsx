import { Layout } from "@/components/Layout";
import { ARTICLES } from "@/data/articles";
import { Link } from "wouter";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Articles() {
  const [filter, setFilter] = useState<string>("ALL");
  
  const categories = ["ALL", ...Array.from(new Set(ARTICLES.map(a => a.category)))];
  
  const filteredArticles = filter === "ALL" 
    ? ARTICLES 
    : ARTICLES.filter(a => a.category === filter);

  return (
    <Layout>
      <div className="px-6 sm:px-10 lg:px-16 py-16 max-w-7xl mx-auto min-h-[60vh]">
        <div className="mb-16">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-primary mb-6">Archive</h1>
          <p className="text-xl font-serif text-muted-foreground italic max-w-2xl">
            A complete record of postmortems, architecture reviews, and operational philosophy.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-12 border-b-[3px] border-border pb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`font-mono text-xs font-bold uppercase tracking-widest px-4 py-2 border-[2px] transition-colors ${
                filter === cat 
                  ? "bg-primary text-background border-primary" 
                  : "bg-transparent text-muted-foreground border-border hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {filteredArticles.map((article, i) => (
            <motion.article 
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex flex-col group"
            >
              <div className="flex items-center gap-3 mb-4 font-mono text-xs uppercase font-bold tracking-widest">
                <span className={article.category === 'Incidents' ? 'text-destructive' : 'text-primary'}>
                  {article.category}
                </span>
                <span className="text-border">/</span>
                <span className="text-muted-foreground">{format(new Date(article.publishedAt), "MMM dd")}</span>
              </div>
              
              <h2 className="text-2xl font-bold leading-tight mb-4 group-hover:text-primary transition-colors">
                <Link href={`/articles/${article.slug}`}>
                  {article.title}
                </Link>
              </h2>
              
              <p className="text-base font-serif text-muted-foreground italic mb-6 flex-1">
                {article.subtitle}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-border/50">
                {article.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-mono border border-border bg-card px-1.5 py-0.5 text-muted-foreground uppercase">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </Layout>
  );
}
