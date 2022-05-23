import { expect } from "chai";
import { ParseRoutes } from '../src';
import TestRoutes, { expectedRouteAmount, expectedRoutes } from './input/TestRoutes';

describe('ParseRoute', () => {

    it("Creates an array with uri's equal to the input routes", () => {
        const actual = ParseRoutes(TestRoutes());

        expect(actual).to.be.a("object");
        expect(actual).to.have.a.lengthOf(expectedRouteAmount);
        expect(actual).to.have.all.members(expectedRoutes);
    });

});