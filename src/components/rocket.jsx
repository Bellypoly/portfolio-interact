import React from "react";

export default function CapsuleRocket() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Rocket body with webp and png fallback */}
      <picture
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "100%",
          display: "block",
        }}
      >
        <source srcSet="/images/rocket.webp" type="image/webp" />
        <img
          src="/images/rocket.png"
          alt="Rocket"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          }}
          draggable={false}
        />
      </picture>
      {/* Rocket sparkle with webp and png fallback */}
      <picture
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "100%",
          display: "block",
          animation: "sparkle 2s ease-in-out infinite",
          pointerEvents: "none",
        }}
      >
        <source srcSet="/images/rocket-sparkle.webp" type="image/webp" />
        <img
          src="/images/rocket-sparkle.png"
          alt="Rocket Sparkle"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
            pointerEvents: "none",
          }}
          draggable={false}
        />
      </picture>
      <style>{`
        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
