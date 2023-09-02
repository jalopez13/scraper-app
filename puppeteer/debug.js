const puppeteer = require('puppeteer');

(async () => {
  // browser default chromium
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,

    // debug
    slowMo: 200, // slow down browser operations by 200 milliseconds
    devtools: false, // open devTools when browser launches
  });

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const selectors = {
    searchBtn: '.DocSearch-Button',
    input: '.DocSearch-Input',
  };

  // browser
  const page = await browser.newPage();
  await page.goto('https://pptr.dev');
  await page.waitForSelector(selectors.searchBtn);
  await page.click(selectors.searchBtn);
  await page.waitForSelector(selectors.input);
  await page.focus(selectors.input);
  // sleep for ms
  // sleep(2000);

  // explicitly return target
  // await browser.waitForTarget(() => false);

  await page.keyboard.type('Page');
  await page.keyboard.press('Enter');

  // browser.close();
})();
