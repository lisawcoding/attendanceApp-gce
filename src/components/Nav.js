import React, { useState} from 'react';
import { 
    NavLink,
    withRouter
} from 'react-router-dom';

import { BiHome } from 'react-icons/bi';
import { RiTeamLine } from 'react-icons/ri';
import { AiOutlineUserAdd } from 'react-icons/ai';
import '../styles/Nav.scss';

function Nav () {

    return (
        <nav>
            <NavLink exact to="/" activeClassName="nav-active">
                <BiHome />
            </NavLink>
            <NavLink exact to="/show_all_employees" activeClassName="nav-active">
                <RiTeamLine />show_all_employees
            </NavLink>
            <NavLink exact to="/create_employee"  activeClassName="nav-active">
                <AiOutlineUserAdd />create_employee
            </NavLink>
            <NavLink exact to="/facecamera"  activeClassName="nav-active">
                faceCamera
            </NavLink>
            <NavLink exact to="/punch" activeClassName="nav-active">
                Punch
            </NavLink>
            <NavLink exact to="/facefind" activeClassName="nav-active" >
                faceFind
            </NavLink>
        </nav>
    )
}

export default withRouter(Nav);