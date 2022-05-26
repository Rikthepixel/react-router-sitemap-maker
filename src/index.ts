import type { ReactElement } from "react";
import GetEndpoints from './GetEndpoints';
import SitemapData, { Options } from './SitemapData';

/**
 * Parses the routes of the input element and generates SitemapData
 * @param {ReactElement} routes A React element containing one or multiple elements 
 * @param {Options} options The options with which the SitemapData will generate the output sitemap
 * @returns {SitemapData} An object containing all of the nessesairy data to generate the a functional sitemap 
*/
const GenerateSitemap = (routes: ReactElement, options: Options): SitemapData => {
    return new SitemapData(
        GetEndpoints(routes),
        options
    );
};

export {
    GetEndpoints,
    GenerateSitemap,
    SitemapData
};

export default GenerateSitemap;