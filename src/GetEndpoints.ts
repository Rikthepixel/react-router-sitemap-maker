import React, { Fragment, ReactElement, ReactNode } from 'react';
import { RoutesProps, RouteObject } from "react-router-dom";

const createRoutesFromChildren = (children: ReactNode) => {
    let routes: Array<RouteObject> = [];
    React.Children.forEach(children, element => {

        if (!React.isValidElement(element) || (typeof element.type === "string" ? element.type : element.type.name) !== "Route")
            return;
        const props = element.props;
        if (element.type === Fragment)
            return routes.push.apply(routes, createRoutesFromChildren(props.children));
        if (props.path === "*")
            return;
        let route: RouteObject = {
            caseSensitive: props.caseSensitive,
            element: props.element,
            index: props.index,
            path: props.path,
        };

        if (props.children)
            route.children = createRoutesFromChildren(props.children);

        routes.push(route);
    });
    return routes;
};

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

/**
 * Parses the routes of the input element
 * @param routes A React element containing one or multiple Route elements 
 * @returns {Array<string>} An array of all of the endpoints contained in the input ReactElement
 */
const GetEndpoints = (routes: ReactElement): Array<string> => {
    if (!React.isValidElement(routes)) return [];
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

export default GetEndpoints;