import fs from 'fs';
import { expect } from 'chai';
import { SitemapData } from '../src';
import { baseUrl, expectedEndpoints, expectedRouteAmount, expectedRoutes, expectedRoutesWithHash } from "./input/TestRoutes";

const expectedXML = fs.readFileSync("./test/reference/sitemap.xml").toString();
const expectedTXT = fs.readFileSync("./test/reference/sitemap.txt").toString();

describe('SitemapData', () => {

    it("GetEndpoints returns the correct endpoints", () => {
        const data = new SitemapData(
            expectedEndpoints,
            { baseUrl: baseUrl }
        );

        const actual = data.getEndpoints();

        expect(actual).to.be.a("array");
        expect(actual).to.have.all.members(expectedEndpoints);
    });

    it("GetRoutes returns the correct route when hashrouting is not enabled", () => {
        const data = new SitemapData(
            expectedEndpoints,
            { baseUrl: baseUrl }
        );

        const actual = data.getRoutes();

        expect(actual).to.be.a("array");
        expect(actual).to.have.all.members(expectedRoutes);
    });

    it("GetRoutes returns the correct route when hashrouting is enabled", () => {
        const data = new SitemapData(
            expectedEndpoints,
            {
                baseUrl: baseUrl,
                hashrouting: true
            }
        );

        const actual = data.getRoutes();

        expect(actual).to.be.a("array");
        expect(actual).to.have.all.members(expectedRoutesWithHash);
    });


    it("Creates an xml string according to the reference", async () => {
        const data = new SitemapData(
            expectedEndpoints,
            { baseUrl: baseUrl }
        );

        const actual = await data.toXMLString();

        expect(actual).to.be.equal(expectedXML);
    });

    it("Creates an text string according to the reference", async () => {
        const data = new SitemapData(
            expectedEndpoints,
            { baseUrl: baseUrl }
        );

        const actual = await data.toTextString();

        expect(actual).to.be.equal(expectedTXT);
    });

    it("Creates a file in the assigned directory", async () => {
        const data = new SitemapData(
            expectedEndpoints,
            { baseUrl: baseUrl }
        );

        const saveLocation = "./test/sitemap.xml";

        const actual = await data.toFile(saveLocation);

        expect(actual).to.be.true;

        const createdFileExists = fs.existsSync(saveLocation);
        expect(createdFileExists).to.be.true;

        fs.unlinkSync(saveLocation);
    });
});