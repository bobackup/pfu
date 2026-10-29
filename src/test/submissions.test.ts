import { describe, expect, test } from "vitest";
import { NOTIFY_EMAIL, RATE_LIMITS, isRateLimited, notificationSubject, shouldNotify } from "@/lib/submission-email";
import { template } from "@/lib/email-templates/submission-notification";

describe("submission notifications", () => {
  test("subject shows the form kind", () => {
    expect(notificationSubject("volunteer")).toBe("[People for Ukraine] New volunteer request");
    expect(notificationSubject("contact")).toBe("[People for Ukraine] New contact message");
  });
  test("newsletter signups do not email the association", () => {
    expect(shouldNotify("newsletter")).toBe(false);
    expect(shouldNotify("contact")).toBe(true);
    expect(shouldNotify("partner")).toBe(true);
  });
  test("notifications always go to info@people4ukraine.org", () => {
    expect(NOTIFY_EMAIL).toBe("info@people4ukraine.org");
    expect(template.to).toBe("info@people4ukraine.org");
  });
  test("6th submission from one IP within 10 minutes is blocked", () => {
    expect(RATE_LIMITS.ip).toEqual({ max: 5, windowMinutes: 10 });
    expect(isRateLimited(4, RATE_LIMITS.ip.max)).toBe(false);
    expect(isRateLimited(5, RATE_LIMITS.ip.max)).toBe(true);
  });
  test("4th submission from one email within an hour is blocked", () => {
    expect(isRateLimited(3, RATE_LIMITS.email.max)).toBe(true);
  });
});
