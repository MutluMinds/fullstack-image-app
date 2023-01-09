import React, { useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { APIS } from "../../static/constants";

const Dropdown = ({ 
    currentValue,
    onChange 
  }) => {
    const NAV_ITEMS = APIS.filter(
      (navItem) => navItem.label !== currentValue
    ).map(({ apiType, label }) => ({
      label,
      link: `/${apiType}`,
      apiType,
    }));

    const dropDownRef = useRef();

    useEffect(() => {
      let closeDropDown = (event) => {
        if (!dropDownRef.current.contains(event.target)) {
          onChange(true);
        }
      };
      document.addEventListener("mousedown", closeDropDown);
      return () => document.removeEventListener("mousedown", closeDropDown);
    });

    return (
      <div className="drop_menu" ref={dropDownRef}>
        {NAV_ITEMS.map((navItem) => {
          return (
            <li
              key={navItem.apiType}
              className="nav_item"
              onClick={() => onChange()}
            >
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
