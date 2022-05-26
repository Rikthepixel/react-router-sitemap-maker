import { existsSync, readFileSync } from 'fs';
import { open as openFile, unlink } from 'fs/promises';
import { expect } from 'chai';
import { SitemapData } from '../src';
import { baseUrl, expectedEndpoints, expectedRoutes, expectedRoutesWithHash } from "./input/TestRoutes";

const testDir = "./test";
const expectedXML = readFileSync(`${testDir}/reference/sitemap.xml`).toString();
const expectedTXT = readFileSync(`${testDir}/reference/sitemap.txt`).toString();
const expectedJSON = readFileSync(`${testDir}/reference/sitemap.json`).toString();

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

    it("Creates a JSON string according to the reference", async () => {
        const data = new SitemapData(
            expectedEndpoints,
            { baseUrl: baseUrl }
        );

        const actual = await data.toJSONString();

        expect(actual).to.be.equal(expectedJSON);
    });

    it("Creates an xml string according to the reference", async () => {

        const data = new SitemapData(
            expectedEndpoints,
            { baseUrl: baseUrl, priority: 0.8, lastModification: new Date(1653603676486) }
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

        const saveLocation = `${testDir}/sitemapTest-CreatesFile.xml`;

        try {
            await data.toFile(saveLocation);
        } catch (error) {
            expect(error).to.be.null;
        }

        const createdFileExists = existsSync(saveLocation);
        expect(createdFileExists).to.be.true;

        await unlink(saveLocation);
    });

    it("Overwrites existing sitemap if it already exists", async () => {
        const saveLocation = `${testDir}/sitemapTest-OverwriteFile.xml`;
        {
            const file = await openFile(saveLocation, "w");
            await file.writeFile("sitemapContents");
            await file.close();
        }

        const endpoints = [1, 2].map(() => `/${Math.floor(Math.random() * 10000)}`);
        const expectedContents = `${baseUrl}${endpoints[0]}\r\n${baseUrl}${endpoints[1]}`;
        const data = new SitemapData(
            endpoints,
            { baseUrl: baseUrl, outputType: "txt" }
        );

        try {
            await data.toFile(saveLocation);
        } catch (error) {
            expect(error).to.be.null;
        }

        const file = await openFile(saveLocation, "r");
        const actual = (await file.readFile()).toString();

        expect(actual).to.be.equal(expectedContents);
        await file.close();
        await unlink(saveLocation);
    });
});;