import { describe, it, expect } from "vitest";
import { byId } from "../library";
import { PROFILE_FIXTURES } from "./client-profiles";

describe("client profile fixtures", () => {
  it("has no duplicate fixture names", () => {
    const names = PROFILE_FIXTURES.map((f) => f.name);
    expect(new Set(names).size).toBe(names.length);
  });

  for (const fixture of PROFILE_FIXTURES) {
    it(`${fixture.name}: every expected-skipped id exists in the library`, () => {
      for (const id of fixture.expectedSkippedIds) {
        expect(byId.has(id), `unknown exercise id: ${id}`).toBe(true);
      }
    });
  }
});
