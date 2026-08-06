import { LIBRARY } from "./library";
import { CONTRAINDICATION_RULES } from "./contraindications";
import type {
  ClientProfile,
  Condition,
  ContraindicationRule,
  Exercise,
  ModificationAction,
  SkillLevel,
} from "./types";

const SKILL_RANK: Record<SkillLevel, number> = {
  Introductory: 0,
  Beginner: 1,
  Intermediate: 2,
};

/** Every exercise allowed at the client's level. */
export function eligiblePool(profile: ClientProfile): Exercise[] {
  return LIBRARY.filter((e) => SKILL_RANK[e.skill] <= SKILL_RANK[profile.level]);
}

export interface AppliedModification {
  action: ModificationAction;
  condition: Condition;
}

export function activeRules(conditions: Condition[]): ContraindicationRule[] {
  return CONTRAINDICATION_RULES.filter((rule) => conditions.includes(rule.condition));
}

/** Of the client's already-filtered rules, which apply to this exercise? */
export function modificationsFor(
  exercise: Exercise,
  rules: ContraindicationRule[],
): AppliedModification[] {
  return rules
    .filter(
      (rule) =>
        rule.exerciseIds?.includes(exercise.id) ||
        rule.tags?.some((t) => exercise.tags?.includes(t)),
    )
    .map((rule) => ({ action: rule.action, condition: rule.condition }));
}
