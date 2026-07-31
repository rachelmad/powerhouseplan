import { describe, it, expect } from "vitest";
import { LIBRARY, byId } from "./library";

describe("exercise library integrity", () => {
  it("contains all 27 Mat exercises", () => {
    expect(LIBRARY).toHaveLength(27);
  });

  it("has a unique id for every exercise", () => {
    expect(byId.size).toBe(LIBRARY.length);
  });
});
