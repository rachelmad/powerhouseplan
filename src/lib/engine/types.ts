/**
 * Core types for the Powerhouse program engine.
 *
 * The engine is pure TypeScript with no I/O — it takes a structured
 * ClientProfile and returns a single-day Program (V1 scope, 2026-07: one
 * 20-minute Mat session, not a 12-week plan). This module is the seam
 * where a future AI layer can plug in (free text → ClientProfile,
 * or templated notes → coaching-voice notes) without touching the engine.
 */

export type SkillLevel = "Introductory" | "Beginner" | "Intermediate";

/** Student level selected by the instructor; determines the eligible exercise pool. */
export type StudentLevel = "Introductory" | "Beginner" | "Intermediate";

/**
 * Structured conditions replace free-text weaknesses in V1.
 * Each maps to modifications in contraindications.ts.
 */
export type Condition =
  // Wrist weakness vs injury are deliberately separate conditions:
  // - weakness: wrists should be STRENGTHENED — light wrist loading is
  //   allowed (and useful); only full weight-bearing (heavy) is skipped.
  // - injury (for this app): both heavy AND light wrist loading are skipped.
  | "wrist-weakness"
  | "wrist-injury"
  | "shoulder-pain"
  | "neck-sensitivity"
  // NOTE: ankle-injury-or-instability was removed for V1 — no Mat exercise
  // carries ankle-loading. Re-add it in V2 when the chairs/Reformer footwork
  // (future-apparatus.ts) come back.
  | "lower-back-pain"
  | "scoliosis"
  // NOTE: knee-pain was removed for V1 — no Mat exercise carries knee-loading.
  // Re-add it in V2 when the chairs/Reformer footwork (future-apparatus.ts)
  // come back.
  | "tight-hamstrings"
  | "tight-hip-flexors"
  | "pregnancy-postpartum";

export interface ClientProfile {
  level: StudentLevel;
  conditions: Condition[];
}

export interface Exercise {
  id: string; // slug, unique across the library
  name: string;
  skill: SkillLevel;
  /** Series grouping, e.g. "Abdominal Series", "Footwork Series", "Leg Springs" */
  series?: string;
  reps: string;
  goal: string;
  buildingBlocks: string[];
  variations: string[];
  /** Section eligibility beyond the apparatus default (e.g. Wall/Power Circle → closing) */
  tags?: ExerciseTag[];
}

export type ExerciseTag =
  | "closing" // Wall Series / Power Circle endings
  | "heavy-wrist-loading" // full weight-bearing on wrists (planks, push-ups)
  | "light-wrist-loading" // partial/supporting wrist contact
  | "over-shoulder-height-arms" // arms raised above shoulder height
  | "neck-loading"
  | "deep-flexion" // loaded spinal flexion
  | "extension" // spinal extension work
  | "knee-loading"
  | "prone" // lying on stomach
  | "ankle-loading" // loading through foot/ankle (footwork, pumping, balance)
  | "rotation" // spinal rotation
  | "lateral-flexion" // side bending
  | "light-hamstring-stretch" // moderate hamstring stretch — leg/torso line stays at or under ~90° of hip flexion
  | "deep-hamstring-stretch" // intense hamstring stretch — typically beyond a 90° leg lift (deep forward folds); skipped in pregnancy
  | "hip-flexor-demand"; // high hip-flexor load (supine leg lowering/holds)

/** How a condition affects a specific exercise. */
/**
 * Three actions (instructor decision, 2026-07):
 * - skip: exercise is removed from the program entirely.
 * - reduce-range: exercise stays, a standing modification note is added,
 *   and normal progression still applies (conditions are trained through
 *   with care, not frozen at a regression).
 * - reinforce: exercise needs extra practice — the engine gives it two
 *   rows in the same workout (current stage + an easier/building-block
 *   variant) instead of one.
 */
export type ModificationAction =
  | { type: "skip"; reason: string }
  | { type: "reduce-range"; reason: string }
  | { type: "reinforce"; reason: string };

export interface ContraindicationRule {
  condition: Condition;
  /** Match by explicit exercise ids and/or by tag. */
  exerciseIds?: string[];
  tags?: ExerciseTag[];
  action: ModificationAction;
}

/** One row in a workout table. */
export interface WorkoutItem {
  exerciseId: string;
  name: string;
  level: SkillLevel;
  reps: string;
  /** Building block or variation currently in play, if any. */
  variant: string | null;
  variantKind: "building-block" | "variation" | "full";
  notes: string[];
}

/** V1 is a single Mat session — one section. */
export interface WorkoutSection {
  name: "Mat";
  durationMinutes: number;
  items: WorkoutItem[];
}

/** V1 output: one day's session, not a multi-week program. */
export interface Program {
  profile: ClientProfile;
  sections: WorkoutSection[];
}
