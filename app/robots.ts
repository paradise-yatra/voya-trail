import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://voyatrail.com'

    return {
        rules: [
            // General crawlers
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/', '/api/', '/admin'],
            },
            // AI Crawlers - explicitly allowed
            {
                userAgent: 'GPTBot',
                allow: '/',
                disallow: ['/admin/', '/api/'],
            },
            {
                userAgent: 'ChatGPT-User',
                allow: '/',
                disallow: ['/admin/', '/api/'],
            },
            {
                userAgent: 'Google-Extended',
                allow: '/',
                disallow: ['/admin/', '/api/'],
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: ['/admin/', '/api/'],
            },
            {
                userAgent: 'anthropic-ai',
                allow: '/',
                disallow: ['/admin/', '/api/'],
            },
            {
                userAgent: 'ClaudeBot',
                allow: '/',
                disallow: ['/admin/', '/api/'],
            },
            {
                userAgent: 'PerplexityBot',
                allow: '/',
                disallow: ['/admin/', '/api/'],
            },
            {
                userAgent: 'Bytespider',
                allow: '/',
                disallow: ['/admin/', '/api/'],
            },
            {
                userAgent: 'cohere-ai',
                allow: '/',
                disallow: ['/admin/', '/api/'],
            },
            {
                userAgent: 'meta-externalagent',
                allow: '/',
                disallow: ['/admin/', '/api/'],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
