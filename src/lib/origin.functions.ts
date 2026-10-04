import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

/** Public site origin: SITE_URL env if set, otherwise derived from the request. */
export const getRequestOrigin = createServerFn({ method: "GET" }).handler(() => {
  const env = process.env["SITE_URL"];
  if (env) return env.replace(/\/$/, "");
  const req = getRequest();
  const url = new URL(req.url);
  const sandboxHost = url.hostname === "localhost" ? req.headers.get("x-forwarded-host") : null;
  return sandboxHost ? `https://${sandboxHost}` : url.origin;
});

/** Picks "uk" when the browser's Accept-Language starts with "uk", else "it". */
export const getPreferredLang = createServerFn({ method: "GET" }).handler(() => {
  const al = getRequest().headers.get("accept-language") ?? "";
  return al.trim().toLowerCase().startsWith("uk") ? "uk" : "it";
});
