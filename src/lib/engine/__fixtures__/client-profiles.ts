import type { ClientProfile } from "../types";

/**
 * Hand-authored expected outcomes for representative client profiles.
 *
 * These are DESIGN DECISIONS, not derived from the engine — each
 * `expectedSkippedIds` list was worked out by reading the contraindication
 * rules directly, before generateProgram() exists. Once the engine is built,
 * tests import this file and assert its output matches these fixtures
 * exactly. If a fixture and the engine ever disagree, that's a real
 * conflict to resolve deliberately — never just update the fixture to match
 * whatever the code currently does.
 */
export interface ProfileFixture {
  name: string;
  profile: ClientProfile;
  /** ids that must be fully absent from the generated session. */
  expectedSkippedIds: string[];
  notes: string;
}

export const PROFILE_FIXTURES: ProfileFixture[] = [
  {
    name: "wrist weakness",
    profile: { level: "Beginner", conditions: ["wrist-weakness"] },
    expectedSkippedIds: ["mat-leg-pull-front-support", "mat-push-up-series"],
    notes:
      "Only heavy wrist-loading is skipped — light wrist work (Swan, all four Side Kicks) stays in to build strength.",
  },
  {
    name: "wrist injury",
    profile: { level: "Beginner", conditions: ["wrist-injury"] },
    expectedSkippedIds: [
      "mat-leg-pull-front-support",
      "mat-push-up-series",
      "mat-swan-1-neck-roll",
      "mat-side-kick-front-back",
      "mat-side-kick-up-down",
      "mat-side-kick-circles",
      "mat-side-kick-inner-thigh",
    ],
    notes: "Both heavy and light wrist-loading are skipped.",
  },
  {
    name: "shoulder pain",
    profile: { level: "Beginner", conditions: ["shoulder-pain"] },
    expectedSkippedIds: ["mat-swimming-prep", "mat-beats-on-belly", "mat-push-up-series"],
    notes:
      "Overhead-arm work elsewhere (Roll Up, Double Leg Stretch, Side Kicks, Teaser–One Leg, Mermaid) is reduce-range, not skipped — these three have overhead loading integral to the exercise itself.",
  },
  {
    name: "neck sensitivity",
    profile: { level: "Beginner", conditions: ["neck-sensitivity"] },
    expectedSkippedIds: [],
    notes: "Neck-loading exercises are reduce-range only — this condition never skips anything.",
  },
  {
    name: "lower back pain",
    profile: { level: "Intermediate", conditions: ["lower-back-pain"] },
    expectedSkippedIds: [
      "mat-rolling-like-a-ball",
      "mat-seal",
      "mat-open-leg-rocker-prep",
      "mat-teaser-1",
    ],
    notes:
      "Level is Intermediate specifically so Teaser I (Intermediate-only) is in the pool to begin with — otherwise its skip can't be observed. Extension and flexion work elsewhere is reduce-range only.",
  },
  {
    name: "scoliosis",
    profile: { level: "Beginner", conditions: ["scoliosis"] },
    expectedSkippedIds: [],
    notes: "Rotation and lateral-flexion work is reduce-range only — nothing is skipped.",
  },
  {
    name: "tight hamstrings",
    profile: { level: "Beginner", conditions: ["tight-hamstrings"] },
    expectedSkippedIds: [],
    notes:
      "Reinforce only — this condition never removes an exercise, it adds a second practice row alongside it.",
  },
  {
    name: "tight hip flexors",
    profile: { level: "Beginner", conditions: ["tight-hip-flexors"] },
    expectedSkippedIds: [],
    notes: "Reinforce only, same reasoning as tight hamstrings.",
  },
  {
    name: "pregnant Beginner",
    profile: { level: "Beginner", conditions: ["pregnancy-postpartum"] },
    expectedSkippedIds: [
      "mat-swan-1-neck-roll",
      "mat-swimming-prep",
      "mat-beats-on-belly",
      "mat-rolling-like-a-ball",
      "mat-spine-stretch-forward",
      "mat-open-leg-rocker-prep",
      "mat-teaser-one-leg",
      "mat-leg-pull-front-support",
      "mat-seal",
      "mat-saw",
      "mat-push-up-series",
    ],
    notes:
      "Union of the prone-tag skip, the named skip list, and the deep-hamstring-stretch skip. mat-teaser-1 is also on the named skip list but is Intermediate-only, so it's never eligible at Beginner in the first place — see the lower-back-pain fixture above for that one instead.",
  },
  {
    name: "multi-condition: wrist injury + shoulder pain + lower back pain",
    profile: {
      level: "Beginner",
      conditions: ["wrist-injury", "shoulder-pain", "lower-back-pain"],
    },
    expectedSkippedIds: [
      "mat-leg-pull-front-support",
      "mat-push-up-series",
      "mat-swan-1-neck-roll",
      "mat-side-kick-front-back",
      "mat-side-kick-up-down",
      "mat-side-kick-circles",
      "mat-side-kick-inner-thigh",
      "mat-swimming-prep",
      "mat-beats-on-belly",
      "mat-rolling-like-a-ball",
      "mat-seal",
      "mat-open-leg-rocker-prep",
    ],
    notes:
      "Union across all three conditions' skip rules. Lower-back-pain's fourth skip target, mat-teaser-1, is Intermediate-only, so it isn't in this Beginner client's pool to begin with.",
  },
];
