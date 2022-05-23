import React, { ReactElement } from 'react';
import { Routes, createRoutesFromChildren, RoutesProps, RouteObject } from "react-router-dom";

const addBaseToPath = (routes: Array<RouteObject>, paths: Array<string>, base: string) => {
    routes.forEach((route) => {
        const path = `${base}${route.index ? "" : route.path}`;
        paths.push(path);

        const children = route?.children;
        if (children?.length > 0) {
            paths.pop();
            addBaseToPath(children, paths, path);
        }
    });
};

const ParseRoutes = (routes: ReactElement): Array<string> => {
    if (!React.isValidElement(routes) || routes.type !== Routes) return [];
    const { children }: RoutesProps = routes.props;
    const routePaths = createRoutesFromChildren(children);
    const paths: Array<string> = [];

    routePaths.forEach((route) => {
        const path = `${route.index ? "/" : route.path}`;
        paths.push(path);

        const children = route?.children;
        if (children?.length > 0) {
            paths.pop();
            addBaseToPath(children, paths, path);
        }
    });

    return paths;
};

export default ParseRoutes;