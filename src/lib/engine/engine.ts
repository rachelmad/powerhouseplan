import { LIBRARY } from "./library";
import { CONTRAINDICATION_RULES } from "./contraindications";
import type {
  ClientProfile,
  Condition,
  ContraindicationRule,
  Exercise,
  ModificationAction,
  SkillLevel,
  StudentLevel,
} from "./types";

const SKILL_RANK: Record<SkillLevel, number> = {
  Introductory: 0,
  Beginner: 1,
  Intermediate: 2,
};

/** Every exercise allowed at this level. */
export function getExercisesForLevel(level: StudentLevel): Exercise[] {
  return LIBRARY.filter((e) => SKILL_RANK[e.skill] <= SKILL_RANK[level]);
}

export interface AppliedModification {
  action: ModificationAction;
  condition: Condition;
}

export function getActiveRules(conditions: Condition[]): ContraindicationRule[] {
  return CONTRAINDICATION_RULES.filter((rule) => conditions.includes(rule.condition));
}

/** Of the client's already-filtered rules, which apply to this exercise? */
export function findModifications(
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

/** Exercises for this level, minus anything skipped for this client's conditions. */
export function getExercisesForClient(profile: ClientProfile): Exercise[] {
  const rules = getActiveRules(profile.conditions);
  return getExercisesForLevel(profile.level).filter(
    (e) => !findModifications(e, rules).some((m) => m.action.type === "skip"),
  );
}
