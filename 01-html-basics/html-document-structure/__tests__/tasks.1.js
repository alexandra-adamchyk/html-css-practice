const fs = require('fs');
const path = require('path');

describe('HTML file', () => {
    test('The file `index.html` exists', () => {
        const indexPath = path.join(__dirname, '../index.html');
        expect(fs.existsSync(indexPath)).toBeTruthy();
    })
})
describe('Document type', () => {
    test('Document type has been declared', () => {
        const markup = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
        expect(markup).toMatch(/<!doctype html>/i);
    });
});

describe('Markup', () => {
    test('The root element exists', () => {
        const markup = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
        expect(markup).toMatch(/<html/i);
        expect(markup).toMatch(/<\/html>/i);
    });
    test('The `head` element exists inside the root element', () => {
        const markup = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
        expect(markup).toMatch(/<html[^>]*>[\s\S]*<head/i);
        expect(markup).toMatch(/<html[^>]*>[\s\S]*<\/head>/i);
    });
    test('The `body` element exists inside the root element', () => {
        const markup = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
        expect(markup).toMatch(/<html[^>]*>[\s\S]*<body/i);
        expect(markup).toMatch(/<html[^>]*>[\s\S]*<\/body>/i);
    });
});