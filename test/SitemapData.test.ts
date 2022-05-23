import fs from 'fs';
import { expect } from 'chai';
import { SitemapData } from '../src';
import { expectedRoutes } from "./input/TestRoutes";

const expectedXML = fs.readFileSync("./test/reference/sitemap.xml").toString();
const expectedTXT = fs.readFileSync("./test/reference/sitemap.txt").toString();

describe('SitemapData', () => {

    it("Creates an xml string according to the reference", async () => {
        const data = new SitemapData(
            expectedRoutes,
            { baseUrl: "https://127.0.0.1" }
        );

        const actual = await data.toXMLString();

        expect(actual).to.be.equal(expectedXML);
    });

    it("Creates an text string according to the reference", async () => {
        const data = new SitemapData(
            expectedRoutes,
            { baseUrl: "https://127.0.0.1" }
        );

        const actual = await data.toTextString();

        expect(actual).to.be.equal(expectedTXT);
    });

    it("Creates a file in the assigned directory", async () => {
        const data = new SitemapData(
            expectedRoutes,
            { baseUrl: "https://127.0.0.1" }
        );

        const actual = await data.toFile();

        expect(actual).to.be.true;

        const createdFileExists = fs.existsSync("./test/sitemap.xml");
        expect(createdFileExists).to.be.true;
    });
});