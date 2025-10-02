const puppeteer = require("puppeteer");
const path = require('path');
const fs = require('fs');

let browser;
let page;

beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.goto('file://' + path.resolve('./index.html'));
}, 30000);

afterAll((done) => {
    try {
        this.puppeteer.close();
    } catch (e) { }
    done();
});

describe("HTML structure", () => {
    it("HTML file should contain appropriate meta tags", async () => {
        const metaTags = await page.$$('meta');
        expect(metaTags.length).toBeGreaterThan(1);
    });
    it("HTML file should contain a title tag that is not empty", async () => {
        const title = await page.$eval('title', el => el.innerHTML);
        expect(title).toBeTruthy()
    });
});

describe("CSS", () => {
    it("Class and ID selectors should be used where neccesary", async () => {
        const ids = await page.$$eval('[id]', el => el.length);
        expect(ids).toBeGreaterThan(0);
        const classes = await page.$$eval('[class]', el => el.length);
        expect(classes).toBeGreaterThan(0);
    });
    it("Page should use `:hover` `:visited` `:active` pseudo classes", async () => {
        const stylesheet = fs
            .readFileSync("./style.css")
            .toString("utf-8")
            .replace(/ /g, "");
        expect(stylesheet).toMatch(/:hover|:visited|:active/);
    });
});

describe("Links", () => {
    it("Links should open in a new tab", async () => {
        const target = await page.$$eval('a[target="_blank"]', el => el.length);
        expect(target).toBeTruthy();
    });
});

describe("Contact Page", () => {
    it("The 'Drop me a line' link Should redirect to `contact.html` page", async () => {
        const targetBlank = await page.$eval('a[href="contact.html"]', el => el.hasAttribute('target'));
        if (targetBlank === true) {
            const [newPage] = await Promise.all([
                new Promise(x => browser.once('targetcreated', target => x(target.page()))),
                page.click('a[href="contact.html"]'),
            ]);
            const url = await newPage.url();
            expect(url).toMatch(/contact.html/);
        } else {
            const [samePage] = await Promise.all([
                page.waitForNavigation(),
                page.click('a[href="contact.html"]'),
            ]);
            const url = await samePage.url();
            expect(url).toMatch(/contact.html/);
        }
    });
    it("Contact Page Should contain a 'go back' link to index.html", async () => {
        await page.goto('file://' + path.resolve('./contact.html'));
        const targetBlank = await page.$eval('a[href="index.html"]', el => el.hasAttribute('target'));
        if (targetBlank === true) {
            const [newPage] = await Promise.all([
                new Promise(x => browser.once('targetcreated', target => x(target.page()))),
                page.click('a[href="index.html"]'),
            ]);
            const url = await newPage.url();
            expect(url).toMatch(/index.html/);
        } else {
            const [samePage] = await Promise.all([
                page.waitForNavigation(),
                page.click('a[href="index.html"]'),
            ]);
            const url = await samePage.url();
            expect(url).toMatch(/index.html/);
        }
    });
    it("Contact page exists", async () => {
        await page.goto('file://' + path.resolve('./contact.html'));
        expect(page.url()).toBe('file://' + path.resolve('./contact.html'));
        const body = await page.$eval('body', el => el.innerHTML);
        expect(body).toBeTruthy();
    });
});