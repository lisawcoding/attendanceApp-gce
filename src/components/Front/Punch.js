import React, { useState, useEffect, useContext, useLayoutEffect } from "react";

import "./Punch.scss";
import PunchCamera from "./PunchCamera";
import { DataContext } from "../../contexts/DataContext";
import { FunctionContext } from "../../contexts/FunctionContext";

function Punch(props) {
     const { thisUser, allEmployees } = useContext(DataContext);
     const { fetchUser } = useContext(FunctionContext);
     const [timer, setTimer] = useState(new Date());
     const [thisEmployee, setThisEmployee] = useState(null);
     const [punch, setPunch] = useState({
          status: "in",
     });

     useEffect(async () => {
          fetchUser()

          var sec = 60 - new Date().getSeconds();
          const firstTimer = await setInterval(() => {
               clearInterval(firstTimer);
          }, sec * 1000);
     }, []);

     useEffect(() => {
          const timerInterval = setInterval(() => setTimer(new Date()), 1000);

          return () => {
               clearInterval(timerInterval);
               window.location.reload();
          };
     }, []);

     const clickClockInOutBtn = (e) => setPunch({ ...punch, [e.target.name]: e.target.value });

     const onSubmit= e => {
          e.preventDefault()
     }

     return (
          <div id="Punch">
               <section className="left-div">
                    <div className="time-div">
                         <h1 className="date">{new Date().toDateString()}</h1>
                         <h1 className="timer">{timer.toTimeString("en-US").slice(0, 8)}</h1>
                    </div>
                    <div className="wrapper">
                         <input type="radio" name="status" id="option-1" onClick={clickClockInOutBtn} value="in" defaultChecked="checked" />
                         <input type="radio" name="status" id="option-2" onClick={clickClockInOutBtn} value="out" />
                         <div></div>
                         <label htmlFor="option-1" className="option option-1">
                              in
                         </label>
                         <label htmlFor="option-2" className="option option-2">
                              out
                         </label>
                    </div>
                    {thisUser.setting && (
                         <p>
                              Office hours are {thisUser.setting.timeIn} to {thisUser.setting.timeOut}
                         </p>
                    )}
               </section>
               <form className="right-div" onSubmit={onSubmit}>

                    {/* <BiPlayCircle/> */}
                   { allEmployees && <PunchCamera thisEmployee={thisEmployee} setThisEmployee={setThisEmployee} timer={timer} punch={punch} thisUser={thisUser} />}
               </form>
          </div>
     );
}

export default Punch;