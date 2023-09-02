const puppeteer = require('puppeteer');

(async () => {
  // browser default chromium
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  // page

  // page mainFrame in browser
  // console.log(await page.mainFrame().content());

  // page mainFrame shortcut
  // console.log(await page.content());

  // navigating to url

  try {
    const page = await browser.newPage();
    await page.goto('https://pptr.dev', {
      // timeout: 3000,
      // waitUntil: 'networkidle2',
    });
  } catch (error) {
    console.log(error);
  }

  await browser.close();
})();
