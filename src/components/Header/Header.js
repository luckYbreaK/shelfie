import React from 'react';
import { Link } from "react-router-dom";

function Header() {
    return (
        <div>
            <Link to="/">Dashboard</Link>
            <Link to="/add">Form</Link>
        </div>
    );
}

export default Header;