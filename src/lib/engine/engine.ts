import { LIBRARY } from "./library";
import type { ClientProfile, Exercise, SkillLevel } from "./types";

const SKILL_RANK: Record<SkillLevel, number> = {
  Introductory: 0,
  Beginner: 1,
  Intermediate: 2,
};

/** Every exercise allowed at the client's level. */
export function eligiblePool(profile: ClientProfile): Exercise[] {
  return LIBRARY.filter((e) => SKILL_RANK[e.skill] <= SKILL_RANK[profile.level]);
}
