import React from "react";
import {APIS} from "../../static/constants";

const Navbar = ({ onChange, value }) => { 
  const navItems = [
    {
      label: "GIPHY",
      link: "/gifs",
      apiType: APIS.giphy,
    },
    {
      label: "PIXABAY",
      link: "/images",
      apiType: APIS.pixabay,
    },
    {
      label: "UNSPLASH",
      link: "/unsplashimages",
      apiType: APIS.unsplash
    }
  ];
  const handleClick = (navItem) => onChange(navItem.apiType);

  return (
    <div>
      <nav>
        <ul>
          {navItems.map((navItem) => {
            return (
              <li key={navItem.apiType} className="nav_item">
                <button onClick={() => handleClick(navItem)}>
                  <span className="nav_item--link" to={navItem.link}>
                    {navItem.label}
                  </span>
                  <div
                    className={
                      navItem.apiType === value ? "nav_item--active" : null
                    }
                  />
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
