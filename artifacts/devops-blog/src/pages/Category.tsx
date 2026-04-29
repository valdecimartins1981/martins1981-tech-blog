import { Layout } from "@/components/Layout";
import { ARTICLES } from "@/data/articles";
import { useParams, Link } from "wouter";
import { format } from "date-fns";
import { motion } from "framer-motion";
import NotFound from "./not-found";

export default function Category() {
  const { category } = useParams();
  
  if (!category) return <NotFound />;

  const normalizedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  
  const articles = ARTICLES.filter(a => a.category.toLowerCase() === category.toLowerCase() || a.tags.map(t=>t.toLowerCase()).includes(category.toLowerCase()));

  if (articles.length === 0) {
    return (
      <Layout>
        <div className="px-6 sm:px-10 lg:px-16 py-32 max-w-7xl mx-auto min-h-[60vh] flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-black uppercase tracking-tighter text-muted-foreground mb-6">No signals found</h1>
          <p className="font-mono text-sm">We couldn't find any articles for "{category}".</p>
          <Link href="/articles" className="mt-8 font-mono font-bold uppercase text-primary hover:underline border-[2px] border-primary px-6 py-3">
            Return to Archive
          </Link>
        </div>
      </Layout>
    );
  }

  const isIncident = category.toLowerCase() === 'incidents';

  return (
    <Layout>
      <div className="px-6 sm:px-10 lg:px-16 py-16 max-w-7xl mx-auto min-h-[60vh]">
        <div className="mb-16 border-b-[3px] border-border pb-16">
          <div className="inline-flex items-center gap-3 mb-6 font-mono text-sm uppercase font-bold tracking-widest text-muted-foreground">
            Category Filter Active
          </div>
          <h1 className={`text-6xl md:text-8xl font-black uppercase tracking-tighter ${isIncident ? 'text-destructive' : 'text-primary'} mb-6 flex items-center gap-6`}>
            {isIncident && <span className="h-6 w-6 md:h-10 md:w-10 bg-destructive animate-pulse block"></span>}
            {normalizedCategory}
          </h1>
          <p className="text-xl font-serif text-muted-foreground italic max-w-2xl">
            {articles.length} {articles.length === 1 ? 'record' : 'records'} found in this category.
          </p>
        </div>

        <div className="space-y-16">
          {articles.map((article, i) => (
            <motion.article 
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
            >
              <div className="md:col-span-8 flex flex-col">
                <div className="flex items-center gap-3 mb-4 font-mono text-xs uppercase font-bold tracking-widest">
                  <span className="text-muted-foreground">{format(new Date(article.publishedAt), "MMM dd, yyyy")}</span>
                  <span className="text-border">/</span>
                  <span className="text-muted-foreground">{article.readTime}</span>
                </div>
                
                <h2 className={`text-3xl md:text-4xl font-bold leading-tight mb-4 ${isIncident ? 'group-hover:text-destructive' : 'group-hover:text-primary'} transition-colors`}>
                  <Link href={`/articles/${article.slug}`}>
                    {article.title}
                  </Link>
                </h2>
                
                <p className="text-lg font-serif text-muted-foreground italic mb-6 max-w-3xl">
                  {article.subtitle}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {article.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-mono border border-border px-2 py-1 text-muted-foreground uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {article.coverImage && (
                <div className="md:col-span-4 h-full min-h-[200px] border border-border bg-card overflow-hidden order-first md:order-last">
                  <Link href={`/articles/${article.slug}`} className="block h-full w-full">
                    <img 
                      src={article.coverImage} 
                      alt={article.title}
                      className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                    />
                  </Link>
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </Layout>
  );
}
