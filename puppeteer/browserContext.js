const puppeteer = require('puppeteer');

(async () => {
  // browser default context
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  // browser context : incognito
  const context = await browser.createIncognitoBrowserContext();

  // browser
  const page = await browser.newPage();
  await page.goto('https://books.toscrape.com/');

  // browser: Incognito
  const pageContext = await context.newPage();
  await pageContext.goto('https://ww.yesmovies.ag/yes.html');
})();
