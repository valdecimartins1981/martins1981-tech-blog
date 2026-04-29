import { Layout } from "@/components/Layout";
import { ARTICLES, Article } from "@/data/articles";
import { useParams, Link } from "wouter";
import { format } from "date-fns";
import NotFound from "./not-found";
import { useEffect } from "react";

export default function ArticleDetail() {
  const { slug } = useParams();
  const article = ARTICLES.find(a => a.slug === slug);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return <NotFound />;
  }

  const relatedArticles = ARTICLES.filter(
    a => a.slug !== article.slug && (a.category === article.category || a.tags.some(t => article.tags.includes(t)))
  ).slice(0, 3);

  return (
    <Layout>
      <article className="min-h-screen pb-20">
        {/* Article Header */}
        <header className="px-6 sm:px-10 lg:px-16 pt-16 pb-12 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8 font-mono text-sm uppercase font-bold tracking-widest">
            <Link href={`/categories/${article.category.toLowerCase()}`} className={article.category === 'Incidents' ? 'text-destructive hover:underline' : 'text-primary hover:underline'}>
              {article.category}
            </Link>
            <span className="text-border">/</span>
            <span className="text-muted-foreground">{format(new Date(article.publishedAt), "MMMM dd, yyyy")}</span>
            <span className="text-border">/</span>
            <span className="text-muted-foreground">{article.readTime}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.95] text-foreground mb-8">
            {article.title}
          </h1>

          <p className="text-2xl md:text-3xl font-serif text-muted-foreground italic leading-tight mb-12 border-l-[4px] border-primary pl-6">
            {article.subtitle}
          </p>

          <div className="flex items-center gap-4 py-6 border-y-[3px] border-border">
            <div className="w-12 h-12 bg-primary rounded-none flex items-center justify-center font-bold text-background text-xl">
              {article.author.name.charAt(0)}
            </div>
            <div>
              <div className="font-bold text-lg">{article.author.name}</div>
              <div className="font-mono text-xs uppercase text-muted-foreground tracking-widest">{article.author.role}</div>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {article.coverImage && (
          <div className="w-full aspect-[21/9] max-h-[600px] border-y-[3px] border-border bg-card mb-16 overflow-hidden">
            <img 
              src={article.coverImage} 
              alt={article.title}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        )}

        {/* Article Body */}
        <div className="px-6 sm:px-10 max-w-[720px] mx-auto prose prose-invert prose-lg prose-p:font-serif prose-p:leading-relaxed prose-p:text-[21px] prose-p:text-gray-300 prose-headings:font-sans prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
          {article.body.map((block, i) => {
            switch (block.type) {
              case 'paragraph':
                return <p key={i} className="mb-8">{block.text}</p>;
              case 'heading':
                return <h2 key={i} className="text-3xl md:text-4xl mt-16 mb-8 text-foreground">{block.text}</h2>;
              case 'pullquote':
                return (
                  <blockquote key={i} className="my-16 border-l-[6px] border-primary pl-8 py-2">
                    <p className="text-3xl font-serif italic text-primary !leading-snug m-0">"{block.text}"</p>
                  </blockquote>
                );
              case 'code':
                return (
                  <div key={i} className="my-10 relative group">
                    <div className="absolute top-0 right-0 bg-border px-3 py-1 font-mono text-[10px] uppercase text-muted-foreground">
                      {block.language}
                    </div>
                    <pre className="!bg-card !border-[2px] !border-border p-6 overflow-x-auto !mt-0">
                      <code className="font-mono text-sm !text-foreground leading-loose">
                        {block.code}
                      </code>
                    </pre>
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>

        {/* Article Footer & Author Bio */}
        <div className="px-6 sm:px-10 max-w-[720px] mx-auto mt-20 pt-10 border-t-[3px] border-border">
          <div className="flex flex-wrap gap-3 mb-12">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground py-1">Tags:</span>
            {article.tags.map(tag => (
              <Link key={tag} href={`/categories/${tag.toLowerCase()}`} className="text-xs font-mono border-[2px] border-border hover:border-primary hover:text-primary px-3 py-1 text-foreground uppercase transition-colors">
                {tag}
              </Link>
            ))}
          </div>

          <div className="bg-card border-[2px] border-border p-8 flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-16 h-16 bg-muted shrink-0 flex items-center justify-center font-black text-2xl text-muted-foreground border border-border">
              {article.author.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-xl mb-2">{article.author.name}</h3>
              <p className="font-mono text-xs uppercase text-primary mb-4 tracking-widest">{article.author.role}</p>
              <p className="font-serif text-muted-foreground">{article.author.bio}</p>
            </div>
          </div>
        </div>

        {/* Related Reading */}
        {relatedArticles.length > 0 && (
          <div className="px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto mt-32">
            <h3 className="text-3xl font-black uppercase tracking-tighter border-b-[3px] border-border pb-4 mb-10 text-foreground">
              Related Postmortems
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {relatedArticles.map(related => (
                <article key={related.slug} className="group flex flex-col">
                  <div className="font-mono text-xs uppercase font-bold tracking-widest text-primary mb-3">
                    {related.category}
                  </div>
                  <h4 className="text-xl font-bold leading-tight mb-3 group-hover:text-primary transition-colors">
                    <Link href={`/articles/${related.slug}`}>
                      {related.title}
                    </Link>
                  </h4>
                  <p className="text-sm font-serif text-muted-foreground italic line-clamp-3">
                    {related.subtitle}
                  </p>
                </article>
              ))}
            </div>
          </div>
        )}
      </article>
    </Layout>
  );
}
