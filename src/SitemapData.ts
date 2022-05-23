export interface Options {
    baseUrl: string;
    hashrouting?: boolean;
    includePaths?: Array<string>;
    excludeExtentions?: Array<string>;
    outputType?: "xml" | "txt";

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
        this.Endpoints = endpoints;
        this.Routes = endpoints.map((endpoint) => `${options.baseUrl}${options.hashrouting ? "/#" : ""}${endpoint}`);
        this.Options = options;
    }

    getRoutes = (): Array<string> => this.Routes;
    getEndpoints = (): Array<string> => this.Endpoints;

    toJSONString = async (): Promise<string> => {
        return JSON.stringify(this.Routes);
    };

    toXMLString = async (): Promise<string> => {
        return "";
    };

    toTextString = async (): Promise<string> => {
        return "";
    };

    toFile = async (): Promise<boolean> => {
        return false;
    };
}

export default SitemapData;