import axios from "axios";
import * as cheerio from "cheerio";
import * as fs from "fs";
import * as path from "path";
import { URL } from "url";

const BASE_URL = "https://gitmgurgaon.com";
const TARGET_PAGES = [
  "",
  "/about-us/",
  "/campus-life/",
  "/placements/",
  "/gallery/",
  "/infrastructure/",
  "/contact-us/",
];

const OUTPUT_DIR = path.resolve(process.cwd(), "public/images/official");

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
};

interface ScrapedMedia {
  type: "image" | "video";
  url: string;
  localPath: string;
  category: "banner" | "campus" | "placement" | "recruiter" | "logo" | "general" | "video";
  alt?: string;
  page: string;
}

function resolveUrl(relative: string, base: string): string {
  try {
    return new URL(relative, base).toString();
  } catch {
    return relative;
  }
}

function categorizeUrl(urlStr: string, altText: string = ""): "banner" | "campus" | "placement" | "recruiter" | "logo" | "general" | "video" {
  const lower = (urlStr + " " + altText).toLowerCase();
  if (lower.includes("logo") || lower.includes("emblem") || lower.includes("crest")) return "logo";
  if (lower.includes("banner") || lower.includes("slider") || lower.includes("slide") || lower.includes("hero")) return "banner";
  if (lower.includes("placement") || lower.includes("placed") || lower.includes("student") || lower.includes("alumni") || lower.includes("package")) return "placement";
  if (lower.includes("recruiter") || lower.includes("company") || lower.includes("partner") || lower.includes("tieup") || lower.includes("client")) return "recruiter";
  if (lower.includes("campus") || lower.includes("lab") || lower.includes("hostel") || lower.includes("library") || lower.includes("sports") || lower.includes("building") || lower.includes("ground") || lower.includes("infrastructure") || lower.includes("auditorium")) return "campus";
  if (lower.endsWith(".mp4") || lower.endsWith(".webm") || lower.includes("youtube") || lower.includes("vimeo") || lower.includes("video")) return "video";
  return "general";
}

async function scrapePage(pagePath: string) {
  const pageUrl = `${BASE_URL}${pagePath}`;
  console.log(`\n🔍 Fetching: ${pageUrl}`);

  try {
    const response = await axios.get(pageUrl, { headers, timeout: 15000 });
    const $ = cheerio.load(response.data);
    const mediaFound: { url: string; alt: string; type: "image" | "video" }[] = [];

    // 1. Extract <img> tags
    $("img").each((_, el) => {
      const src =
        $(el).attr("src") ||
        $(el).attr("data-src") ||
        $(el).attr("data-lazy-src") ||
        $(el).attr("srcset");
      const alt = $(el).attr("alt") || "";
      if (src) {
        // Handle srcset by picking first url
        const cleanSrc = src.split(",")[0].trim().split(" ")[0];
        const fullUrl = resolveUrl(cleanSrc, pageUrl);
        if (fullUrl.startsWith("http") && !fullUrl.includes("data:image")) {
          mediaFound.push({ url: fullUrl, alt, type: "image" });
        }
      }
    });

    // 2. Extract background images from style attributes
    $("[style*='background']").each((_, el) => {
      const style = $(el).attr("style") || "";
      const match = style.match(/url\(['"]?([^'")]+)['"]?\)/i);
      if (match && match[1]) {
        const fullUrl = resolveUrl(match[1], pageUrl);
        if (fullUrl.startsWith("http") && !fullUrl.includes("data:image")) {
          mediaFound.push({ url: fullUrl, alt: "Background Image", type: "image" });
        }
      }
    });

    // 3. Extract <video> and <source>
    $("video, video source").each((_, el) => {
      const src = $(el).attr("src");
      if (src) {
        const fullUrl = resolveUrl(src, pageUrl);
        mediaFound.push({ url: fullUrl, alt: "Campus Video", type: "video" });
      }
    });

    // 4. Extract <iframe> (YouTube campus tours / promo videos)
    $("iframe").each((_, el) => {
      const src = $(el).attr("src");
      if (src && (src.includes("youtube") || src.includes("youtu.be") || src.includes("vimeo"))) {
        mediaFound.push({ url: src, alt: "Official YouTube Video Embed", type: "video" });
      }
    });

    return mediaFound;
  } catch (err: any) {
    console.warn(`⚠️ Warning: Could not scrape ${pageUrl}: ${err.message}`);
    return [];
  }
}

async function downloadFile(urlStr: string, destPath: string): Promise<boolean> {
  try {
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    const response = await axios({
      method: "GET",
      url: urlStr,
      responseType: "stream",
      headers,
      timeout: 15000,
      validateStatus: (status) => status === 200,
    });

    const writer = fs.createWriteStream(destPath);
    response.data.pipe(writer);

    return new Promise((resolve) => {
      writer.on("finish", () => resolve(true));
      writer.on("error", () => resolve(false));
    });
  } catch {
    return false;
  }
}

async function main() {
  console.log("=================================================");
  console.log("  GITM GURGAON OFFICIAL MEDIA SCRAPING ENGINE    ");
  console.log("=================================================");

  const allDiscovered = new Map<string, { url: string; alt: string; type: "image" | "video"; page: string }>();

  for (const pagePath of TARGET_PAGES) {
    const items = await scrapePage(pagePath);
    for (const item of items) {
      if (!allDiscovered.has(item.url)) {
        allDiscovered.set(item.url, { ...item, page: pagePath || "/" });
      }
    }
  }

  console.log(`\n📊 Total Unique Media Discovered: ${allDiscovered.size}`);

  const mediaList: ScrapedMedia[] = [];
  const videoLinks: { url: string; alt: string; page: string }[] = [];

  let downloadedCount = 0;
  let skippedCount = 0;

  for (const [url, item] of allDiscovered.entries()) {
    if (item.type === "video") {
      videoLinks.push({ url, alt: item.alt, page: item.page });
      console.log(`🎥 Discovered Video: ${url}`);
      continue;
    }

    // Skip tiny icons, gravatars, tracker pixels, or SVGs with flags
    if (url.includes("doubleclick") || url.includes("google-analytics") || url.includes("facebook.com")) {
      continue;
    }

    const category = categorizeUrl(url, item.alt);
    // Sanitize filename
    const urlObj = new URL(url);
    const originalBasename = path.basename(urlObj.pathname);
    const ext = path.extname(originalBasename) || ".jpg";
    const cleanExt = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"].includes(ext.toLowerCase()) ? ext.toLowerCase() : ".jpg";
    const baseSlug = path.basename(originalBasename, ext).replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 40) || `img_${downloadedCount}`;
    const filename = `${category}_${downloadedCount + 1}_${baseSlug}${cleanExt}`;

    const categoryFolder = path.join(OUTPUT_DIR, category);
    const localFilePath = path.join(categoryFolder, filename);
    const publicUrl = `/images/official/${category}/${filename}`;

    console.log(`⬇️ Downloading [${category}]: ${url.slice(0, 60)}...`);
    const success = await downloadFile(url, localFilePath);

    if (success) {
      // Verify file size > 500 bytes (not empty or broken 404 image)
      const stats = fs.statSync(localFilePath);
      if (stats.size > 500) {
        downloadedCount++;
        mediaList.push({
          type: "image",
          url,
          localPath: publicUrl,
          category,
          alt: item.alt || `${category} image - GITM Gurgaon`,
          page: item.page,
        });
      } else {
        fs.unlinkSync(localFilePath);
        skippedCount++;
      }
    } else {
      skippedCount++;
    }
  }

  // Save the manifest
  const manifest = {
    totalImages: downloadedCount,
    totalVideos: videoLinks.length,
    scrapedAt: new Date().toISOString(),
    images: mediaList,
    videos: videoLinks,
  };

  const manifestPath = path.resolve(process.cwd(), "public/images/official/media-manifest.json");
  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf-8");

  console.log("\n=================================================");
  console.log(`✅ SCRAPING COMPLETE!`);
  console.log(`   Downloaded Images: ${downloadedCount}`);
  console.log(`   Skipped/Failed:    ${skippedCount}`);
  console.log(`   Video Embeds:      ${videoLinks.length}`);
  console.log(`   Manifest Saved:    ${manifestPath}`);
  console.log("=================================================");
}

main().catch(console.error);

