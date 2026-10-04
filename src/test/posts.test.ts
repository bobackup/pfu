import { describe, expect, it } from "vitest";
import { isPastEvent } from "@/lib/posts";

const now = new Date("2026-10-04T10:00:00Z");

describe("event auto-archive", () => {
  it("archives an event dated before today", () => {
    expect(isPastEvent({ category: "event", event_date: "2026-10-03" }, now)).toBe(true);
  });
  it("keeps an event happening today", () => {
    expect(isPastEvent({ category: "event", event_date: "2026-10-04" }, now)).toBe(false);
  });
  it("never archives non-event posts", () => {
    expect(isPastEvent({ category: "news", event_date: "2020-01-01" }, now)).toBe(false);
  });
});
