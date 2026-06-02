export const EXTERNAL_LINK_PROPS = Object.freeze({
  target: "_blank",
  rel: "noopener noreferrer",
});

export function externalLinkProps(props = {}) {
  return {
    ...props,
    target: "_blank",
    rel: props.rel ?? "noopener noreferrer",
  };
}

export function isExternalHref(href) {
  const value = href?.trim?.().toLowerCase?.() ?? "";
  return (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("//")
  );
}
