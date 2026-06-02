import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import SpaceVoidShell from "../components/space-void-shell/space-void-shell.jsx";
import { assetUrl } from "../utils/asset-url";
import "./not-found-page.css";

const EASE = [0.22, 1, 0.36, 1];

export default function NotFoundPage() {
  const { pathname } = useLocation();

  useEffect(() => {
    const prev = document.title;
    document.title = "Lost in Space · 404";
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <SpaceVoidShell
      component="main"
      className="space-void-shell--page"
      contentClassName="not-found-page__content"
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <motion.img
          className="not-found-page__rocket"
          src={assetUrl("images/rocket.webp")}
          width={288}
          height={288}
          alt=""
          aria-hidden
          animate={{ y: [-4, 8, -4], rotate: [-2, 3, -2] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      <motion.div
        className="not-found-page__copy"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.45, ease: EASE }}
      >
        <p className="not-found-page__code">404 · signal lost</p>
        <h1 className="not-found-page__title">Lost in Space</h1>
        <p className="not-found-page__lead">
          Oops — the spaceship left without you…
        </p>
        <p className="not-found-page__sub">
          The page you requested could not be found.
          {pathname ? (
            <>
              <br />
              <span className="not-found-page__path">{pathname}</span>
            </>
          ) : null}
        </p>
        <Link className="not-found-page__btn" to="/">
          Back to home
        </Link>
      </motion.div>
    </SpaceVoidShell>
  );
}
