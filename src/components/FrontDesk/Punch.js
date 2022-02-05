import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Punch.scss";
import PunchCamera from "./PunchCamera";
import Timer from "./Timer";
import { DataContext } from "../../contexts/DataContext";
import { FunctionContext } from "../../contexts/FunctionContext";
import { BiHome } from "react-icons/bi";
import Logout from "../Common/Logout";

function Punch(props) {
     const { thisUser, allEmployees } = useContext(DataContext);
     const { fetchUser, logout } = useContext(FunctionContext);
     const [ punch, setPunch ] = useState({
          status: "in",
     });

     useEffect(() => {
          fetchUser(props);
     }, []);

     const clickClockInOutBtn = (e) => setPunch({ ...punch, [e.target.name]: e.target.value });

     return (
          <div id="Punch">
               <section className="left-div">
                    <Timer />
                    <div className="wrapper">
                         <input type="radio" name="status" id="option-1" onClick={clickClockInOutBtn} value="in" defaultChecked="checked" />
                         <input type="radio" name="status" id="option-2" onClick={clickClockInOutBtn} value="out" />
                         <label htmlFor="option-1" className="option option-1"> in </label>
                         <label htmlFor="option-2" className="option option-2"> out </label>
                    </div>
                    {thisUser.setting && <p> Office hours are {thisUser.setting.timeIn} to {thisUser.setting.timeOut} </p>}
                    <div>
                         <NavLink exact to="/home" activeClassName="nav-active" className="logout-btn">
                                   <BiHome />
                                   <h2>home</h2>
                         </NavLink>
                         <Logout props={props} />                         
                    </div>

               </section>
               <section className="right-div">
                   { allEmployees && <PunchCamera punch={punch} thisUser={thisUser} />}
               </section>
          </div>
     );
}

export default Punch;