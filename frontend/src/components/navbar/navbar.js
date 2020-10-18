import React, { useState } from 'react';
import {
    Link
} from "react-router-dom";

const Navbar = ({ onChange, value }) => {
    const navItems = [
        {
            label: 'GIPHY',
            link: '/gifs',
            imageType: 'gifs'
        },
        {
            label: 'PIXABAY',
            link: '/images',
            imageType: 'images'
        }
    ];
    const handleClick = (navItem) => onChange(navItem.imageType);

    return (
        <div>
            <nav>
                <ul>
                    {navItems.map(navItem => {
                        return (
                            <li
                                key={navItem.imageType}
                                className="nav_item">
                                <div onClick={() => handleClick(navItem)}>
                                    <span className="nav_item--link" to={navItem.link}>{navItem.label}</span>
                                    <div className={navItem.imageType === value ? 'nav_item--active' : null} />
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;
