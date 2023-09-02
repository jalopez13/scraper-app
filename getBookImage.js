const puppeteer = require('puppeteer');
const imageDownloader = require('./utils/imageDownloader');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  const page = await browser.newPage();

  await page.goto(
    'https://books.toscrape.com/catalogue/the-requiem-red_995/index.html',
  );

  const selectors = {
    image: '.thumbnail .item.active img',
  };

  const imageUrl = await page.$eval(selectors.image, (img) => img.src);

  imageDownloader(imageUrl, 'images');

  await browser.close();
})();
