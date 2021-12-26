import React, { useState, useEffect, useContext } from "react";

import "./Punch.scss";
import PunchCamera from "./PunchCamera";
import Timer from "./Timer";
import { DataContext } from "../../contexts/DataContext";
import { FunctionContext } from "../../contexts/FunctionContext";
import { RiLogoutBoxRLine } from "react-icons/ri";

function Punch(props) {
     const { thisUser, allEmployees } = useContext(DataContext);
     const { fetchUser, logout } = useContext(FunctionContext);
     const [ punch, setPunch ] = useState({
          status: "in",
     });

     useEffect(() => {
          fetchUser(props)
          return () => {
               window.location.reload();
               // logout(props)
          }
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
                    {thisUser.setting && <p> Office hours are {thisUser.setting.timeIn} to {thisUser.setting.timeOut} </p> }
                    <div onClick={() => logout(props)} className="logout-btn">
                         <RiLogoutBoxRLine/>
                         <h2>logout</h2>
                    </div>
               </section>
               <section className="right-div">
                   { allEmployees && <PunchCamera punch={punch} thisUser={thisUser} />}
               </section>
          </div>
     );
}

export default Punch;