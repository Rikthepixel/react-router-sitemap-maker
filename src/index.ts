import type { ReactElement } from "react";
import ParseRoutes from './ParseRoutes';
import SitemapData, { Options } from './SitemapData';

const GenerateSitemap = (routes: ReactElement, options: Options): SitemapData => {

    options.lastModification = options.lastModification ?? new Date().toISOString().slice(0, 10);
    options.changeFrequency = options.changeFrequency ?? "monthly";
    options.outputType = options.outputType ?? "xml";
    options.priority = options.priority ?? 0.5;
    options.priority = Math.max(Math.min(options.priority, 1), 0);

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