import type { MetadataRoute } from "next";

const BASE = "https://app.hannune.ai";

// 검색 로봇 안내 (2026-10-26). 로그인한 사람에게만 뜻이 있는 화면과 내부
// 호출 경로는 긁어 가지 않게 막고, 나머지는 열어 둔다.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard", "/auth/"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
