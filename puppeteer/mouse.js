const puppeteer = require('puppeteer');

(async () => {
  // browser default chromium
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const sel = {
    logo: '.navbar__title',
  };

  // page
  const page = await browser.newPage();
  await page.goto('https://pptr.dev');

  // methods
  // await page.hover(sel.logo);
  await page.waitForSelector(sel.logo);
  await page.click(sel.logo);

  // mouse events
  // await page.click(selector here);
  // await page.focus(selector here)
  // await page.hover(selector here)

  // you can pass coordinates relative
  // from top left or 0, 0 and click count or number of clicks to perform

  // await page.mouse.click(40, 150, { clickCount: 2 });

  // await page.mouse.click()
  // await page.mouse.down();
  // await page.mouse.drag();
  // await page.mouse.dragAndDrop();
  // await page.mouse.dragEnter();
  // await page.mouse.dragOver();
  // await page.mouse.drop();
  // await page.mouse.move();
  // await page.mouse.reset();
  // await page.mouse.up();
  // await page.mouse.wheel({ deltaY: -200});

  // await browser.close();
})();
