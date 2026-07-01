import DOMPurify from "isomorphic-dompurify";

export const sanitizeWpContent = (html) => {
  if (!html) return html;

  return DOMPurify.sanitize(html);
};

export function stripHtml(html) {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
