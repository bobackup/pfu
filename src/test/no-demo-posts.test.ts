import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const DIR = join(process.cwd(), "drizzle/migrations");
const sql = readdirSync(DIR).filter((f) => f.endsWith(".sql")).map((f) => readFileSync(join(DIR, f), "utf8")).join("\n");

describe("No demo posts are seeded", () => {
  for (const slug of ["serata-solidale-autunno", "raccolta-aiuti-umanitari", "rendiconto-annuale", "incontro-cultura-ucraina", "[ESEMPIO]", "[ПРИКЛАД]"]) {
    it(`migrations do not contain ${slug}`, () => expect(sql).not.toContain(slug));
  }
});
