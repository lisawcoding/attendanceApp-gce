import React from 'react';
import { NavLink } from "react-router-dom";
import { BiHome } from "react-icons/bi";
import { RiTeamLine } from "react-icons/ri";
import { AiOutlineUserAdd } from "react-icons/ai";
import { HiUserCircle } from "react-icons/hi";
import Logout from "../Common/Logout";
import "./IconLink.scss";

export const HomeLink = () => {
  return (
    <NavLink exact to="/home" activeClassName="nav-active">
        <div>
            <BiHome />
            <h2>home</h2>
        </div>
    </NavLink>
  )
}

export const AllEmployeesLink = () => {
  return (
    <NavLink exact to="/employees" activeClassName="nav-active">
      <div >
          <RiTeamLine />
          <h2>show all employees</h2>
      </div>
    </NavLink>    
  )
}

export const CreateEmployeeLink = () => {
  return (
    <NavLink exact to="/employee/create" activeClassName="nav-active">
      <div>
          <AiOutlineUserAdd />
          <h2>create new employee</h2>
      </div>
    </NavLink>    
  )
}
export const UserLink = () => {
  return(
    <NavLink to="/user" activeClassName="nav-active" className="icon-bottom user-icon">
      <div>
          <HiUserCircle />
          <h2>my account</h2>
      </div>
    </NavLink>    
  )
}

export const LogoutLink= () => {

  return(
    <NavLink to="/">
      <div>
        <Logout />
        <h2>logout</h2>        
      </div>
    </NavLink>    
  )
}




