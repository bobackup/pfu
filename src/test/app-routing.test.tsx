import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { it as italian } from "@/i18n/it";
import { uk } from "@/i18n/uk";
import { ACTIVITIES } from "@/lib/activities";
import { ORG } from "@/lib/site";
import {
  CULTURE_GALLERY,
  FIELD_SUPPORT_GALLERY,
  HOME_GALLERY,
  HUMANITARIAN_GALLERY,
  VEHICLES_GALLERY,
} from "@/lib/gallery";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
});

describe("Verified association impact", () => {
  it("shows more than 600 tonnes of humanitarian aid in both languages", () => {
    expect(italian.home.impact[0]?.value).toBe("600+");
    expect(uk.home.impact[0]?.value).toBe("600+");
  });

  it("shows more than 100 public events and meetings in both languages", () => {
    expect(italian.home.impact[1]?.value).toBe("100+");
    expect(uk.home.impact[1]?.value).toBe("100+");
  });
});

describe("Photo collections", () => {
  it("preserves all 38 activity photos exactly once across the new directions", () => {
    const sources = ACTIVITIES.flatMap((activity) => activity.gallery.map((photo) => photo.src));
    expect(sources).toHaveLength(38);
    expect(new Set(sources).size).toBe(38);
    expect(new Set(sources)).toEqual(new Set([
      ...VEHICLES_GALLERY, ...HUMANITARIAN_GALLERY, ...CULTURE_GALLERY, ...FIELD_SUPPORT_GALLERY,
    ].map((photo) => photo.src)));
  });

  it("keeps every uploaded photo in its assigned collection", () => {
    expect(HOME_GALLERY).toHaveLength(5);
    expect(VEHICLES_GALLERY).toHaveLength(11);
    expect(HUMANITARIAN_GALLERY).toHaveLength(4);
    expect(CULTURE_GALLERY).toHaveLength(15);
    expect(FIELD_SUPPORT_GALLERY).toHaveLength(8);
  });

  it("provides Italian and Ukrainian descriptions for every photo", () => {
    const photos = [
      ...HOME_GALLERY,
      ...VEHICLES_GALLERY,
      ...HUMANITARIAN_GALLERY,
      ...CULTURE_GALLERY,
      ...FIELD_SUPPORT_GALLERY,
    ];

    expect(photos).toHaveLength(43);
    expect(photos.every((photo) => photo.alt.it.length > 0 && photo.alt.uk.length > 0)).toBe(true);
  });
});

describe("News destination", () => {
  it("uses the association Facebook page specified by the user", () => {
    expect(ORG.socials.facebook).toBe("https://www.facebook.com/peopleforukraine");
  });
});
