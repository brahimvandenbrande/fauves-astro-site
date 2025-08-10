import { SITE_URL } from "@consts";

interface WebsiteStructuredData {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  description: string;
}

export function generateWebsiteStructuredData(): WebsiteStructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Fauves Astro",
    url: SITE_URL,
    description: "Your website description here"
  };
}

interface WebPageStructuredData {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  description: string;
  publisher: {
    "@type": string;
    name: string;
  };
}

export function generateWebPageStructuredData(
  title: string,
  description: string,
  url: string
): WebPageStructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    url,
    description,
    publisher: {
      "@type": "Organization",
      name: "Fauves Astro"
    }
  };
}
