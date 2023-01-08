import React from "react";
import { NavLink } from "react-router-dom";
import { APIS } from "../../static/constants";

const Dropdown = ({ currentValue, clickVal, changeClick }) => {
  const NAV_ITEMS = APIS.filter((navItem) => {
    return navItem.label !== currentValue;
  }).map(({ apiType, label }) => ({
    label,
    link: `/${apiType}`,
    apiType,
  }));

  const handleClick = () => {
    changeClick(!clickVal);
  };

  return (
    <div className="drop_menu">
      {NAV_ITEMS.map((navItem) => {
        return (
          <li key={navItem.apiType} className="nav_item" onClick={handleClick}>
            <NavLink className="nav_item--link" to={navItem.link}>
              {navItem.label}
            </NavLink>
          </li>
        );
      })}
    </div>
  );
};

export default Dropdown;
