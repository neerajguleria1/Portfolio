import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function SEO({
  title = 'CloudDevOps - Expert Cloud & DevOps Solutions',
  description = 'Transform your infrastructure with AWS, Terraform, and modern DevOps practices. Expert cloud architecture and automation services.',
  keywords = 'AWS, DevOps, Cloud, Terraform, Kubernetes, Docker, CI/CD',
  image = '/og-image.jpg',
  url = window.location.href,
  type = 'website',
}: SEOProps) {
  useEffect(() => {
    document.title = title;

    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },
      { property: 'og:type', content: type },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ];

    metaTags.forEach(({ name, property, content }) => {
      const attr = name ? 'name' : 'property';
      const value = name || property;
      let element = document.querySelector(`meta[${attr}="${value}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, value!);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    });
  }, [title, description, keywords, image, url, type]);

  return null;
}
