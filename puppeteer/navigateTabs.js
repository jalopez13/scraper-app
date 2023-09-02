const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  // tab 1
  const page = await browser.newPage();
  await page.goto('https://books.toscrape.com/');

  // tab 2
  const page2 = await browser.newPage();
  await page2.goto(
    'https://books.toscrape.com/catalogue/tipping-the-velvet_999/index.html',
  );

  const tabs = await browser.pages();
  tabs[0].bringToFront();
  tabs[0].goto('https://pptr.dev/');
})();
