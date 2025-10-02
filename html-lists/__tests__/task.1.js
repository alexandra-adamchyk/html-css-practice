const puppeteer = require("puppeteer");
const path = require('path');

const browserOptions = {
    headless: true,
    ignoreHTTPSErrors: true,
    defaultViewport: null,
    devtools: false,
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
    } catch (e) 
    {} 
    done();
});

describe('Part 1 - Ordered Lists', () => {
    it(`H2 'Driving Instructions' should be present`, async () => {
        const h2s = await page.$$eval('h2', els => els.map(el => el.innerText));
        expect(h2s).toEqual(expect.arrayContaining([expect.stringMatching(/driving instructions/i)]));
    })
    it('Ordered list with 5 driving instructions is present', async () => {
        const olLIs = await page.$$eval('ol', els => els.map(el => el.querySelectorAll('li').length));
        expect(olLIs).toEqual(expect.arrayContaining([5]));
    })
});

describe('Part 2 - Unordered Lists', () => {
    it('Unordered list with at least 5 shopping items is present', async () => {
        const ulLIs = await page.$$eval('ul', els => els.map(el => el.querySelectorAll('li').length));
        expect(ulLIs).toEqual(expect.arrayContaining([5]))
    })
    it("List items of unordered list should have `list-style-type` set to `circle`", async () => {
        const listStyleTypes = await page.$$eval('ul > li', els => els.map(el => getComputedStyle(el).listStyleType));
        expect(listStyleTypes).toEqual(expect.arrayContaining(['circle']))
    })
    it("Links should open in a new tab", async () => {
        const links = await page.$$eval('a', anchors => anchors.map(anchor => anchor.getAttribute('target')));
        expect(links).toContain('_blank');
    });
})

describe('Part 3 - Easy Carrot Cake', () => {
    it('H1 tag with content "Easy Carrot Cake" should be present', async () => {
        // <h1>Easy Carrot Cake</h1>
        const h1 = await page.$$eval('h1', els => els.map(el => el.innerText));
        expect(h1).toEqual(expect.arrayContaining([expect.stringMatching(/easy carrot cake/i)]));
    })
    it("First H2 in Part 3 Should have content 'Ingredients'", async () => {
            // <h2>Ingredients</h2>
            const h2s = await page.$$eval('h2', els => els.map(el => el.innerText));
            expect(h2s).toEqual(expect.arrayContaining([expect.stringMatching(/ingredients/i)]));
    })
    it("Second H2 in Part 3 Should have content 'Steps'", async () => {
        // <h2>Steps</h2>
        const h2s = await page.$$eval('h2', els => els.map(el => el.innerText));
        expect(h2s).toEqual(expect.arrayContaining([expect.stringMatching(/steps/i)]));
})
    it("Ordered list with 16 recipe instruction items should be present", async () => {
        const ols = await page.$$eval('ol', els => els.map(el => el.querySelectorAll('li').length));
        expect(ols).toContain(16)
    })
})

