import { MetadataRoute } from 'next';
import { artifacts, type Artifact } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const artifactRoutes = artifacts.map((artifact: Artifact) => ({
    url: `${siteUrl}${artifact.link}`,
    lastModified: artifact.date || new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const staticRoutes = ['', '/lab', '/notes', '/about'].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.5,
  }));

  return [...staticRoutes, ...artifactRoutes];
}
