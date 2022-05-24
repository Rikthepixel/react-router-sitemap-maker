import { PathLike } from 'fs';
import { open as openFile } from 'fs/promises';

const serializers = {
    "json": async (routes: Array<string>): Promise<string> => {
        return JSON.stringify(routes);
    },
    "xml": async (routes: Array<string>): Promise<string> => {
        return "";
        
    },
    "txt": async (routes: Array<string>): Promise<string> => {
        return routes.reduce((prev, curr, index): string => {
            return `${prev}\r\n${curr}`;
        });
    }
};

export interface Options {
    baseUrl: string;
    hashrouting?: boolean;
    includePaths?: Array<string>;
    excludeExtentions?: Array<string>;
    outputType?: "xml" | "txt" | "json";

    //Data options
    lastModification?: string;
    changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
    priority?: number;
}

class SitemapData {
    private Endpoints: Array<string>;
    private Routes: Array<string>;
    private Options: Options;

    constructor(endpoints: Array<string>, options: Options) {

        options.lastModification = options.lastModification ?? new Date().toISOString().slice(0, 10);
        options.changeFrequency = options.changeFrequency ?? "monthly";
        options.outputType = options.outputType ?? "xml";
        options.priority = options.priority ?? 0.5;
        options.priority = Math.max(Math.min(options.priority, 1), 0);

        this.Endpoints = endpoints;
        this.Routes = endpoints.map((endpoint) => `${options.baseUrl}${options.hashrouting ? "/#" : ""}${endpoint}`);
        this.Options = options;
    }

    getRoutes = (): Array<string> => this.Routes;
    getEndpoints = (): Array<string> => this.Endpoints;

    toJSONString = async (): Promise<string> => serializers.json(this.Routes);
    toXMLString = async (): Promise<string> => serializers.xml(this.Routes);
    toTextString = async (): Promise<string> => serializers.txt(this.Routes);

    toFile = async (location: PathLike): Promise<boolean> => {
        const serializer = serializers[this.Options.outputType];
        const sitemapContents = await serializer(this.Routes);

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

export default SitemapData;