import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiFillPhone } from 'react-icons/ai';
import { MdDateRange } from 'react-icons/md';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineFieldNumber } from 'react-icons/ai';
import { FcBusinessman } from 'react-icons/fc'

import Input_model from './Input_model';
import '../styles/Card_model.scss';

function Card_model (props) {

    // const toCanvas = () => {
    //     var url='../images/emma002.jpg'
    //     var canvas = document.querySelector('canvas');
    //     var dataURL = canvas.toDataURL();
    //     console.log(dataURL); 
    //     setDataUrl(dataURL)
    //     // var newdata=toDataURL(url, 0.5)
    //     // console.log()
    // }

    const tryRequire = (path) => {
        try {
            console.log(path)
            return require(`../images/${props.elm.name}${props.elm.id}.jpg`).default
        } catch (err){
            return require(`../images/fox.png`).default
        }
    }

    return(
        <div id="Card_model">
            <Link to={`/show_all_employees/${props.elm._id}`}>
                <h1>{props.elm.name}</h1>
                <div className="img-wrapper">
                    {/* <img src={tryRequire(`../images/${props.elm.name}${props.elm.id}.jpg`)} alt={`${props.elm.name}'s image`} /> */}
                    {/* <img src={require(`../images/${props.elm.name}${props.elm.id}.jpg`).default} /> */}
                    <img src={props.elm.image} />
                    {/* <img src={require(`../images/${props.elm.name}${props.elm.id}.jpg`).default} /> */}
                </div>
                {/* <div className="info-div">
                    <p><AiOutlineFieldNumber title="employee id"/> {props.elm.id}</p>
                    <p><BsFillPersonLinesFill title="job title" /> {props.elm.position}</p>
                    <p><AiFillPhone title="phone" /> {props.elm.phone}</p>
                    <p><MdDateRange title="date"/> {props.elm.date}</p>
                    <p>{props.elm._id}</p>
                    <div><GiHamburgerMenu title="remark" /> {props.elm.remark}</div>                
                </div> */}
            </Link>            
        </div> 
    )
}

export default Card_model;