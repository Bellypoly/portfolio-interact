import React from "react";
import "./CaseStudyVersionCompareDiagram.css";

/**
 * Default bullet notes for the RIGHT column when variant is `v1v2`.
 * Story beat: after V1 (3 pages), V2 shipped — single page, progress bar, gated payment, sidebar.
 * (Clarity iteration / V3 is called out in the last bullet as future work.)
 */
const DEFAULT_AFTER_NOTES_V1V2 = [
  "1 page — member info, payment, order summary on one load",
  "Short path: paywall → checkout → purchase (no page-per-step)",
  "Email-first identity branching — fewer dead ends for returning users",
  "Progress bar + gated payment + benefits sidebar shipped here — Clarity drove V3",
];

/**
 * Default bullet notes for the RIGHT column when variant is `v1v3`.
 * Story beat: hypothetical / shortcut compare — V1 phones vs final V3 chrome (skip V2 mock).
 */
const DEFAULT_AFTER_NOTES_V1V3 = [
  "1 page — same structural win as V2, without the V2 chrome",
  "No progress bar — section headers carry the flow",
  "Payment fields on load — UI decoupled from Arc order-creation timing",
  "Benefits in a toggle — trust without stealing focus from the CTA",
];

/** v2v3 LEFT column: what shipped as V2 before Clarity (progress bar, gating, sidebar). */
const DEFAULT_BEFORE_NOTES_V2V3 = [
  "Progress bar read as navigation in Clarity — users clicked the numbered steps",
  "Payment fields gated until member info validated (Arc order constraint)",
  "Benefits column beside the form pulled attention from completing purchase",
];

/** v2v3 RIGHT column: V3 after evidence-driven changes. */
const DEFAULT_AFTER_NOTES_V2V3 = [
  "No progress bar — Checkout / Payment headers anchor the flow",
  "Payment fields on first paint; order creation still validates in the background",
  "Benefits collapsed into a toggle — trust without competing with the CTA",
];

function DesktopCheckoutMock({ showStepper }) {
  return (
    <div className="project-case-study__ba-after-row project-case-study__ba-after-row--desktop-solo">
      <div className="project-case-study__ba-device project-case-study__ba-device--desktop">
        <div className="project-case-study__ba-screen project-case-study__ba-screen--desktop">
          <div className="project-case-study__ba-browser">
            <span className="project-case-study__ba-dot project-case-study__ba-dot--red" />
            <span className="project-case-study__ba-dot project-case-study__ba-dot--yellow" />
            <span className="project-case-study__ba-dot project-case-study__ba-dot--green" />
          </div>
          <div className="project-case-study__ba-ui project-case-study__ba-desktop-layout">
            <div>
              <div className="project-case-study__ba-masthead">
                The Dallas Morning News
              </div>
              {showStepper ? (
                <div
                  className="project-case-study__ba-stepper"
                  aria-hidden="true"
                >
                  <span className="project-case-study__ba-stepper-seg">
                    <span className="project-case-study__ba-stepper-num project-case-study__ba-stepper-num--done">
                      1
                    </span>
                    Select Plan
                  </span>
                  <span className="project-case-study__ba-stepper-line" />
                  <span className="project-case-study__ba-stepper-seg project-case-study__ba-stepper-seg--active">
                    <span className="project-case-study__ba-stepper-num project-case-study__ba-stepper-num--current">
                      2
                    </span>
                    Payment
                  </span>
                  <span className="project-case-study__ba-stepper-line" />
                  <span className="project-case-study__ba-stepper-seg">
                    <span className="project-case-study__ba-stepper-num project-case-study__ba-stepper-num--todo">
                      3
                    </span>
                    Confirmation
                  </span>
                </div>
              ) : null}
              <h4 className="project-case-study__ba-ui-h4">Checkout</h4>
              <div className="project-case-study__ba-field" />
              <div className="project-case-study__ba-field-row">
                <div className="project-case-study__ba-field project-case-study__ba-field--sm" />
                <div className="project-case-study__ba-field project-case-study__ba-field--sm" />
              </div>
              <div className="project-case-study__ba-field" />
              {!showStepper ? (
                <div
                  className="project-case-study__ba-btn project-case-study__ba-btn--summary"
                  aria-hidden="true"
                />
              ) : null}
              <p className="project-case-study__ba-small-title">Payment</p>
              <div className="project-case-study__ba-field" />
              <div className="project-case-study__ba-field-row">
                <div className="project-case-study__ba-field project-case-study__ba-field--sm" />
                <div className="project-case-study__ba-field project-case-study__ba-field--sm" />
              </div>
              <div
                className="project-case-study__ba-btn project-case-study__ba-btn--narrow"
                aria-hidden="true"
              />
            </div>
            <div className="project-case-study__ba-summary">
              <p className="project-case-study__ba-small-title">
                Order Summary
              </p>
              <div
                className="project-case-study__ba-summary-line"
                style={{ width: "90%" }}
              />
              <div
                className="project-case-study__ba-summary-line"
                style={{ width: "78%" }}
              />
              <div
                className="project-case-study__ba-summary-line"
                style={{ width: "86%" }}
              />
              <div
                className="project-case-study__ba-summary-line"
                style={{ width: "70%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckoutFlowPills({ purchaseModifier }) {
  const purchaseClass =
    purchaseModifier === "good"
      ? "project-case-study__ba-pill project-case-study__ba-pill--good"
      : purchaseModifier === "bad"
        ? "project-case-study__ba-pill project-case-study__ba-pill--bad"
        : "project-case-study__ba-pill";

  return (
    <div className="project-case-study__ba-flow project-case-study__ba-flow--after">
      <span className="project-case-study__ba-pill">Paywall</span>
      <span className="project-case-study__ba-flow-arrow">→</span>
      <span className="project-case-study__ba-pill">
        Checkout (Single Page)
      </span>
      <span className="project-case-study__ba-flow-arrow">→</span>
      <span className={purchaseClass}>Purchase</span>
    </div>
  );
}

/**
 * Side-by-side checkout version comparison (schematic mocks, not screenshots).
 *
 * Set `variant` from case study data (`portfolioProjects.js` → `beforeAfterVariant`):
 *
 * | `variant` | Left panel | Right panel | Where it’s used in the subscription story |
 * |-----------|------------|-------------|-------------------------------------------|
 * | `v1v2` | **Version 1** — 3 phone steps + long broken path to Purchase | **Version 2** — single-page desktop, progress bar on | After “Version 1” problem; `problemSection.diagram` |
 * | `v1v3` | Same **Version 1** column | **Version 3** — desktop without progress bar (final chrome) | Optional shortcut compare (same grid as v1v2, different right notes/title) |
 * | `v2v3` | **Version 2** — desktop with progress bar | **Version 3** — desktop without progress bar | “Version 3: What Clarity showed us”; `claritySection.beforeAfterDiagram` |
 *
 * @param {string} [summary] — Visually hidden; for screen readers / `diagramAlt`.
 * @param {'v1v2' | 'v1v3' | 'v2v3'} [variant='v1v2']
 * @param {string} [afterPanelTitle] — Right column heading when not `v2v3` (defaults: Version 2 or Version 3).
 * @param {string[]} [afterNotes] — Override default right-column bullets.
 * @param {string[]} [beforeNotes] — `v2v3` only: override left-column bullets.
 */
export default function CaseStudyVersionCompareDiagram({
  summary,
  variant = "v1v2",
  afterPanelTitle,
  afterNotes,
  beforeNotes,
}) {
  /* ─── v2v3: two desktops (Clarity chapter) — V2 shipped vs V3 iterated ─── */
  if (variant === "v2v3") {
    const leftNotes =
      beforeNotes?.length > 0 ? beforeNotes : DEFAULT_BEFORE_NOTES_V2V3;
    const rightNotes =
      afterNotes?.length > 0 ? afterNotes : DEFAULT_AFTER_NOTES_V2V3;

    return (
      <div className="project-case-study__ba project-case-study__ba--v2v3">
        {summary ? <p className="sr-only">{summary}</p> : null}

        <div className="project-case-study__ba-grid">
          <article className="project-case-study__ba-panel project-case-study__ba-panel--before">
            <h3 className="project-case-study__ba-panel-title">Version 2</h3>
            <DesktopCheckoutMock showStepper />
            <CheckoutFlowPills purchaseModifier="neutral" />
            <ul className="project-case-study__ba-notes project-case-study__ba-notes--before">
              {leftNotes.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </article>

          <article className="project-case-study__ba-panel project-case-study__ba-panel--after">
            <h3 className="project-case-study__ba-panel-title">Version 3</h3>
            <DesktopCheckoutMock showStepper={false} />
            <CheckoutFlowPills purchaseModifier="good" />
            <ul className="project-case-study__ba-notes project-case-study__ba-notes--after">
              {rightNotes.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    );
  }

  /* ─── v1v2 | v1v3: phones (V1) vs one desktop (V2 or V3) ─── */
  const isV1V2 = variant === "v1v2";
  const showStepper = isV1V2;
  const resolvedAfterTitle =
    afterPanelTitle ?? (isV1V2 ? "Version 2" : "Version 3");
  const resolvedAfterNotes =
    afterNotes?.length > 0
      ? afterNotes
      : isV1V2
        ? DEFAULT_AFTER_NOTES_V1V2
        : DEFAULT_AFTER_NOTES_V1V3;

  return (
    <div className="project-case-study__ba">
      {summary ? <p className="sr-only">{summary}</p> : null}

      <div className="project-case-study__ba-grid">
        <article className="project-case-study__ba-panel project-case-study__ba-panel--before">
          <h3 className="project-case-study__ba-panel-title">Version 1</h3>

          <div className="project-case-study__ba-phone-row">
            <div className="project-case-study__ba-device project-case-study__ba-device--phone">
              <div className="project-case-study__ba-screen">
                <div className="project-case-study__ba-ui">
                  <div className="project-case-study__ba-masthead">
                    The Dallas Morning News
                  </div>
                  <h4 className="project-case-study__ba-ui-h4">
                    Member Information
                  </h4>
                  <div className="project-case-study__ba-field" />
                  <div className="project-case-study__ba-field" />
                  <div className="project-case-study__ba-field" />
                  <div className="project-case-study__ba-field" />
                  <div
                    className="project-case-study__ba-btn project-case-study__ba-btn--muted"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>

            <span className="project-case-study__ba-arrow" aria-hidden="true">
              →
            </span>

            <div className="project-case-study__ba-device project-case-study__ba-device--phone">
              <div className="project-case-study__ba-screen">
                <div className="project-case-study__ba-ui">
                  <div className="project-case-study__ba-masthead">
                    The Dallas Morning News
                  </div>
                  <h4 className="project-case-study__ba-ui-h4">
                    Payment Information
                  </h4>
                  <div className="project-case-study__ba-field" />
                  <div className="project-case-study__ba-field-row">
                    <div className="project-case-study__ba-field project-case-study__ba-field--sm" />
                    <div className="project-case-study__ba-field project-case-study__ba-field--sm" />
                  </div>
                  <div className="project-case-study__ba-field" />
                  <div className="project-case-study__ba-field" />
                  <div
                    className="project-case-study__ba-btn"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>

            <span className="project-case-study__ba-arrow" aria-hidden="true">
              →
            </span>

            <div className="project-case-study__ba-device project-case-study__ba-device--phone">
              <div className="project-case-study__ba-screen">
                <div className="project-case-study__ba-ui">
                  <div className="project-case-study__ba-masthead">
                    The Dallas Morning News
                  </div>
                  <h4 className="project-case-study__ba-ui-h4">Set Password</h4>
                  <div className="project-case-study__ba-field" />
                  <div className="project-case-study__ba-field" />
                  <div
                    className="project-case-study__ba-btn"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="project-case-study__ba-flow project-case-study__ba-flow--before">
            <span className="project-case-study__ba-pill">Paywall</span>
            <span className="project-case-study__ba-flow-arrow">→</span>
            <span className="project-case-study__ba-pill">Login</span>
            <span className="project-case-study__ba-flow-arrow">→</span>
            <span className="project-case-study__ba-pill">Page 1</span>
            <span className="project-case-study__ba-flow-arrow">→</span>
            <span className="project-case-study__ba-pill">Page 2</span>
            <span className="project-case-study__ba-flow-arrow">→</span>
            <span className="project-case-study__ba-pill">Page 3</span>
            <span className="project-case-study__ba-flow-arrow">→</span>
            <span className="project-case-study__ba-pill project-case-study__ba-pill--bad">
              Purchase
            </span>
          </div>

          <ul className="project-case-study__ba-notes project-case-study__ba-notes--before">
            <li>3 pages, 5 transitions to purchase</li>
            <li>No identity resolution — dead ends for returning users</li>
            <li>Session state lost between page loads</li>
          </ul>
        </article>

        <article className="project-case-study__ba-panel project-case-study__ba-panel--after">
          <h3 className="project-case-study__ba-panel-title">
            {resolvedAfterTitle}
          </h3>

          <DesktopCheckoutMock showStepper={showStepper} />

          <CheckoutFlowPills purchaseModifier="good" />

          <ul className="project-case-study__ba-notes project-case-study__ba-notes--after">
            {resolvedAfterNotes.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </article>
      </div>
    </div>
  );
}
