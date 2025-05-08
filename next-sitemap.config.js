/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.qcsstudio.com',
    generateRobotsTxt: true, // (optional) Generates a robots.txt
    changefreq: 'weekly',
    priority: 0.5,
    sitemapSize: 5000,
    exclude: [],
    alternateRefs: [],
    transform: async (config, url) => {
        const pageSettings = {
            '/': { changefreq: 'yearly', priority: 1 },
            '/aboutus': { changefreq: 'monthly', priority: 0.8 },
            '/services': { changefreq: 'weekly', priority: 0.5 },
            '/courses': { changefreq: 'weekly', priority: 0.5 },
            '/blogs': { changefreq: 'weekly', priority: 0.5 },
            '/contactus': { changefreq: 'weekly', priority: 0.5 },
        }

        const settings = pageSettings[url.replace(config.siteUrl, '')] || {}
        return {
            loc: url,
            changefreq: settings.changefreq || config.changefreq,
            priority: settings.priority ?? config.priority,
            lastmod: new Date().toISOString(),
        }
    },
}
