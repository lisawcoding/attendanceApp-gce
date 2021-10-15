import React, { useState, useRef, createRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';
import { v4 as uuidv4 } from 'uuid';

import "../styles/File_model.scss";
import { ImFolderUpload, ImGift } from 'react-icons/im';
import emma002 from '../images/emma002.jpg';
import two from '../images/two.jpg';
import { BiCamera } from 'react-icons/bi';
import { AiOutlineStop } from 'react-icons/ai';
import { GiCarnivorousPlant, GiConfirmed, GiConsoleController } from 'react-icons/gi';

function File_model (props) {
    const videoRef = useRef();
    const canvasRef = useRef();
    const imgInputRef = useRef();
    const imgBoxRef = useRef();
    const videoBoxRef = useRef();
    const imgRef =  useRef();
    const [ waiting, setWaiting ] = useState(false)

    // const changeImgInput = async() => {
    //     const imgFile = imgInputRef.current.files[0]
    //     const img = await faceapi.bufferToImage(imgFile)

    //     imgBoxRef.current.append(img);
    //     const canvasTop = faceapi.createCanvasFromMedia(img)
    //     imgBoxRef.current.append(canvasTop)
    //     const displaySize={width: img.width, height: img.height}
    //     faceapi.matchDimensions(canvasTop, displaySize)
    //     imgRef.current.width  = videoRef.current.videoWidth;
    //     imgRef.current.height = videoRef.current.videoHeight;


    //     Promise.all([
    //         faceapi.nets.ssdMobilenetv1.load('/models'),
    //         faceapi.nets.faceLandmark68Net.load('/models'),
    //         faceapi.nets.faceRecognitionNet.load('/models')
    //     ])
    //     .then( () => recognizeFace(imgRef))
    //     .catch(err => console.error(err))
    // }

    // const recognizeFace1 = async(img, canvasTop, displaySize) => {
    //     console.log('reconginizeFace')
    //     const detections = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors()
    //     const resizedDetections = faceapi.resizeResults(detections, displaySize);
    //     resizedDetections.forEach(detection => {
    //         const box=detection.detection.box;
    //         const drawBox = new faceapi.draw.DrawBox(box, {
    //             label: "face"
    //         })
    //         drawBox.draw(canvasTop)
    //     })
    // }

    async function startVideo (e) {

        await navigator.mediaDevices.getUserMedia({video: true})
        .then(function(stream) {
            console.log(videoRef)
            videoRef.current.srcObject = stream;
        })
        .catch(function(err) {
            console.log(err)
        });
    }

    function stopVideo () {
        const stream = videoRef.current.srcObject;
        if ( stream === null) return
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }

    async function screenShot () {
        setWaiting(true)
        canvasRef.current.width  = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        await canvasRef.current.getContext("2d").drawImage(videoRef.current, 0, 0)

        props.uploadPhoto(canvasRef.current.toDataURL("image/jpeg", 0.5))
        stopVideo()

        Promise.all([
            faceapi.nets.ssdMobilenetv1.load('/models'),
            faceapi.nets.faceLandmark68Net.load('/models'),
            faceapi.nets.faceRecognitionNet.load('/models')
        ])
        .then( val => {{
            console.log(val)
            recognizeFace(canvasRef)
        }})
        .catch(err => console.error(err))
    }

        const recognizeFace = async(image) => {
            const detections = await faceapi.detectAllFaces(image.current).withFaceLandmarks().withFaceDescriptors()
            // const detections = await faceapi.detectAllFaces(canvasRef.current)
            const displaySize = {width:500, height: 500 }
            const resizedDetections = faceapi.resizeResults(detections, displaySize);
            resizedDetections.forEach(detection => {
                const box=detection.detection.box;
                const drawBox = new faceapi.draw.DrawBox(box, {
                    label: "face"
                })
                drawBox.draw(image.current)
            })
            console.log(detections)
            setWaiting(false)

            // const detection = await faceapi.detectSingleFace(videoRef.current)
            // const displaySize={width:500, height: 500 }
            // const resizedDetection = faceapi.resizeResults(detection, displaySize);
            // resizedDetection.forEach(detection => {
            //     const box=detection.detection.box;
            //     const drawBox = new faceapi.draw.DrawBox(box, {
            //         label: "face"
            //     })
            //     drawBox.draw(canvasRef.current)
            // })
            // console.log(detection)
            // setWaiting(false)
        }

    return (
        <div>
            {/* <img ref={imgRef} src={two} /> */}
            <form  onSubmit={props.submitForm} id="File_model" encType="multipart/form-data">

                    {/* <div>
                        <div ref={imgBoxRef} className="img-box" style={{position: "relative"}} >
                            <img ref={imgRef} />
                        </div>
                        <label htmlFor="upload-img" className="upload-btn-wrapper">
                            <ImFolderUpload />
                            <input id="upload-img" type="file" accept="image/*" placeholder="image" name="image" onChange={changeImgInput} ref={imgInputRef} />
                        </label>                        
                    </div> */}
                    
                <section className="camera-div">
                    <div className="video-box" ref={videoBoxRef}>
                        <video id="video" autoPlay muted ref={videoRef}></video>
                        <canvas ref={canvasRef} ></canvas>                                
                    </div>
                    <div className="btn-div">
                        <BiCamera onClick={startVideo} />
                        <AiOutlineStop onClick={stopVideo} />
                        <GiConfirmed onClick={screenShot} />                            
                    </div>
                </section>

                <section className="info-div">
                    <label> <span>name</span>
                        <input type="text" name="name" disabled={props.isAdded} onChange={props.changeInput} required={true} placeholder="name" autoComplete="off" />
                    </label>
                    <label> <span>employee id</span>
                        <input type="text" name="id" disabled={props.isAdded} onChange={props.changeInput} placeholder="id" />
                    </label>
                    <label> <span>password</span>
                        <input type="password" name="password" disabled={props.isAdded} onChange={props.changeInput} placeholder="password" required/>
                    </label>                       
                    <label> <span>phone number</span>
                        <input type="tel" name="tel" disabled={props.isAdded} onChange={props.changeInput} placeholder="phone number"/>
                    </label>
                    <label> <span>remark</span>
                        <input type="text" name="remark" disabled={props.isAdded} onChange={props.changeInput} placeholder="remark" />
                    </label> 
                    <label> <span>date</span>
                        <input type="date" name="date" disabled={props.isAdded} onChange={props.changeInput} placeholder="date" value={props.elm.date} />
                    </label> 
                    { props.isAdded === false && <input type="submit" value="confirm"/> }
                   
                </section>
                <div className={waiting ? "overlay" : undefined}></div>
            </form>            
        </div>


    )
}

export default File_model;


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