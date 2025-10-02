const puppeteer = require("puppeteer");
const path = require('path');
const fs = require('fs');

let browser;
let page;

beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.goto('file://' + path.resolve('./task-1/index.html'));
}, 30000);

afterAll((done) => {
    try {
        this.puppeteer.close();
    } catch (e) { }
    done();
});

describe('Task 1: Header', () => {
    it('`Header` should have `background.jpg` as background', async () => {
        const headerBg = await page.$eval('header', el => getComputedStyle(el).backgroundImage);
        expect(headerBg).toMatch(/background.jpg/);
    });
    it("Background size should be set to `contain`", async () => {
        const headerBgSize = await page.$eval('header', el => getComputedStyle(el).backgroundSize);
        expect(headerBgSize).toMatch(/contain/);
    });
    it("Image should repeat itself across the Header element", async () => {
        const bgRepeat = await page.$eval('header', el => getComputedStyle(el).backgroundRepeat);
        expect(bgRepeat).toMatch(/repeat/);
    });
});