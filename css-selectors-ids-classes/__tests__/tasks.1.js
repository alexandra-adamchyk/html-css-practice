const puppeteer = require("puppeteer");
const path = require('path');
const browserOptions = {
    headless: true,
    ignoreHTTPSErrors: true,
}

let browser;
let page;

beforeAll(async () => {
    browser = await puppeteer.launch(browserOptions);
    page = await browser.newPage();
    await page.goto('file://' + path.resolve('./index.html'));
}, 30000);

afterAll((done) => {
    try {
        this.puppeteer.close();
    } catch (e) { }
    done();
});

describe("IDs and Classes", () => {
    it("Html Id's and classes should be present", async () => {
        const idList = await page.evaluate(() => {
            const idList = [];
            const idElements = document.querySelectorAll('[id]');
            for (let i = 0; i < idElements.length; i++) {
                idList.push(idElements[i].id);
            }
            return idList;
        });
        const classList = await page.evaluate(() => {
            const classList = [];
            const classElements = document.querySelectorAll('[class]');
            for (let i = 0; i < classElements.length; i++) {
                classList.push(classElements[i].className);
            }
            return classList;
        });
        expect(idList).toBeTruthy();
        expect(classList).toBeTruthy();
    });
});

describe('Styling', () => {
    it("Content on the page should be of the color blue", async () => {
        const idColor = await page.$$eval('[id]', el => Array.from(el).map(e => getComputedStyle(e).getPropertyValue('color')));
        const classColor = await page.$$eval('[class]', el => Array.from(el).map(e => getComputedStyle(e).getPropertyValue('color')));
        expect(classColor).toContain('rgb(0, 0, 255)');
        expect(idColor).toContain('rgb(0, 0, 255)');
    });
})