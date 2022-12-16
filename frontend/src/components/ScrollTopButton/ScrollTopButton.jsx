import React from "react";

import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ScrollTopButton = () => (
  <button
    className="scroll-top-button"
    title="Scroll Top"
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
    <div className="scroll-top-button-wrapper">
      <div className="above-line"></div>
      <FontAwesomeIcon className="ScrollIcon" icon={faAngleUp} />
    </div>
  </button>
);

export default ScrollTopButton;
