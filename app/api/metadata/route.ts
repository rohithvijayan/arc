import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import pupppeteer from "puppeteer";

interface MetaData {
  title?: string;
  description?: string;
  url?: string;
  siteName?: string;
  image?: string;
  favicon?: string;
}
export async function POST(request: Request) {
  const browser = await pupppeteer.launch({ headless: true });
  try {
    const { url } = await request.json();
    console.log("url from api", url);
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle0" });
    await page.setViewport({ width: 1080, height: 1024 });

    const html = await page.content();
    const $ = cheerio.load(html);

    const title =
      $('meta[property="og:title"]').attr("content") ||
      $("title").text() ||
      $('meta[name="title"]').attr("content") ||
      "";
    const siteUrl = $('meta[property="og:url"]').attr("content") || "";
    const description =
      $('meta[property="og:description"]').attr("content") ||
      $('meta[name="description"]').attr("content") ||
      "";
    const favicon =
      $('link[rel="icon"]').attr("href") ||
      $('link[rel="shortcut icon"]').attr("href");
    const images: Array<string> = [];
    $('meta[property="og:image"]').each((_, el) => {
      const imgUrl = $(el).attr("content");
      if (imgUrl) images.push(imgUrl); 
      return;
    });
    console.log(images);
    const majorPoints: Array<string> = [];
    $("h1, h2").each((_, el) => {
      const point = $(el).text().trim();
      if (point) majorPoints.push(point);
    });
    return NextResponse.json({
      message: {
        title: title,
        url: siteUrl,
        favicon: favicon,
        description: description,
        heightLights: majorPoints,
        image: images,
      },
    });
  } catch (err) {
    console.error("Error fetching meta data:", err);
    return NextResponse.json({ error: "failed to fetch" });
  }finally{
    await browser.close();
  }
}
