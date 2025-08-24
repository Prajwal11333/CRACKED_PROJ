export interface ShortenedUrl {
  id: string;
  originalUrl: string;
  shortUrl: string;
  customAlias?: string;
  clicks: number;
  createdAt: string;
  seoScore: number;
  clickbaitScore: number;
  lastClicked?: string;
}
