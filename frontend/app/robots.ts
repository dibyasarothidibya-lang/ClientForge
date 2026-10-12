import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {rules:{userAgent:"*",allow:"/",disallow:["/workspace", "/login", "/signup", "/auth", "/onboarding"]},sitemap:"https://dibyasarothi.is-a.dev/sitemap.xml"};
}
