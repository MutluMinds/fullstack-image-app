import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const Navbar = () => {
    const navItems = ['GIPHY', 'PIXABAY'];

    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        {navItems.map((navItem, index) => {
                            return (
                                <li key={index} className="nav_item">
                                    <span>{ navItem }</span>
                                    <div className="nav_item--active" />
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </Router>
    );
}

export default Navbar;
