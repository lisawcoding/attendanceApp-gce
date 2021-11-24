import React, { useState, useContext, useLayoutEffect } from "react";
import { NavLink, withRouter } from "react-router-dom";

import { BiHome } from "react-icons/bi";
import { RiTeamLine } from "react-icons/ri";
import { AiOutlineUserAdd } from "react-icons/ai";
import "./Nav.scss";
import { FunctionContext } from "../contexts/FunctionContext";
import { URLContext } from "../contexts/URLContext";
import { DataContext } from "../contexts/DataContext";
import { HiUserCircle } from "react-icons/hi";

function Nav(props) {
     const { usersURL, getUserURL } = useContext(URLContext);
     const { reIssueToken, logout } = useContext(FunctionContext);
     const { thisUser, setThisUser,setAllEmployees, isLoading, setIsLoading, isReload, setIsReload } = useContext(DataContext);
     const [isUserDropdown, setIsUserDropdown] = useState(false);

     const getEmployees = (data) => {
          console.log(usersURL);
          fetch(`${usersURL}/${data._id}/employees`, {})
               .then((res) => res.json())
               .then(async (data) => {
                    console.log(data);
                    if (data.error) {
                         reIssueToken(props);
                    } else {
                         await setAllEmployees(data);
                         setIsLoading(false);
                    }
               })
               .catch((err) => console.error(err));
     };

     const fetchUser = () => {
          fetch(getUserURL, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
               },
          })
               .then((res) => res.json())
               .then(async (data) => {
                    console.log(data);
                    if (data.error) {
                         await reIssueToken(props);
                         fetchUser();
                         return;
                    } else {
                         delete data.password;
                         setThisUser(data);
                         getEmployees(data);
                         // setIsReload(!isReload)
                    }
               })
               .catch((err) => console.error(err));
     };

     useLayoutEffect(() => {
          fetchUser();
     }, [isReload]);

     const clickUserIcon = () => setIsUserDropdown(!isUserDropdown);

     return (
          <>
               <div className="loader-wrapper" style={{ display: isLoading ? "flex" : "none" }}>
                    <div className="loader"></div>
               </div>
               <nav style={{ display: props.match.path === "/puch" && "none" }}>
                    <div className="link-div">
                         <NavLink exact to="/home" activeClassName="nav-active">
                              <BiHome />
                         </NavLink>
                         <NavLink exact to="/employees" activeClassName="nav-active">
                              <RiTeamLine />
                              all employees
                         </NavLink>
                         <NavLink exact to="/employees/create" activeClassName="nav-active">
                              <AiOutlineUserAdd />
                              create_employee
                         </NavLink>
                    </div>

                    {thisUser && (
                         <section className="user-div" onClick={clickUserIcon}>
                              <HiUserCircle />
                              {thisUser.name}
                              <div className="user-dropdown" style={{ display: isUserDropdown ? "block" : "none" }}>
                                   <NavLink to="/user" className="user-link" activeClassName="nav-active">
                                        my account
                                   </NavLink>
                                   <div className="user-link" onClick={() => logout(props)}>
                                        logout
                                   </div>
                              </div>
                         </section>
                    )}
               </nav>
          </>
     );
}

export default withRouter(Nav);