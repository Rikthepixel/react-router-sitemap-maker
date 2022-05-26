import { PathLike } from 'fs';
import { open as openFile } from 'fs/promises';

export interface Options {
    baseUrl: string;
    hashrouting?: boolean;

    //TODO: Make feature to parse static files in build/dist folder
    // include?: Array<PathLike>;
    // excludeExtentions?: Array<string>;

    outputType?: "xml" | "txt" | "json";

    //Data options
    lastModification?: Date;
    changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
    priority?: number;
}

const serializers = {
    "json": async (routes: Array<string>, opt: Options): Promise<string> => {
        return JSON.stringify(routes);
    },
    "xml": async (routes: Array<string>, opt: Options): Promise<string> => {
        let content = "";
        routes.forEach(
            (route) => content += `<url><loc>${route}</loc><lastmod>${opt.lastModification.toISOString().slice(0, 10)}</lastmod><changefreq>${opt.changeFrequency}</changefreq><priority>${opt.priority}</priority></url>`
        );
        return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${content}</urlset>`;
    },
    "txt": async (routes: Array<string>, opt: Options): Promise<string> => {
        return routes.reduce((prev, curr, index): string => {
            return `${prev}\r\n${curr}`;
        });
    }
};

class SitemapData {
    /** 
     * The endpoints that need to be in the sitemap
     * @private 
     */
    private Endpoints: Array<string>;
    /**
     * The routes that will end up being in the sitemap
     * @private
     */
    private Routes: Array<string>;
    /**
     * The options used to generate the sitemap
     * @private
     */
    private Options: Options;

    constructor(endpoints: Array<string>, options: Options) {

        options.lastModification = options.lastModification ?? new Date(Date.now());
        options.changeFrequency = options.changeFrequency ?? "monthly";
        options.outputType = options.outputType ?? "xml";
        options.priority = options.priority ?? 0.5;
        options.priority = Math.max(Math.min(options.priority, 1), 0);

        this.Endpoints = endpoints;
        this.Routes = endpoints.map((endpoint) => `${options.baseUrl}${options.hashrouting ? "/#" : ""}${endpoint}`);
        this.Options = options;

        if (options.hashrouting) this.Routes.unshift(`${options.baseUrl}/`);
    }

    /** @returns {Array<string>} The routes that will end up being in the sitemap */
    getRoutes = (): Array<string> => this.Routes;
    /** @returns {Array<string>} The endpoints that need to be in the sitemap (used to generate the routes) */
    getEndpoints = (): Array<string> => this.Endpoints;

    /** 
     * Gets the routes and serializes them into JSON
     * 
     * Note: This isn't an actual valid sitemap format
     * @returns {Promise<string>} A JSON string array containg all of the routes
     */
    toJSONString = async (): Promise<string> => serializers.json(this.Routes, this.Options);
    /** 
     * Gets the routes and serializes them into an XML sitemap
     * 
     * Note: This IS a valid sitemap format
     * @returns {Promise<string>} An XML string containg all of the routes
     */
    toXMLString = async (): Promise<string> => serializers.xml(this.Routes, this.Options);
    /** 
     * Gets the routes and serializes them into a plain text sitemap
     * 
     * Note: This IS a valid sitemap format
     * @returns {Promise<string>} A plain text string containg all of the routes
     */
    toTextString = async (): Promise<string> => serializers.txt(this.Routes, this.Options);

    /**
     * Writes the sitemap to the specified location.
     * Output is determined by the options defined when creating the SitemapData object.
     * 
     * The default outputType is XML (most popular Sitemap format)
     * @param location The location the file should be writen to (example: "/public/sitemap.xml")
     * @returns {Promise<void>} A promise that will finish once the file is done writing
     */
    toFile = async (location: PathLike): Promise<void> => {
        const serializer = serializers[this.Options.outputType];
        const sitemapContents = await serializer(this.Routes, this.Options);

        const file = await openFile(location, "w");
        await file.writeFile(sitemapContents);
        await file.close();
    };
}

export default SitemapData;;