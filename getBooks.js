const puppeteer = require('puppeteer');
const xlsx = require('xlsx');

const getBooksData = async (url, page) => {
  await page.goto(url);

  const selectors = {
    bookTitle: '.product_main h1',
    bookPrice: '.price_color',
    bookInStock: '.instock.availability',
    bookDesc: '.product_page > p',
  };

  const title = await page.$eval(selectors.bookTitle, (n) => n.textContent);
  const price = await page.$eval(selectors.bookPrice, (n) => n.textContent);
  const instock = await page.$eval(selectors.bookInStock, (n) =>
    n.textContent?.trim(),
  );
  const description = await page.$eval(
    selectors.bookDesc,
    (n) => n.textContent,
  );

  return {
    title,
    price,
    instock,
    description,
  };
};

const getLinks = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  // open page
  const url = 'https://books.toscrape.com/';
  const page = await browser.newPage();
  await page.goto(url);

  const selectors = {
    links: '.product_pod h3 a',
    bookTitle: '.product_main h1',
    bookPrice: '.product_main .price_color',
    bookInStock: '.product_main .instock',
    bookDesc: '.row > p',
    nextBtn: '.pager > .next > a',
  };

  const links = await page.$$eval(selectors.links, (nodes) =>
    nodes.map((n) => `https://books.toscrape.com/${n.getAttribute('href')}`),
  );

  await browser.close();

  return links;
};

const wait = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const getBooks = async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: null,
  });

  const page = await browser.newPage();

  const allLinks = await getLinks();

  const booksData = [];

  for (let link of allLinks) {
    const data = await getBooksData(link, page);
    // const secondsToWait = (Math.floor(Math.random() * 5) + 1) * 1000;
    // await wait(secondsToWait);
    booksData.push(data);
  }

  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.json_to_sheet(booksData);
  xlsx.utils.book_append_sheet(wb, ws);
  xlsx.writeFile(wb, './data/books.xlsx');

  console.log('Generate books.xlsx complete');

  await browser.close();
};

getBooks();
