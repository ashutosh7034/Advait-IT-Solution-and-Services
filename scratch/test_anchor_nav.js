const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });
  
  console.log("Navigating to http://127.0.0.1:3000/services.html#web-dev");
  await page.goto("http://127.0.0.1:3000/services.html#web-dev", { waitUntil: "networkidle0" });
  await new Promise(r => setTimeout(r, 1000));
  
  const scrollY = await page.evaluate(() => window.scrollY);
  console.log("ScrollY after #web-dev:", scrollY);
  
  const cardRect = await page.evaluate(() => {
    const el = document.getElementById("web-dev");
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { top: r.top, y: r.y, height: r.height };
  });
  console.log("Card rect:", cardRect);
  
  await browser.close();
})();

