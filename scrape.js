const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let total = 0;

  for (let seed = 61; seed <= 70; seed++) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url);
    await page.waitForSelector("table");

    const numbers = await page.$$eval("td", cells =>
      cells.map(c => Number(c.innerText)).filter(n => !isNaN(n))
    );

    const sum = numbers.reduce((a,b)=>a+b,0);
    total += sum;
  }

  console.log("TOTAL =", total);

  await browser.close();
})();
