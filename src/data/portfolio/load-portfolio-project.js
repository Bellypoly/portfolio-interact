/**
 * Dynamic import per slug for `/mission/:slug` (keeps case-study chunks out of the main bundle).
 * Slug keys must match `MISSION_GALLERY_MANIFEST` in `mission-gallery-manifest.js`.
 */
const SLUG_LOADERS = {
  "article-page-redesign": () =>
    import("./projects/article-page-redesign-project.js").then(
      (m) => m.articlePageRedesignProject,
    ),
  "dynamic-paywall": () =>
    import("./projects/dynamic-paywall-project.js").then(
      (m) => m.dynamicPaywallProject,
    ),
  "electricity-bill-breakdown": () =>
    import("./projects/electricity-bill-breakdown-project.js").then(
      (m) => m.electricityBillBreakdownProject,
    ),
  "federated-learning-energy": () =>
    import("./projects/federated-learning-energy-project.js").then(
      (m) => m.federatedLearningEnergyProject,
    ),
  "industrial-logistics-evaluation": () =>
    import("./projects/industrial-logistics-evaluation-project.js").then(
      (m) => m.industrialLogisticsEvaluationProject,
    ),
  "jerdi-kids": () =>
    import("./projects/jerdi-kids-project.js").then((m) => m.jerdiKidsProject),
  jobthai: () =>
    import("./projects/jobthai-project.js").then((m) => m.jobthaiProject),
  "local-elections-hub": () =>
    import("./projects/local-elections-hub-project.js").then(
      (m) => m.localElectionsHubProject,
    ),
  "map-magic": () =>
    import("./projects/map-magic-project.js").then((m) => m.mapMagicProject),
  "outage-management-system": () =>
    import("./projects/outage-management-system-project.js").then(
      (m) => m.outageManagementSystemProject,
    ),
  "parliament-watch-ocr": () =>
    import("./projects/parliament-watch-ocr-project.js").then(
      (m) => m.parliamentWatchOcrProject,
    ),
  "pea-e-service": () =>
    import("./projects/pea-e-service-project.js").then((m) => m.peaEServiceProject),
  "photo-competition-my-hometown": () =>
    import("./projects/photo-competition-my-hometown-project.js").then(
      (m) => m.photoCompetitionMyHometownProject,
    ),
  rdfd: () => import("./projects/rdfd-project.js").then((m) => m.rdfdProject),
  "subscription-checkout-activation": () =>
    import("./projects/subscription-checkout-activation-project.js").then(
      (m) => m.subscriptionCheckoutActivationProject,
    ),
  "vote62-ect-report-69": () =>
    import("./projects/vote62-ect-report-69-project.js").then(
      (m) => m.vote62EctReport69Project,
    ),
};

export const PORTFOLIO_PROJECT_SLUGS = Object.freeze(Object.keys(SLUG_LOADERS));

/** @param {string | undefined} slug */
export function hasPortfolioProjectSlug(slug) {
  return Boolean(slug && SLUG_LOADERS[slug]);
}

/**
 * @param {string | undefined} slug
 * @returns {Promise<object | null>}
 */
export function loadPortfolioProjectBySlug(slug) {
  if (slug == null || slug === "") return Promise.resolve(null);
  const loader = SLUG_LOADERS[slug];
  return loader ? loader() : Promise.resolve(null);
}
