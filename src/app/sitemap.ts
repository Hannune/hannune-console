import type { MetadataRoute } from "next";
import { enabledServices } from "@/services/registry";

const BASE = "https://app.hannune.ai";

// 검색엔진에 알리는 쪽 목록 (2026-10-26). 로그인해야 뜻이 있는 화면
// (대시보드, 인증 경로)과 내부 호출 경로는 넣지 않는다.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const fixed = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/login", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/signup", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/refund", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const services = enabledServices().map((s) => ({
    path: `/${s.slug}`,
    priority: 0.9,
    changeFrequency: "weekly" as const,
  }));

  return [...fixed, ...services].map((e) => ({
    url: `${BASE}${e.path}`,
    lastModified: now,
    changeFrequency: e.changeFrequency,
    priority: e.priority,
  }));
}
