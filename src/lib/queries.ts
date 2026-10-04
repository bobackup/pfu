import { queryOptions } from "@tanstack/react-query";
import { getPublishedPost, listPublishedPosts } from "./posts.functions";

export const postsQuery = queryOptions({
  queryKey: ["posts", "published"],
  queryFn: () => listPublishedPosts(),
  staleTime: 60_000,
});

export const postQuery = (slug: string) =>
  queryOptions({
    queryKey: ["posts", "slug", slug],
    queryFn: () => getPublishedPost({ data: { slug } }),
    staleTime: 60_000,
  });
