import { ARTICLES, type Article, type ContentBlock } from "@/data/articles";

export interface SearchHit {
  article: Article;
  score: number;
  matchedIn: string[];
  excerpt: string;
}

function blockText(block: ContentBlock): string {
  if (block.type === "code") return block.code;
  return block.text;
}

function buildExcerpt(article: Article, query: string): string {
  const q = query.toLowerCase();
  const allText = article.body.map(blockText).join(" ");
  const idx = allText.toLowerCase().indexOf(q);
  if (idx === -1) {
    return article.subtitle;
  }
  const start = Math.max(0, idx - 80);
  const end = Math.min(allText.length, idx + query.length + 120);
  const prefix = start > 0 ? "…" : "";
  const suffix = end < allText.length ? "…" : "";
  return prefix + allText.slice(start, end).trim() + suffix;
}

export function searchArticles(rawQuery: string): SearchHit[] {
  const query = rawQuery.trim();
  if (!query) return [];
  const q = query.toLowerCase();

  const hits: SearchHit[] = [];

  for (const article of ARTICLES) {
    let score = 0;
    const matchedIn: string[] = [];

    if (article.title.toLowerCase().includes(q)) {
      score += 10;
      matchedIn.push("title");
    }
    if (article.subtitle.toLowerCase().includes(q)) {
      score += 5;
      matchedIn.push("subtitle");
    }
    if (article.category.toLowerCase().includes(q)) {
      score += 4;
      matchedIn.push("category");
    }
    if (article.author.name.toLowerCase().includes(q)) {
      score += 3;
      matchedIn.push("author");
    }
    if (article.tags.some((t) => t.toLowerCase().includes(q))) {
      score += 4;
      matchedIn.push("tags");
    }
    const bodyText = article.body.map(blockText).join(" ").toLowerCase();
    if (bodyText.includes(q)) {
      score += 2;
      matchedIn.push("body");
    }

    if (score > 0) {
      hits.push({
        article,
        score,
        matchedIn,
        excerpt: buildExcerpt(article, query),
      });
    }
  }

  return hits.sort((a, b) => b.score - a.score);
}
