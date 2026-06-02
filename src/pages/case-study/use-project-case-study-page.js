import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { loadPortfolioProjectBySlug } from "../../data/portfolio/load-portfolio-project";

const HEADER_TITLE_ROOT_MARGIN = "-56px 0px 0px 0px";

export function usePortfolioProject(slug) {
  const [project, setProject] = useState(undefined);

  useEffect(() => {
    if (!slug) {
      setProject(null);
      return undefined;
    }

    let cancelled = false;
    setProject(undefined);

    loadPortfolioProjectBySlug(slug).then(
      (p) => {
        if (!cancelled) setProject(p);
      },
      () => {
        if (!cancelled) setProject(null);
      },
    );

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return project;
}

export function useCaseStudyHeaderTitle(isActive, slug) {
  const [showHeaderTitle, setShowHeaderTitle] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    const titleEl = titleRef.current;

    if (!titleEl || !isActive) {
      setShowHeaderTitle(false);
      return undefined;
    }

    if (!("IntersectionObserver" in window)) {
      const updateHeaderTitle = () => {
        setShowHeaderTitle(titleEl.getBoundingClientRect().bottom <= 0);
      };

      updateHeaderTitle();
      window.addEventListener("scroll", updateHeaderTitle, { passive: true });
      window.addEventListener("resize", updateHeaderTitle);

      return () => {
        window.removeEventListener("scroll", updateHeaderTitle);
        window.removeEventListener("resize", updateHeaderTitle);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => setShowHeaderTitle(!entry.isIntersecting),
      { rootMargin: HEADER_TITLE_ROOT_MARGIN, threshold: 0 },
    );

    observer.observe(titleEl);

    return () => observer.disconnect();
  }, [isActive, slug]);

  return { showHeaderTitle, titleRef };
}

export function useScrollToTopOnCaseStudy(isActive, slug) {
  useLayoutEffect(() => {
    if (isActive) {
      window.scrollTo(0, 0);
    }
  }, [isActive, slug]);
}
