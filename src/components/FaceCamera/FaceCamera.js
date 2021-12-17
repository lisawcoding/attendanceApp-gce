import React, { useState, useRef, useEffect } from "react";
import * as faceapi from "face-api.js";
import { withRouter } from "react-router-dom";
import { GiConfirmed, GiCancel } from "react-icons/gi";
import "./FaceCamera.scss";
import { CameraLoader } from "./CameraLoader";

const FaceCamera = ({thisEmployee, setThisEmployee}) => {
     const [isPause, setIsPause] = useState(false);
     const [isPlay, setIsPlay] = useState(false);
     const [isConfirm, setIsConfirm] = useState(false)     
     const [alert, setAlert] = useState([]);
     const [cameraSize, setCameraSize] = useState({ width: 0, height: 0 });
     const videoRef = useRef();
     const canvasRef = useRef();

     useEffect(()=>{
          // return
          Promise.all([
               faceapi.nets.tinyFaceDetector.loadFromUri("../../models"),
               faceapi.nets.faceRecognitionNet.loadFromUri("../../models")
          ])
          .then(startVideo);

          return()=>{
               window.location.reload()
          }
     }, [])

     let faceapiInterval;
     const onPlay = async () => {
          console.log("onPlay");
          setIsPlay(true);
          setIsPause(false);
          videoRef.current.play()

          // const displaySize = { width: videoRef.current.videoWidth, height: videoRef.current.videoHeight };
          setCameraSize({ width: videoRef.current.videoWidth, height: videoRef.current.videoHeight });
          faceapiInterval = setInterval(async () => {
               const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions());
               if (detections.length > 1) {
                    setAlert([...alert, "there are more than one person in the camera, only one person allowed"]);
               } else {
                    setAlert([]);
                    // const resizedDetections = faceapi.resizeResults(detections, displaySize);
                    // canvasRef.current.getContext("2d").clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                    // faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
                    if (detections.length === 1 && detections[0]._score > 0.5) capture();
               }
               console.log(detections);
          }, 350);
     };

     const startVideo = () => {
          navigator.mediaDevices
               .getUserMedia({ video: true })
               .then((stream) => {
                    if (stream == null) return setIsPlay(false);
                    videoRef.current.srcObject = stream;
                    return;
               })
               .catch((err) => {
                    console.log(err);
                    setAlert([...alert, "could not start video, please check your device setting"]);
               });
     };

     const stopVideo = () => {
          setIsConfirm(true)

          const stream = videoRef.current.srcObject;
          if (stream === null) return;
          const tracks = stream.getTracks();
          tracks.forEach((track) => track.stop());
          videoRef.current.srcObject = null;
     };

     const capture = async () => {
          clearInterval(faceapiInterval);
          videoRef.current.pause()

          await canvasRef.current.getContext("2d").drawImage(videoRef.current, 0, 0);
          await setThisEmployee({ ...thisEmployee, image: canvasRef.current.toDataURL("image/jpeg", 0.5) });
          setIsPause(true);
          setIsPlay(false);
     };

     return (
          <section className="video-box" onPlay={onPlay} style={{display: isConfirm? "none" : ""}}>
               <video id="video" autoPlay muted ref={videoRef} className="video-frame"></video>
               <canvas ref={canvasRef} width={cameraSize.width} height={cameraSize.height}></canvas>
               {isPause && (
                    <>
                         {/* <img src={thisEmployee.image} style={cameraSize} /> */}
                         <div className="btn-div" style={cameraSize}>
                              <GiConfirmed className="green" onClick={stopVideo} />
                              <GiCancel onClick={onPlay} className="red" />
                         </div>
                    </>
               )}
               {!isPlay && !isPause && <CameraLoader/>}
               {alert.length > 0 && alert.map((elm, i) => <h1 className="alert-text" key={`alert-${i}`}>{elm}</h1>)}
          </section>
     );
};

export default withRouter(FaceCamera);