const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: null,
  });

  const page = await browser.newPage();
  await page.goto('https://books.toscrape.com/');

  const page2 = await browser.newPage();
  await page2.goto(
    'https://books.toscrape.com/catalogue/tipping-the-velvet_999/index.html',
  );
})();
