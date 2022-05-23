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
    private Routes: Array<string>;
    private Options: Options;

    constructor(routes: Array<string>, options: Options) {
        this.Routes = routes;
        this.Options = options;
    }

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