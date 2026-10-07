import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { it } from "@/i18n/it";
import { uk } from "@/i18n/uk";

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
    expect(it.home.impact[0].value).toBe("600+");
    expect(uk.home.impact[0].value).toBe("600+");
  });

  it("shows more than 100 public events and meetings in both languages", () => {
    expect(it.home.impact[1].value).toBe("100+");
    expect(uk.home.impact[1].value).toBe("100+");
  });
});
