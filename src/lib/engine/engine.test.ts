import { describe, it, expect } from "vitest";
import { getExercisesForClient, getExercisesForLevel } from "./engine";
import { PROFILE_FIXTURES } from "./__fixtures__/client-profiles";

describe("getExercisesForLevel", () => {
  it("Introductory clients see only Introductory-skill exercises", () => {
    const pool = getExercisesForLevel("Introductory");
    expect(pool.every((e) => e.skill === "Introductory")).toBe(true);
    expect(pool.length).toBe(13);
  });

  it("Beginner clients never see Teaser I (Intermediate-only)", () => {
    const pool = getExercisesForLevel("Beginner");
    expect(pool.some((e) => e.id === "mat-teaser-1")).toBe(false);
    expect(pool.every((e) => e.skill !== "Intermediate")).toBe(true);
    expect(pool.length).toBe(25);
  });

  it("Intermediate clients see every Mat exercise, including Teaser I", () => {
    const pool = getExercisesForLevel("Intermediate");
    expect(pool.some((e) => e.id === "mat-teaser-1")).toBe(true);
    expect(pool.length).toBe(27);
  });

  it("each level's pool is a strict superset of the level below it", () => {
    const intro = getExercisesForLevel("Introductory");
    const beginner = getExercisesForLevel("Beginner");
    const intermediate = getExercisesForLevel("Intermediate");

    const beginnerIds = new Set(beginner.map((e) => e.id));
    const intermediateIds = new Set(intermediate.map((e) => e.id));

    expect(intro.every((e) => beginnerIds.has(e.id))).toBe(true);
    expect(beginner.every((e) => intermediateIds.has(e.id))).toBe(true);
  });
});

describe("getExercisesForClient", () => {
  for (const fixture of PROFILE_FIXTURES) {
    it(`${fixture.name}: none of the expected-skipped exercises appear`, () => {
      const ids = new Set(getExercisesForClient(fixture.profile).map((e) => e.id));
      for (const skippedId of fixture.expectedSkippedIds) {
        expect(ids.has(skippedId), `expected ${skippedId} to be skipped but it appeared`).toBe(
          false,
        );
      }
    });
  }

  it("skip beats reinforce: Push-Up Series is fully absent for wrist weakness + tight hamstrings, not just modified", () => {
    // Push-Up Series matches BOTH a skip rule (heavy-wrist-loading, via
    // wrist-weakness) and a reinforce rule (deep-hamstring-stretch, via
    // tight-hamstrings) at the same time. Skip must win outright.
    const pool = getExercisesForClient({
      level: "Beginner",
      conditions: ["wrist-weakness", "tight-hamstrings"],
    });
    expect(pool.some((e) => e.id === "mat-push-up-series")).toBe(false);
  });
});
