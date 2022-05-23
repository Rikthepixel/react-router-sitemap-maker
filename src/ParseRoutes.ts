import React, { ReactElement } from 'react';
import { Routes, Route, RouteProps } from "react-router-dom";

const ParseRoutes = (routes: ReactElement): Array<string> => {
    if (!React.isValidElement(routes) || routes.type !== Routes) return [];

    console.log(routes);

    const componentsToParse = [routes];
    while (componentsToParse.length > 0) {
        const component = componentsToParse.pop();

        if (!React.isValidElement(component) || component.type !== Route) continue;
        const { path, element, children, index }: RouteProps = component.props;
    }

    return [];
};

export default ParseRoutes;