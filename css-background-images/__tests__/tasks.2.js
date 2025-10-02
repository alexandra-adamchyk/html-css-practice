const puppeteer = require("puppeteer");
const path = require('path');

let browser;
let page;

beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.goto('file://' + path.resolve('./task-2/index.html'));
}, 30000);

afterAll((done) => {
    try {
        this.puppeteer.close();
    } catch (e) { }
    done();
});

describe('Task 2: Section background', () => {
    it("Page should use images from the asset folder as background images", async () => {
        const allBackgroundProperties = await page.$$eval('*', el => Array.from(el).map(e => getComputedStyle(e).getPropertyValue('background-image')));
        expect(allBackgroundProperties.some(e => e.match(/task2-bg.jpeg|task2-bg1.jpeg|task2-bg2.jpeg/))).toBe(true);
    });

    it("Background image size should be set to `cover`", async () => {
        const backgroundSize = await page.$$eval('*', el => Array.from(el).map(e => getComputedStyle(e).getPropertyValue('background-size')));
        expect(backgroundSize.some(e => e.match(/cover/))).toBe(true);
    });

    it("Background images should not be repeated in the element", async () => {
        const backgroundRepeat = await page.$$eval('*', el => Array.from(el).map(e => getComputedStyle(e).getPropertyValue('background-repeat')));
        expect(backgroundRepeat.some(e => e === 'no-repeat')).toBe(true);
    });

    it("Background images should be positioned at the bottom", async () => {
        const backgroundPosition = await page.$$eval('*', el => Array.from(el).map(e => getComputedStyle(e).getPropertyValue('background-position')));
        expect(backgroundPosition.some(e => e !== '0% 0%')).toBeTruthy();
    });
});
