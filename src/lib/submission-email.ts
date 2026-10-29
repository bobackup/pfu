export type SubmissionKind = "contact" | "volunteer" | "member" | "partner" | "newsletter";

export const NOTIFY_EMAIL = "info@people4ukraine.org";

const KIND_LABEL: Record<SubmissionKind, string> = {
  contact: "contact message",
  volunteer: "volunteer request",
  member: "membership request",
  partner: "partnership request",
  newsletter: "newsletter signup",
};

export function kindLabel(kind: string): string {
  return KIND_LABEL[kind as SubmissionKind] ?? "form submission";
}

export function notificationSubject(kind: string): string {
  return `[People for Ukraine] New ${kindLabel(kind)}`;
}

/** Newsletter signups are stored only; no email to the association. */
export function shouldNotify(kind: SubmissionKind): boolean {
  return kind !== "newsletter";
}

export const RATE_LIMITS = {
  ip: { max: 5, windowMinutes: 10 },
  email: { max: 3, windowMinutes: 60 },
} as const;

/** True when `recentCount` earlier attempts already reached the limit. */
export function isRateLimited(recentCount: number, max: number): boolean {
  return recentCount >= max;
}
