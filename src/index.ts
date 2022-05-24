import type { ReactElement } from "react";
import ParseRoutes from './ParseRoutes';
import SitemapData, { Options } from './SitemapData';

const GenerateSitemap = (routes: ReactElement, options: Options): SitemapData => {
    return new SitemapData(
        ParseRoutes(routes),
        options
    );
};

export {
    ParseRoutes,
    GenerateSitemap,
    SitemapData
};

export default GenerateSitemap;