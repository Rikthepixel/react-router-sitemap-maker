import { expect } from "chai";
import { GetEndpoints } from '../src';
import TestRoutes, { expectedEndpoints, expectedRouteAmount } from './input/TestRoutes';

describe('GetEndpoints', () => {

    it("Creates an array with uri's equal to the input routes", () => {
        const actual = GetEndpoints(TestRoutes());

        expect(actual).to.be.a("array");
        expect(actual).to.have.a.lengthOf(expectedRouteAmount);
        expect(actual).to.have.all.members(expectedEndpoints);
    });

});