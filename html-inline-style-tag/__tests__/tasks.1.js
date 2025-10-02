const fs = require("fs");

describe("Style Tag", () => {
  it("A style tag should be present in the head of the HTML", async () => {
    const markup = fs.readFileSync("./index.html", "utf8");
    const headTag = markup.match(/<head>([\s\S]*)<\/head>/)[1];
    const styleTag = headTag.match(/<style>([\s\S]*)<\/style>/)[1];
    expect(styleTag).toBeDefined();
  });
});

describe('Paragraph styling', () => {
  it("the color of the paragraphs should be set within the style element", async () => {
    const markup = fs.readFileSync("./index.html", "utf8");
    const styleTag = markup.match(/<style>([\s\S]*)<\/style>/)[1];
    expect(styleTag.replace(/ /g, "").includes("p{")).toBeTruthy();
    expect(styleTag.replace(/ /g, "").includes("color:")).toBeTruthy();
  });
});