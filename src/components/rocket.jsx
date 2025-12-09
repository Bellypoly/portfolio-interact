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
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "100%",
          backgroundImage: "url(/images/rocket.png)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "100%",
          backgroundImage: "url(/images/rocket-sparkle.png)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          animation: "sparkle 2s ease-in-out infinite",
        }}
      />
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
