const BASE_PATH = process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? "";

export function sitePath(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("//")) {
    return path;
  }

  if (!BASE_PATH) {
    return path;
  }

  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}
