import React, { useState, useRef, createRef, useEffect, useContext } from 'react';
import { 
    Link,
} from 'react-router-dom';
import * as faceapi from 'face-api.js';

import "../styles/File_model.scss";
import "../styles/Punch.scss";
import { BiCamera } from 'react-icons/bi';
import { InitContext } from '../contexts/InitContext';
import FaceCamera from './FaceCamera';
import FaceFind from './FaceFind';

function Punch (props) {
    const [ isChecked, setIsChecked ] = useState( false );
    const [ timer, setTimer] = useState(new Date())

    // useEffect( async() => {
    //     var sec =  60 - new Date().getSeconds();
    //     const firstTimer = await setInterval(()=>{
    //         clearInterval(firstTimer)
    //     }, sec * 1000)
    // }, [])

    useEffect(()=>{
        const timerInterval = setInterval(() => {
            console.log("timer")
            setTimer( new Date())
        }, 1000)

        return () => {
            clearInterval(timerInterval)
        }
    }, [])

    return (
        <div id="Punch" className="file-outter">
            <form  id="File_model" encType="multipart/form-data">
                <section className="time-div">
                    <h1>{new Date().toLocaleDateString()}</h1>
                    {/* <h2 className="time" >{new Date().toLocaleTimeString("en-US")}</h2> */}
                    <h2>{timer.toLocaleTimeString("en-US")}</h2>
                </section>
                <section className="img-wrapper" >    
                    <Link to="/facecamera"><BiCamera className="BiCamera" /></Link>  <img src="" />
                </section>
                
                <section className="info-div">
                    <label>
                        <input type="text" name="name" placeholder="name" autoComplete="off" disabled={isChecked}/>
                    </label>
                    <label>
                        <input type="text" name="id" placeholder="id" disabled={isChecked}/>
                    </label>
                    <label>
                        <input type="password" name="password" placeholder="password" required disabled={isChecked}/>
                    </label>
                    <div className="btn-div">
                        <input type="submit" value="clock in"/> 
                        <input type="submit" value="clock out"/>
                    </div>                       
                    
                </section>
            </form>            
        </div>
    )
}

export default Punch;