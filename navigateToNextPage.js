const puppeteer = require('puppeteer');
const imageDownloader = require('./utils/imageDownloader');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  const page = await browser.newPage();
  await page.goto('https://books.toscrape.com/');

  const selectors = {
    next: '.pager .next a',
  };

  while (await page.$(selectors.next)) {
    // scrape all contanets of page... then click next btn
    // do stuff here...

    await page.waitForSelector(selectors.next);
    await page.click(selectors.next);
  }

  await browser.close();
})();
