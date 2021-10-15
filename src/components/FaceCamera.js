import React, { useState, useRef, createRef, useEffect, useContext } from 'react';
import * as faceapi from 'face-api.js';
import { 
    Link,
    NavLink,
    withRouter
} from 'react-router-dom';

import "../styles/FaceCamera.scss"
// import "../styles/File_model.scss";
import { AiOutlineStop } from 'react-icons/ai';
import { GiCarnivorousPlant, GiConfirmed, GiConsoleController } from 'react-icons/gi';
import { BiDirections } from 'react-icons/bi';
import { InitContext } from '../contexts/InitContext';
import File_model from './File_model';
import { padToSquare } from 'face-api.js';
import { BiCamera } from 'react-icons/bi';
import { FiCheck } from 'react-icons/fi';
import { GiCancel } from 'react-icons/gi';


function FaceCamera (props) {
    const videoRef = useRef();
    const canvasRef = useRef();
    const videoBoxRef = useRef();
    const imgRef =  useRef();
    const { imageBase64, setImgBase64 } = useContext(InitContext)
    const [pause, setPause] = useState( false )
    const [isPlay, setIsPlay] = useState( false )

    useEffect(()=>{

        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            // faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            // faceapi.nets.faceExpressionNet.loadFromUri('/models')
            ])
            .then(val => console.log(val))
            // .then(startVideo)  

        }, [])

    const startVideo = () => {
        setImgBase64("")
        navigator.mediaDevices.getUserMedia({video: true})
        .then( stream => videoRef.current.srcObject = stream)
        .catch( err => console.log(err));
    }

    let faceapiInterval;
    let displaySize;
    const onPlay = async () => {
        console.log("onPlay")
        setIsPlay(true)
        setPause(false)
        
        const displaySize = { width: videoRef.current.videoWidth, height: videoRef.current.videoHeight }
        console.log(displaySize)
        console.log(videoRef)
        faceapi.matchDimensions(canvasRef.current, displaySize)

        // faceapiInterval = setInterval(async () => {
        //     const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        //     const resizedDetections = faceapi.resizeResults(detections, displaySize)
        //     canvasRef.current.getContext('2d').clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        //     faceapi.draw.drawDetections(canvasRef.current, resizedDetections)
        //     console.log(detections)

        //     if(detections.length===1 && detections[0]._score > 0.65 ) capture()

        // }, 100)
    }

    const capture = async() => {
        await clearInterval(faceapiInterval)
        await canvasRef.current.getContext("2d").drawImage(videoRef.current, 0, 0)
        console.log(canvasRef.current.toDataURL("image/jpeg", 0.5))
        await setImgBase64(canvasRef.current.toDataURL("image/jpeg", 0.5))
        setPause(true)
        setIsPlay( false )
    }

    const stopVideo = () => {
        const stream = videoRef.current.srcObject;
        if ( stream === null) return
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }



    return (
        <section className="video-box" ref={videoBoxRef}  onPlay={onPlay} >

            <video id="video" autoPlay muted ref={videoRef} paused={pause.toString()} className={ isPlay ? "video-frame" : undefined} ></video>
            <canvas ref={canvasRef} ></canvas>   
            {/* { pause === true && <img src={imageBase64} style={displaySize} />} */}
             
            { pause && 
            <>
             <img src={imageBase64} style={displaySize} />
                <div className="btn-div">
                    <Link to="/create_employee" onClick={stopVideo}><GiConfirmed className="red" /></Link>  
                    <GiCancel onClick={onPlay} className="green" />
                </div>  
            </>
            }

            { !isPlay && !pause &&
                <div className="camera-loader-div">
                    <BiCamera className="BiCamera" /> 
                    <div className="lds-ellipsis"><div></div><div></div><div></div></div>
                </div>
            }
            
        </section>
    )
}

export default FaceCamera;


    // const changeImgInput = e => {
    //     console.log(e.target)
    //     console.log(e.target.files[0].size)
    //     if(e.target.files[0].size > 1006300) {
    //         alert("image size exceed")
    //     } else {
    //         e.target.files.length>0 && setFile(URL.createObjectURL(e.target.files[0]));
    //         props.changeInput()
    //     }
    // }


    // Promise.all([
    //     faceapi.nets.tinyFaceDetector.load('/models'),
    //     faceapi.nets.faceLandmark68Net.load('/models'),
    //     faceapi.nets.faceRecognitionNet.load('/models'),
    // ])
    // .then(val => {
    //     console.log(val)
    //     const displaySize = { width: videoRef.current.videoWidth, height: videoRef.current.videoHeight}
    //     faceapi.matchDimensions(canvasTopRef.current, displaySize)
    //     setInterval(async() => {
    //         const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
    //         .withFaceLandmarks()
    //         const resizedDetections = faceapi.resizeResults(detections, displaySize)
    //         canvasTopRef.current.getContext("2d").clearRect(0, 0, canvasTopRef.current.width, canvasTopRef.current.height)
    //         faceapi.draw.drawDetections(canvasTopRef.current, resizedDetections)
    //         faceapi.draw.drawFaceLandmarks(canvasTopRef.current, resizedDetections)
    //         console.log(detections)
    //     }, 100)
    // })
    // .catch(err => console.error(err))