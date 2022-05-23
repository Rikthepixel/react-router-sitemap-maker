import React from 'react';
import { Routes, Route } from "react-router-dom";

const element = <div />;

const TestRoutes = () => {
    return (
        <Routes>
            <Route element={element} index />
            <Route element={element} path="/test-surface-path-element" />
            <Route path="/test-surface-path-children">{element}</Route>

            <Route path="/test-nested-path">
                <Route element={element} index />
                <Route element={element} path="/nested-path-element" />
                <Route path="/nested-path-children">{element}</Route>
            </Route>
        </Routes>
    );
};

export const expectedRoutes = [
    "/",
    "/test-surface-path-element",
    "/test-surface-path-children",
    "/test-nested-path",
    "/test-nested-path/nested-path-element",
    "/test-nested-path/nested-path-children"
];
export const expectedRouteAmount = 6;
export default TestRoutes;