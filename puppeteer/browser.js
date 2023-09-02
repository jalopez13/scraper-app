const puppeteer = require('puppeteer');

(async () => {
  // browser default chromium
  const browser = await puppeteer.launch({
    headless: false,
    devtools: true,
    defaultViewport: null,
  });

  // browser ws - external browser
  // const browser = await puppeteer.connect({
  //   browserWSEndpoint: 'WS URL GOES HERE',
  // });

  // browser
  const page = await browser.newPage();
  await page.goto('https://books.toscrape.com/');
})();
