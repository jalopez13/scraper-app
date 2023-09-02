const puppeteer = require('puppeteer');

(async () => {
  // browser default context
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });
  const page = await browser.newPage();

  // events
  page.once('domcontentloaded', () => console.log('Dom Content Loaded!'));
  page.once('load', () => console.log('Loaded Complete!'));
  page.on('request', (request) => console.log(request.url()));
  page.once('close', () => console.log('Page has closed'));

  // custom events
  await page.exposeFunction('onCustomEvent', (e) => console.log(e.type));
  await page.evaluateOnNewDocument(() => {
    document.addEventListener('my-custom-event', (e) => {
      window.onCustomEvent({ type: 'my-custom-event', detail: e.detail });
    });
  });

  await page.goto('https://pptr.dev/');

  // dispatch custom event on page
  await page.evaluate(() =>
    document.dispatchEvent(new Event('my-custom-event')),
  );

  await page.close(); // need to run to fire close event. Closing browser page doesn't emmit event
  await browser.close();
})();
