import React, {useState }  from "react";

import { APIS } from "../../static/constants";
import ScrollButton from "../ScrollTopButton/ScrollTopButton";
import StickyBar from "../StickyBar/StickyBar";
import Dropdown from "../Dropdown/Dropdown";

import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({setInputValue}) => {
  const [dropDownShown, setDropDownShown] = useState(false);
  const handleClick = () => setDropDownShown(!dropDownShown);
  const path = useLocation().pathname.substring(1).toUpperCase();

 const apiArray = APIS.map((api)=>api.label);
  return (
    <nav className="navbar">
        <ul onClick={handleClick} className="drop_initial">
          <li className="nav_item">
            {apiArray.indexOf(path) !== -1 ? path : "IMAGES"}
            <button className="nav-icon">
              <FontAwesomeIcon icon={faAngleDown} />
            </button>
          </li>
          {dropDownShown ? (
            <Dropdown
              onChange={(dropDownShown)=>setDropDownShown(!dropDownShown)}
              currentValue={path}
            />
          ) : null}
        </ul>
      <StickyBar onSearch={searchTerm => setInputValue(searchTerm)} />
      <ScrollButton /> 
    </nav>
  );
};

export default Navbar;
