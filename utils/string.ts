export function deslugify(slug: string) {
  return slug
    .replace(/-/g, " ")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function limitText(text: string, limit: number) {
  if (text.length <= limit) return text;

  return text.slice(0, limit) + "...";
}
