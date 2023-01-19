import React, {useState }  from "react";

import { APIS } from "../../static/constants";
import Dropdown from "../Dropdown/Dropdown";

import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const ApiSelector = () => {
  const [dropDownShown, setDropDownShown] = useState(false);
  const handleClick = () => setDropDownShown(!dropDownShown);
  const path = useLocation().pathname.substring(1).toUpperCase();

  const apiArray = APIS.map((api)=>api.label);
  return (
    <button className="api-selector" onClick={handleClick}>
      <ul className="drop_initial">
        <li className="drop_item">
          {apiArray.indexOf(path) !== -1 ? path : "IMAGES"}
          <span className="drop-icon">
            <FontAwesomeIcon icon={faAngleDown} />
          </span>
        </li>
        {dropDownShown ? (
          <Dropdown
            onChange={(dropDownShown)=>setDropDownShown(!dropDownShown)}
            currentValue={path}
          />
        ) : null}
      </ul>
    </button>
  );
};

export default ApiSelector;
