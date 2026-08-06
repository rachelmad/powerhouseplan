import { describe, it, expect } from "vitest";
import { eligiblePool } from "./engine";

describe("eligiblePool", () => {
  it("Introductory clients see only Introductory-skill exercises", () => {
    const pool = eligiblePool({ level: "Introductory", conditions: [] });
    expect(pool.every((e) => e.skill === "Introductory")).toBe(true);
    expect(pool.length).toBe(13);
  });

  it("Beginner clients never see Teaser I (Intermediate-only)", () => {
    const pool = eligiblePool({ level: "Beginner", conditions: [] });
    expect(pool.some((e) => e.id === "mat-teaser-1")).toBe(false);
    expect(pool.every((e) => e.skill !== "Intermediate")).toBe(true);
    expect(pool.length).toBe(25);
  });

  it("Intermediate clients see every Mat exercise, including Teaser I", () => {
    const pool = eligiblePool({ level: "Intermediate", conditions: [] });
    expect(pool.some((e) => e.id === "mat-teaser-1")).toBe(true);
    expect(pool.length).toBe(27);
  });

  it("each level's pool is a strict superset of the level below it", () => {
    const intro = eligiblePool({ level: "Introductory", conditions: [] });
    const beginner = eligiblePool({ level: "Beginner", conditions: [] });
    const intermediate = eligiblePool({ level: "Intermediate", conditions: [] });

    const beginnerIds = new Set(beginner.map((e) => e.id));
    const intermediateIds = new Set(intermediate.map((e) => e.id));

    expect(intro.every((e) => beginnerIds.has(e.id))).toBe(true);
    expect(beginner.every((e) => intermediateIds.has(e.id))).toBe(true);
  });
});
