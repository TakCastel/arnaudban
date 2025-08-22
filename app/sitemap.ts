import { getProjects } from '@/lib/getProjects';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getProjects();
  
  const projectUrls = projects.map((project) => ({
    url: `https://arnaudban.com/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://arnaudban.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://arnaudban.com/mentions-legales',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...projectUrls,
  ];
}
