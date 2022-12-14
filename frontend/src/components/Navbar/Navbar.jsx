import React from "react";
import {
  IMAGE_TYPE_GIFS,
  IMAGE_TYPE_IMAGES,
} from "../../static/constants/imageTypes";

const Navbar = ({ onChange, value }) => {
  const navItems = [
    {
      label: "GIPHY",
      link: "/gifs",
      imageType: IMAGE_TYPE_GIFS,
    },
    {
      label: "PIXABAY",
      link: "/images",
      imageType: IMAGE_TYPE_IMAGES,
    },
  ];
  const handleClick = (navItem) => onChange(navItem.imageType);

  return (
    <div>
      <nav>
        <ul>
          {navItems.map((navItem) => {
            return (
              <li key={navItem.imageType} className="nav_item">
                <button onClick={() => handleClick(navItem)}>
                  <span className="nav_item--link" to={navItem.link}>
                    {navItem.label}
                  </span>
                  <div
                    className={
                      navItem.imageType === value ? "nav_item--active" : null
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
