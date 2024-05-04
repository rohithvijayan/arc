import * as cheerio from 'cheerio';

interface MetaData {
  title?: string;
  description?: string;
  url?: string;
  siteName?: string;
  image?: string;
  favicon?: string;
}

export const fetchMeta = async (url: string): Promise<MetaData> => {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const title = $('meta[property="og:title"]').attr('content') || $('title').text() || $('meta[name="title"]').attr('content');
    const description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content');
    const siteUrl = $('meta[property="og:url"]').attr('content');
    const siteName = $('meta[property="og:site_name"]').attr('content');
    const image = $('meta[property="og:image"]').attr('content') || $('meta[property="og:image:url"]').attr('content');
    const favicon = $('link[rel="icon"]').attr('href') || $('link[rel="shortcut icon"]').attr('href');
    console.log(title)
    return {
      title:title,
      description,
      url: siteUrl,
      siteName,
      image,
      favicon,
    };
  } catch (err) {
    console.error('Error fetching meta data:', err);
    return {};
  }
};