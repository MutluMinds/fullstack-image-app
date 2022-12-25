import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const Badge = ({ inputValue, onClick }) => {
  return (
    <button 
      className="badge-button d-flex align-items-center gap-2 rounded bg-dark-gray"
      onClick={onClick}
    >
      <span>{inputValue}</span>
      <FontAwesomeIcon className="text-pink" icon={faTimesCircle} />
    </button>
  )
}

export default Badge;
