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
    private Endpoints: Array<string>;
    private Routes: Array<string>;
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

        if (options.hashrouting) this.Routes.push(`${options.baseUrl}/`);
    }

    getRoutes = (): Array<string> => this.Routes;
    getEndpoints = (): Array<string> => this.Endpoints;

    toJSONString = async (): Promise<string> => serializers.json(this.Routes, this.Options);
    toXMLString = async (): Promise<string> => serializers.xml(this.Routes, this.Options);
    toTextString = async (): Promise<string> => serializers.txt(this.Routes, this.Options);

    toFile = async (location: PathLike): Promise<boolean> => {
        const serializer = serializers[this.Options.outputType];
        const sitemapContents = await serializer(this.Routes, this.Options);

        try {
            const file = await openFile(location, "w");
            await file.writeFile(sitemapContents);
            await file.close();
            return true;
        } catch (error) {
            return false;
        }
    };
}

export default SitemapData;;