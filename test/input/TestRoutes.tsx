import React from 'react';
import { Routes, Route } from "react-router-dom";

const element = <div />;

const TestRoutes = () => {
    return (
        <Routes>
            <Route element={element} index />
            <Route path="*" element={element} />
            <Route element={element} path="/test-surface-path-element" />
            <Route path="/test-surface-path-children"></Route>

            <Route path="/test-nested-path">
                <Route element={element} index />
                <Route element={element} path="/nested-path-element" />
                <Route path="/nested-path-children"></Route>
            </Route>
        </Routes>
    );
};

export const baseUrl = "https://127.0.0.1";
export const expectedEndpoints = [
    "/",
    "/test-surface-path-element",
    "/test-surface-path-children",
    "/test-nested-path",
    "/test-nested-path/nested-path-element",
    "/test-nested-path/nested-path-children"
];
export const expectedRoutes = expectedEndpoints.map((endpoint) => `${baseUrl}${endpoint}`);
export const expectedRoutesWithHash = expectedEndpoints.map((endpoint) => `${baseUrl}/#${endpoint}`);
expectedRoutesWithHash.unshift(`${baseUrl}/`)
export const expectedRouteAmount = 6;
export default TestRoutes;