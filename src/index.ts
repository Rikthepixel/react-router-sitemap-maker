type ChangeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

interface Options {
    lastModification?: Date;
    changeFrequency?: ChangeFrequency;
    priority?: number;
    hashrouting?: boolean;
    includePaths: Array<string>;
    excludeExtentions: Array<string>;
}

class SitemapData {
    private Routes: Array<URL>;
    private Options: Options;

    constructor(routes: Array<URL>, options: Options) {
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

const GenerateSitemap = (options: Options): SitemapData => {
    return new SitemapData([], options);
};

export default GenerateSitemap;