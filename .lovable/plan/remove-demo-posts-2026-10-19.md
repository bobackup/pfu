# Remove demo posts

## Current state (checked)
- Database: the 4 sample posts are **already gone**. The only post left is `il-nostro-nuovo-capitolo` ("Il nostro nuovo capitolo"), a real post with no [ESEMPIO] marker. It stays as it is.
- The original setup file still contains the INSERT that adds the 4 sample posts (last lines of `drizzle/migrations/0000_migration.sql`). If the project were set up again, they would come back.

## Steps
1. Run a safety delete by slug (`serata-solidale-autunno`, `raccolta-aiuti-umanitari`, `rendiconto-annuale`, `incontro-cultura-ucraina`). It matches 0 rows today, so it only guards against them coming back. No other rows are touched.
2. Remove the sample-post INSERT block from the setup migration. Tables, policies and functions stay the same.
3. Empty-table behaviour (this already works, no design change):
   - Home: the "next event" banner only shows when there is an upcoming event. The "Latest" block shows the intro text plus a link to /news, not a list of posts, so it never looks empty.
   - /news shows the Facebook feed and does not read posts.
   - /news/<slug> returns 404 when a post is missing.
   - The admin list shows an empty table.
   - sitemap.xml lists only the fixed pages.
   - I will check all of this in the browser, with a test that runs the empty case.
4. Add a small test that checks the setup migration contains none of the 4 demo slugs or "[ESEMPIO]".

## Places that read posts (final list)
- `src/lib/posts.functions.ts`: `listPublishedPosts`, `getPublishedPost` (public, published only)
- `src/lib/queries.ts`: `postsQuery`, `postQuery` wrappers
- `src/routes/$lang.index.tsx`: home "next event" banner
- `src/routes/$lang.news.$slug.tsx`: single post page
- `src/routes/_authenticated/admin.index.tsx`: admin list (read + delete)
- `src/routes/_authenticated/admin.posts.$id.tsx`: admin editor (read/insert/update)
- `src/routes/sitemap[.]xml.ts`: published slugs

Design, texts and all other data stay unchanged.
