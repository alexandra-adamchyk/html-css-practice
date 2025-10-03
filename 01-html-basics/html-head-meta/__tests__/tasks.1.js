const fs = require('fs');
const path = require('path');

describe('Solution file', () => {
    it('`index.html` exists', () => {
        expect(fs.existsSync('./index.html')).toBeTruthy();
    });
});

describe('Markup', () => {
    it('Document type should be declared', () => {
        const markup = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
        expect(markup).toMatch(/<!doctype html>/i);
    });
    it('`head` element should exist', () => {
        const markup = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
        expect(markup).toMatch(/<head>/i) && expect(markup).toMatch(/<\/head>/i);
    });
    it('`body` element should exist', () => {
        const markup = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
        expect(markup).toMatch(/<body>/i) && expect(markup).toMatch(/<\/body>/i);
    });
});

describe('Meta tags', () => {
    test('HTML markup should contain meta tags', async () => {
        const markup = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
        expect(markup.match(/<meta/g).length).toBeGreaterThan(1);
    });
    it('UTF-8 charset should be set', () => {
        const markup = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
        expect(markup.match(/<meta.*charset="(.*)".*>/i)[1]).toMatch(/utf-8/i);
    });
    it('Meta tag `author` should be present and have its `content` attribute defined', () => {
        const markup = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
        expect(markup).toMatch(/<meta name="author".*>/i);
        expect(markup.match(/<meta name="author".*content="(.*)".*>/i)[1]).not.toBe('');
    });
});

describe('Page title', () => {
    it('`title` tag should be present and contain the title of the page', () => {
        const markup = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
        expect(markup).toMatch(/<title>.*<\/title>/i);
        expect(markup.match(/<title>(.*)<\/title>/i)).not.toBe('');
    });
});