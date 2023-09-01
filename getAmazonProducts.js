const puppeteer = require('puppeteer');
const xlsx = require('xlsx');

// change laptop to any product you want to search for.
const getAmazonProducts = async (searchText = 'laptop') => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const selectors = {
    searchBox: '#twotabsearchtextbox',
    nextButton: '[class="a-last"]',
    productLinks: '//span[@class="a-size-medium a-color-base a-text-normal"]',
  };

  // open page
  const page = await browser.newPage();
  await page.goto('https://www.amazon.com/');

  // search for products
  await page.waitForSelector(selectors.searchBox);
  await page.type(selectors.searchBox, searchText);
  await page.keyboard.press('Enter');
  await page.waitForSelector('.s-pagination-next');

  // titles
  const title = await page.$$eval('h2 span.a-color-base', (nodes) =>
    nodes.map((n) => n.innerText),
  );

  // prices
  const price = await page.$$eval(
    "[data-component-type='s-search-result'] span.a-price[data-a-color='base'] span.a-offscreen",
    (nodes) => nodes.map((n) => n.innerText),
  );

  // Consolidate product search data
  const productsData = title.map((value, index) => {
    return {
      title: title[index],
      price: price[index],
    };
  });

  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.json_to_sheet(productsData);
  xlsx.utils.book_append_sheet(wb, ws);
  xlsx.writeFile(wb, './data/products.xlsx');

  console.log('Generate products.xlsx complete');

  await browser.close();
};

getAmazonProducts();
