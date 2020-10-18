import React, { useState } from 'react';
import {
    Link
} from "react-router-dom";

const Navbar = () => {
    const [navItems, setNavItems] = useState([
        {
            label: 'GIPHY',
            id: 'giphy',
            link: '/giphy',
            active: true
        },
        {
            label: 'PIXABAY',
            id: 'pixabay',
            link: '/pixabay',
            active: false
        }
    ]);

    const handleClick = (navItem) => {
        if (navItem.active) {
            return;
        }

        const updatedNavItems = navItems.map(item => {
            item.id === navItem.id
                ? item.active = true
                : item.active = false

            return item;
        });

        setNavItems(updatedNavItems);
    }

    return (
        <div>
            <nav>
                <ul>
                    {navItems.map(navItem => {
                        return (
                            <li
                                key={navItem.id}
                                className="nav_item">
                                <div onClick={() => handleClick(navItem)}>
                                    <Link className="nav_item--link" to={navItem.link}>{navItem.label}</Link>
                                    <div className={navItem.active ? 'nav_item--active' : null} />
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
