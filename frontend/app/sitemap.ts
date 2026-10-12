import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/about", "/contact", "/case-studies/clientforge", "/security"].map(path => ({url:`https://dibyasarothi.is-a.dev${path}`, changeFrequency:"monthly", priority:path ? .7 : 1}));
}
