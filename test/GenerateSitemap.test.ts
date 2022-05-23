import { expect } from 'chai';
import { GenerateSitemap } from "../src/index";
import TestRouter from "./input/TestRoutes";

describe('GenerateSitemap', () => {

    it("Creates SitemapData", () => {
        const actual = GenerateSitemap(
            TestRouter(),
            { baseUrl: "https://127.0.0.1" }
        );

        expect(actual).to.not.be.null;
    });

});