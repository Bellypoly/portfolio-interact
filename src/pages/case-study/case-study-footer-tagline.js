export function resolveCaseStudyFooterTaglineParagraphs({
  caseStudy,
  desc,
  hideFooterTagline,
}) {
  if (hideFooterTagline) return [];

  const footerTagline = caseStudy?.footerTagline ?? desc;
  return Array.isArray(footerTagline)
    ? footerTagline.filter(Boolean)
    : [footerTagline].filter(Boolean);
}
