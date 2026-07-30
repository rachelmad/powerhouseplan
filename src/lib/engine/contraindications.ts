import type { ContraindicationRule } from "./types";

/**
 * Contraindication rules: condition → affected exercises → action.
 *
 */

export const CONTRAINDICATION_RULES: ContraindicationRule[] = [
  // ── Wrists ──────────────────────────────────────────────────────────────
  // Weakness ≠ injury:
  // - wrist-weakness: strengthen! Light wrist loading stays IN the program;
  //   only full weight-bearing (heavy) is skipped.
  // - wrist-injury: both heavy and light wrist loading are skipped.
  {
    condition: "wrist-weakness",
    tags: ["heavy-wrist-loading"],
    action: {
      type: "skip",
      reason:
        "Full weight-bearing on wrists — skip while wrists are weak; light wrist work stays in to build strength",
    },
  },
  {
    condition: "wrist-injury",
    tags: ["heavy-wrist-loading", "light-wrist-loading"],
    action: {
      type: "skip",
      reason: "Injured wrist — skip all wrist-loading exercises",
    },
  },

  // ── Shoulder ──
  // General policy: modify over-shoulder arm work. Exceptions below are
  // skipped outright (skip always beats reduce-range in the engine).
  {
    condition: "shoulder-pain",
    tags: ["over-shoulder-height-arms"],
    action: {
      type: "reduce-range",
      reason: "Shoulder pain: keep the affected arm below shoulder height; the other arm may use full range",
    },
  },
  {
    condition: "shoulder-pain",
    exerciseIds: ["mat-swimming-prep", "mat-beats-on-belly", "mat-push-up-series"],
    action: {
      type: "skip",
      reason: "Shoulder pain: overhead reach/loading is integral to this exercise — skip",
    },
  },

  // ── Neck ──
  {
    condition: "neck-sensitivity",
    tags: ["neck-loading"],
    action: {
      type: "reduce-range",
      reason: "Neck sensitivity: support the head / keep head down where the exercise allows",
    },
  },

  // ── Lower back ──────────────────────────────────────────────────────────
  // Skip rolling over the spine + full Teaser; modify everything else.
  // Adjustments depend on the type of lower back pain. This flags both extension and flexion. 
  {
    condition: "lower-back-pain",
    exerciseIds: [
      "mat-rolling-like-a-ball",
      "mat-seal",
      "mat-open-leg-rocker-prep",
      "mat-teaser-1",
    ],
    action: {
      type: "skip",
      reason: "Lower back pain: rolling over the spine / full Teaser load — skip",
    },
  },
  {
    condition: "lower-back-pain",
    tags: ["extension"],
    action: {
      type: "reduce-range",
      reason: "Lower back: reduce range in loaded extension",
    },
  },
  {
    condition: "lower-back-pain",
    tags: ["deep-flexion"],
    action: {
      type: "reduce-range",
      reason: "Lower back: reduce loaded flexion demand (smaller range, bent knees)",
    },
  },

  // ── Scoliosis ───────────────────────────────────────────────────────────
  {
    condition: "scoliosis",
    tags: ["rotation", "lateral-flexion"],
    action: {
      type: "reduce-range",
      reason: "Scoliosis: work both sides evenly with reduced range; watch for asymmetry",
    },
  },

  // ── Tight hamstrings ────────────────────────────────────────────────────
  {
    condition: "tight-hamstrings",
    tags: ["light-hamstring-stretch", "deep-hamstring-stretch"],
    action: {
      type: "reinforce",
      reason: "Tight hamstrings: extra practice — bend the knee / shorten the stretch as needed",
    },
  },

  // ── Tight hip flexors ───────────────────────────────────────────────────
  {
    condition: "tight-hip-flexors",
    tags: ["hip-flexor-demand"],
    action: {
      type: "reinforce",
      reason: "Tight hip flexors: extra practice — reduce demand (bend knees / shorten lever)",
    },
  },

  // ── Pregnancy / postpartum ──
  {
    condition: "pregnancy-postpartum",
    tags: ["prone"],
    action: { type: "skip", reason: "Prone position — not appropriate during pregnancy" },
  },
  {
    condition: "pregnancy-postpartum",
    exerciseIds: [
      "mat-rolling-like-a-ball",
      "mat-spine-stretch-forward",
      "mat-open-leg-rocker-prep",
      "mat-teaser-one-leg",
      "mat-teaser-1",
      "mat-leg-pull-front-support",
      "mat-seal",
    ],
    action: {
      type: "skip",
      reason: "Instructor judgment: not appropriate during pregnancy",
    },
  },
  {
    condition: "pregnancy-postpartum",
    tags: ["deep-flexion"],
    action: {
      type: "reduce-range",
      reason: "Reduce loaded flexion demand — instructor to assess per trimester/recovery stage",
    },
  },
  {
    condition: "pregnancy-postpartum",
    tags: ["deep-hamstring-stretch"],
    action: {
      type: "skip",
      reason: "Deep hamstring stretch (beyond ~90° leg lift) — not appropriate during pregnancy",
    },
  },
];
