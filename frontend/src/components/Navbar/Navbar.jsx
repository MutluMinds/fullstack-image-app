import React from "react";
// import { APIS } from "../../static/constants";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import ScrollButton from "../ScrollTopButton/ScrollTopButton";
import StickyBar from "../StickyBar/StickyBar";


const Navbar = ({setInputValue}) => {
  const [isClick, setClick] = useState(false);
  const handleClick = () => setClick(!isClick);
  const path = useLocation().pathname.substring(1).toUpperCase();

  return (
    <nav className="grid3">
        <ul onClick={handleClick} className="drop_initial">
          <li className="nav_item" >
            {path}
            <button className="nav-icon">
              <FontAwesomeIcon icon={faAngleDown} />
            </button>
          </li>
          {isClick ? (
            <Dropdown
              clickVal={isClick}
              changeClick={setClick}
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
