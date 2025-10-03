const puppeteer = require("puppeteer");
const path = require("path");

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: true });
  page = await browser.newPage();
  await page.goto("file://" + path.resolve("./index.html"));
}, 30000);

afterAll((done) => {
  try {
    this.puppeteer.close();
  } catch (e) { }
  done();
});

describe("Unordered list", () => {
  it("Page should contain an **unordered list**", async () => {
    const unorderedList = await page.$("ul");
    expect(unorderedList).toBeTruthy();
  });
  it("Default list dots should not be displayed", async () => {
    const unorderedList = await page.$eval("ul", el => getComputedStyle(el).listStyleType);
    expect(unorderedList).toBe("none");
  });
});

describe('Links', () => {
  it("Anchor tags should have valid `href` attribute, and open in a new tab", async () => {
    const links = await page.$("a");
    for (let i = 0; i < links.length; i++) {
      const href = await page.evaluate(link => link.href, links[i]);
      expect(href).toMatch(/instagram|youtube|twitter|facebook|vimeo|soundcloud/);
      const target = await page.evaluate(link => link.target, links[i]);
      expect(target).toBe("_blank");
    }
  });
});

describe('Icons', () => {
  it("Page should contain `img` tags with social media icons", async () => {
    const icons = await page.$("img");
    for (let i = 0; i < icons.length; i++) {
      const src = await page.evaluate(icon => icon.src, icons[i]);
      expect(src.match(/\.png$/)).toBeTruthy();
    }
  });
});