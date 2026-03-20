import React from "react";
import "./rocket.css";

export default React.memo(function CapsuleRocket() {
  return (
    <div className="rocket">
      <picture className="rocket-picture">
        <source
          srcSet={`${import.meta.env.BASE_URL}images/rocket.webp`}
          type="image/webp"
        />
        <img
          src={`${import.meta.env.BASE_URL}images/rocket.png`}
          alt="Rocket"
          className="rocket-img"
          draggable={false}
        />
      </picture>
      <picture className="rocket-picture rocket-picture--sparkle">
        <source
          srcSet={`${import.meta.env.BASE_URL}images/rocket-sparkle.webp`}
          type="image/webp"
        />
        <img
          src={`${import.meta.env.BASE_URL}images/rocket-sparkle.png`}
          alt="Rocket Sparkle"
          className="rocket-img"
          draggable={false}
        />
    </picture>
  </div>
);
});
