import React from "react";
import { assetUrl } from "../../utils/asset-url";
import "./rocket.css";

export default React.memo(function CapsuleRocket() {
  return (
    <div className="rocket">
      <picture className="rocket-picture">
        <source
          srcSet={assetUrl("images/rocket.webp")}
          type="image/webp"
        />
        <img
          src={assetUrl("images/rocket.png")}
          alt="Rocket"
          className="rocket-img"
          draggable={false}
        />
      </picture>
      <picture className="rocket-picture rocket-picture--sparkle">
        <source
          srcSet={assetUrl("images/rocket-sparkle.webp")}
          type="image/webp"
        />
        <img
          src={assetUrl("images/rocket-sparkle.png")}
          alt="Rocket Sparkle"
          className="rocket-img"
          draggable={false}
        />
    </picture>
  </div>
);
});
