import React from "react";
import { NavLink } from "react-router-dom";
import { APIS } from "../../static/constants";

const NAV_ITEMS = APIS.map(({ apiType, label }) => ({
  label,
  link: `/${apiType}`,
  apiType
}));

const Navbar = () => {
  return (
    <div>
      <nav>
        <ul>
          {NAV_ITEMS.map((navItem) => {
            return (
              <li key={navItem.apiType} className="nav_item">
                <button>
                  <NavLink
                    className="nav_item--link"
                    to={navItem.link}
                  >
                    {({ isActive }) => (<>
                      {navItem.label}
                      <div className={isActive ? "nav_item--active" : null} />
                    </>)}
                  </NavLink>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
