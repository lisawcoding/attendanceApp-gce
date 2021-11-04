import React, { useState, useRef, createRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import * as faceapi from "face-api.js";

import "./Punch.scss";
import { BiCamera } from "react-icons/bi";
import Camera from "./Camera";

function Punch(props) {
     const [isChecked, setIsChecked] = useState(false);

     const [timer, setTimer] = useState(new Date());

     // useEffect( async() => {
     //     var sec =  60 - new Date().getSeconds();
     //     const firstTimer = await setInterval(()=>{
     //         clearInterval(firstTimer)
     //     }, sec * 1000)
     // }, [])

     useEffect(() => {
          const timerInterval = setInterval(() => {
               console.log("timer");
               setTimer(new Date());
          }, 1000);

          return () => {
               clearInterval(timerInterval);
               window.location.reload();
          };
     }, []);

     return (
          <div id="Punch">
               <section className="left-div">
                    <div>
                         <h1>{new Date().toLocaleDateString()}</h1>
                         <h2>{timer.toLocaleTimeString("en-US")}</h2>
                    </div>
               </section>
               {/* <section> */}
               <form className="right-div">
                    {/* <div className="img-wrapper"> */}
                    <Camera timer={timer} />
                    {/* </div> */}
                    {/* <div>
                         <label>
                              <input type="text" name="name" placeholder="name" autoComplete="off" disabled={isChecked} />
                         </label>
                         <label>
                              <input type="text" name="id" placeholder="id" disabled={isChecked} />
                         </label>
                         <label>
                              <input type="password" name="password" placeholder="password" required disabled={isChecked} />
                         </label>
                         <div className="btn-div">
                              <input type="submit" value="clock in" />
                              <input type="submit" value="clock out" />
                         </div>
                    </div> */}
               </form>
               {/* </section> */}
          </div>
     );
}

export default Punch;
