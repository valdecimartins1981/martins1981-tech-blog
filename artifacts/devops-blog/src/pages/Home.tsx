import { Link } from "wouter";
import { ARTICLES } from "@/data/articles";
import { Layout } from "@/components/Layout";
import { format } from "date-fns";
import { motion } from "framer-motion";

export default function Home() {
  const featuredArticle = ARTICLES[0];
  const recentArticles = ARTICLES.slice(1, 5);
  const incidentArticles = ARTICLES.filter(a => a.category === "Incidents").slice(0, 2);

  return (
    <Layout>
      {/* Massive Hero Section */}
      <section className="px-6 sm:px-10 lg:px-16 py-12 md:py-24 border-b-[3px] border-border bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <div className="inline-flex items-center gap-3 mb-8">
            <span className="h-3 w-3 bg-primary block animate-pulse"></span>
            <span className="font-mono text-sm font-bold uppercase tracking-widest text-primary">System Status: Degraded</span>
          </div>
          
          <h1 className="text-[12vw] sm:text-[10vw] leading-[0.85] font-black tracking-tighter text-primary uppercase mb-12 mix-blend-lighten break-words">
            The World<br/>Runs on<br/>YAML
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 border-t-[3px] border-border pt-12">
            <div className="md:col-span-4 flex flex-col justify-between">
              <div>
                <div className="font-mono text-xs font-bold uppercase tracking-widest text-destructive mb-4 border border-destructive inline-block px-2 py-1">Featured Post</div>
                <h2 className="text-3xl font-bold leading-tight mb-4 group-hover:text-primary transition-colors">
                  <Link href={`/articles/${featuredArticle.slug}`}>
                    {featuredArticle.title}
                  </Link>
                </h2>
                <p className="text-lg font-serif text-muted-foreground italic mb-6">
                  {featuredArticle.subtitle}
                </p>
              </div>
              <div className="flex flex-col gap-1 font-mono text-xs uppercase">
                <span className="text-foreground">By {featuredArticle.author.name}</span>
                <span className="text-muted-foreground">{format(new Date(featuredArticle.publishedAt), "MMM dd, yyyy")}</span>
              </div>
            </div>
            
            <div className="md:col-span-8 bg-border">
              {featuredArticle.coverImage ? (
                <Link href={`/articles/${featuredArticle.slug}`} className="block h-full min-h-[300px] w-full overflow-hidden relative group">
                  <img 
                    src={featuredArticle.coverImage} 
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 border-[3px] border-transparent group-hover:border-primary transition-colors duration-300 pointer-events-none"></div>
                </Link>
              ) : (
                <div className="w-full h-full min-h-[300px] bg-card border border-border flex items-center justify-center font-mono text-muted-foreground">
                  [IMAGE_UNAVAILABLE]
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Categories Strip */}
      <section className="border-b-[3px] border-border bg-primary text-background overflow-hidden py-4 whitespace-nowrap flex">
        <div className="animate-[marquee_20s_linear_infinite] flex gap-12 font-mono font-bold uppercase text-xl md:text-3xl tracking-widest items-center">
          <span>SRE</span> <span className="h-2 w-2 bg-background rounded-full"></span>
          <span>DEVOPS</span> <span className="h-2 w-2 bg-background rounded-full"></span>
          <span>PLATFORM</span> <span className="h-2 w-2 bg-background rounded-full"></span>
          <span>OBSERVABILITY</span> <span className="h-2 w-2 bg-background rounded-full"></span>
          <span>INCIDENTS</span> <span className="h-2 w-2 bg-background rounded-full"></span>
          <span>CULTURE</span> <span className="h-2 w-2 bg-background rounded-full"></span>
          <span>SRE</span> <span className="h-2 w-2 bg-background rounded-full"></span>
          <span>DEVOPS</span> <span className="h-2 w-2 bg-background rounded-full"></span>
          <span>PLATFORM</span> <span className="h-2 w-2 bg-background rounded-full"></span>
          <span>OBSERVABILITY</span> <span className="h-2 w-2 bg-background rounded-full"></span>
          <span>INCIDENTS</span> <span className="h-2 w-2 bg-background rounded-full"></span>
          <span>CULTURE</span> <span className="h-2 w-2 bg-background rounded-full"></span>
        </div>
      </section>

      {/* Main Feed */}
      <section className="px-6 sm:px-10 lg:px-16 py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column - Recent */}
          <div className="lg:col-span-8">
            <h2 className="text-4xl font-black uppercase tracking-tighter border-b-[3px] border-border pb-4 mb-10 text-primary">Recent Transmissions</h2>
            
            <div className="space-y-16">
              {recentArticles.map((article, i) => (
                <motion.article 
                  key={article.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group"
                >
                  <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                    {article.coverImage && (
                      <Link href={`/articles/${article.slug}`} className="md:w-1/3 shrink-0 block aspect-[4/3] md:aspect-[3/4] overflow-hidden bg-card border border-border">
                        <img 
                          src={article.coverImage} 
                          alt={article.title}
                          className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                        />
                      </Link>
                    )}
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4 font-mono text-xs uppercase font-bold tracking-widest">
                        <Link href={`/categories/${article.category.toLowerCase()}`} className="text-primary hover:underline">{article.category}</Link>
                        <span className="text-border">/</span>
                        <span className="text-muted-foreground">{format(new Date(article.publishedAt), "MMM dd, yyyy")}</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-3">
                        <Link href={`/articles/${article.slug}`} className="hover:text-primary transition-colors">
                          {article.title}
                        </Link>
                      </h3>
                      <p className="text-lg font-serif text-muted-foreground italic mb-5 line-clamp-2">
                        {article.subtitle}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="font-mono text-xs uppercase text-foreground">By {article.author.name}</span>
                        <div className="flex gap-2">
                          {article.tags.slice(0,2).map(tag => (
                            <span key={tag} className="text-[10px] font-mono border border-border px-1.5 py-0.5 text-muted-foreground uppercase">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
            
            <div className="mt-16 pt-10 border-t-[3px] border-border">
              <Link href="/articles" className="inline-flex items-center gap-2 font-mono font-bold uppercase text-primary hover:text-white transition-colors text-lg tracking-widest">
                View All Archives <span>→</span>
              </Link>
            </div>
          </div>
          
          {/* Right Column - Sidebar */}
          <div className="lg:col-span-4 space-y-16">
            {/* Newsletter Callout */}
            <div className="bg-card border-[3px] border-primary p-8">
              <h3 className="text-2xl font-black uppercase mb-4 tracking-tighter text-primary">The Weekly Pager</h3>
              <p className="font-serif text-muted-foreground italic mb-6">
                One email a week. No vendor pitches. Just hard lessons learned in production.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="w-full bg-background border-[2px] border-border px-4 py-3 font-mono text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                  required
                />
                <button type="submit" className="w-full bg-primary text-background font-black uppercase tracking-widest py-3 hover:bg-white transition-colors text-sm">
                  Acknowledge Alert
                </button>
              </form>
            </div>
            
            {/* Incidents Wow Section */}
            <div>
              <h3 className="text-xl font-black uppercase tracking-tighter border-b-[3px] border-destructive pb-2 mb-6 flex items-center gap-3">
                <span className="h-3 w-3 bg-destructive rounded-none animate-pulse"></span>
                Incident Reports
              </h3>
              <div className="space-y-6">
                {incidentArticles.map(article => (
                  <article key={article.slug} className="group">
                    <div className="font-mono text-xs text-destructive mb-1 uppercase">SEV-1 // {format(new Date(article.publishedAt), "MM.dd.yy")}</div>
                    <h4 className="text-lg font-bold leading-tight mb-2">
                      <Link href={`/articles/${article.slug}`} className="hover:text-destructive transition-colors">
                        {article.title}
                      </Link>
                    </h4>
                    <p className="text-sm font-serif text-muted-foreground italic line-clamp-2">{article.subtitle}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

// Add keyframes for marquee in index.css manually or here via tailwind config if possible
// We will add it directly using tailwind config in a moment.
