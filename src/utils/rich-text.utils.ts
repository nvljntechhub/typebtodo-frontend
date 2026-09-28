export function richTextToPlainText(html: string) {
  if (!html) return "";
  if (!html.includes("<")) return html.replace(/\u00a0/g, " ").trim();

  const text =
    new DOMParser().parseFromString(html, "text/html").body.innerText ?? "";
  return text.replace(/\u00a0/g, " ").trim();
}

export function isEmptyRichText(html: string) {
  return richTextToPlainText(html).length === 0;
}
