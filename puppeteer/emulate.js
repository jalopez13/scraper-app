const puppeteer = require('puppeteer');
const devices = puppeteer.KnownDevices;
const iPhone13Max = devices['iPhone 13 Pro Max'];

(async () => {
  // browser default chromium
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  const page = await browser.newPage();
  await page.emulate(iPhone13Max);
  await page.goto('https://pptr.dev');

  // const userAgent = await page.evaluate(() => navigator.userAgent);
  // console.log(userAgent);

  const { width, height, scaleFactor } = await page.evaluate(() => ({
    width: document.body.clientWidth,
    height: document.body.clientHeight,
    scaleFactor: window.devicePixelRatio,
  }));

  console.log(width, height, scaleFactor);

  // await browser.close();
})();
