const puppeteer = require('puppeteer');
const $ = require('cheerio');
const url = 'https://www.dextools.io/app/bsc/pair-explorer/0x0504b6788e880255153f9ee5251d8849b293f38b';
const chrome = require('chrome-cookies-secure');


// find profiles at ~/Library/Application Support/Google/Chrome
(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
        userDataDir: 'C:/Users/presi/AppData/Local/Google/Chrome/User Data/Default/'
    });
    return browser.newPage().then(function(page) {
      // page.setCookie(cookies);
      return page.goto(url).then(function() {
      page.waitFor(1000);
      return page.content();
    }).then(function(html) {
      console.log(html)
      browser.close();
    }).catch(function(err) {
      //handle error
      console.log(err);
  });
 });
})();