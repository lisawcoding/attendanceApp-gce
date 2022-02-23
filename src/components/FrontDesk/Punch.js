import React, { useState, useEffect, useContext } from "react";
import "./Punch.scss";
import PunchCamera from "./PunchCamera";
import Timer from "./Timer";
import { DataContext } from "../../contexts/DataContext";
import { FunctionContext } from "../../contexts/FunctionContext";
import { HomeLink, LogoutLink } from "../Common/IconLinks";

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
                         <HomeLink />
                         <LogoutLink />                     
                    </div>
               </section>
               <section className="right-div">
                    {console.log(allEmployees)}
                   { allEmployees && (allEmployees.length>0 ? <PunchCamera punch={punch} thisUser={thisUser} /> : 
                    <h1 title="there is no employee's record, please create a new employee">no employee's record<HomeLink/></h1>)}
               </section>
          </div>
     );
}

export default Punch;