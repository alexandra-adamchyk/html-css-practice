const puppeteer = require("puppeteer");
const path = require('path');

let browser;
let page;

beforeAll(async () => {
    browser = await puppeteer.launch({headless: true});
    page = await browser.newPage();
    await page.goto('file://' + path.resolve('./index.html'));
}, 30000);

afterAll((done) => {
    try {
        this.puppeteer.close();
    } catch (e) { }
    done();
});

describe("ID's", () => {
    it("Each heading should have a unique ID", async () => {
        const ids = await page.evaluate(() => {
            const ids = [];
            const headings = document.querySelectorAll('h1,h2, h3, h4, h5, h6');
            headings.forEach(heading => {
                ids.push(heading.id);
            });
            return ids;
        });
        expect(new Set(ids).size).toBe(ids.length);
    });
});

describe("Table of contents", () => {
    it("Table of contents should be wrapped with an outer **ordered list** tag", async () => {
        // grabs the first OL on page and checks if it contains node children
        const children = await page.evaluate(() => {
            const children = [];
            const list = document.querySelector('ol');
            list.childNodes.forEach(child => {
                children.push(child.tagName);

            });
            return children;
        });
        expect(children).toBeTruthy();
    });
});

describe("Anchors", () => {
    it("Anchor links should scroll to the corresponding heading", async () => {
        const currentWindowPositionY = await page.evaluate(() => {
            return window.scrollY;
        });
        const subHeadingAnchor = await page.$x('//a[contains(text(), "Sub Heading 2.3")]');
        await subHeadingAnchor[0].click();
        const yPositionAfterClick = await page.evaluate(() => {
            return window.scrollY;
        });
        expect(yPositionAfterClick).toBeGreaterThan(currentWindowPositionY);
    });
    it("'Back to top' Link should scroll page to the top", async () => {
        const backToTop = await page.$x('//a[contains(text(), "Back to top")]');
        const currentWindowPositionY = await page.evaluate(() => {
            return window.scrollY;
        });
        await backToTop[2].click();
        const yPositionAfterClick = await page.evaluate(() => {
            return window.scrollY;
        });
        expect(yPositionAfterClick).not.toBe(currentWindowPositionY);
    });
});
