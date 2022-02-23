import React from 'react';
import { NavLink } from "react-router-dom";
import { BiHome } from "react-icons/bi";

const HomeLink = () => {
  return (
    <NavLink exact to="/home" activeClassName="nav-active">
        <div className="logout-btn">
            <BiHome />
            <h2>home</h2>
        </div>
    </NavLink>
  )
}

export default HomeLink