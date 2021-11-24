import React, { useState, useRef, createRef, useEffect, useContext, useLayoutEffect, forwardRef } from "react";
import * as faceapi from "face-api.js";
import { Link, withRouter } from "react-router-dom";

import { GiConfirmed, GiCancel } from "react-icons/gi";
import { InitContext } from "../../contexts/InitContext";
import "./FaceCamera.scss";
import { CameraLoader } from "./CameraLoader";

const FaceCamera = ({thisEmployee, setThisEmployee, setIsCamera}) => {
     const [pause, setPause] = useState(false);
     const [isPlay, setIsPlay] = useState(false);
     const [mediaTest, setMediaTest] = useState(null);
     const [alert, setAlert] = useState([]);
     const [cameraSize, setCameraSize] = useState({ width: 0, height: 0 });
     const videoRef = useRef();
     const canvasRef = useRef();

     let faceapiInterval;
     const onPlay = async () => {
          console.log("onPlay");
          setIsPlay(true);
          setPause(false);

          const displaySize = { width: videoRef.current.videoWidth, height: videoRef.current.videoHeight };
          setCameraSize({ width: videoRef.current.videoWidth, height: videoRef.current.videoHeight });
          faceapiInterval = setInterval(async () => {
               const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions());
               if (detections.length > 1) {
                    setAlert([...alert, "there are more than one person in the camera, only one person allowed"]);
               } else {
                    setAlert([]);
                    const resizedDetections = faceapi.resizeResults(detections, displaySize);
                    canvasRef.current.getContext("2d").clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                    faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
                    if (detections.length === 1 && detections[0]._score > 0.5) capture();
               }
               // if (videoRef.current.autoPlay === false) clearInterval(faceapiInterval);
               console.log(detections);
          }, 350);
     };

     useEffect(() => {
          Promise.all([
               faceapi.nets.tinyFaceDetector.loadFromUri("../../models"),
               faceapi.nets.faceRecognitionNet.loadFromUri("../../models"),
               // faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
               // faceapi.nets.faceExpressionNet.loadFromUri("/models"),
          ]).then(startVideo);

          // return async () => {
          //      if (videoRef.current == null) {
          //           //      // await props.history.push("/employees");
          //           // window.location.reload();
          //      }
          // };
     }, []);

     const startVideo = () => {
          console.log("startVideo");

          navigator.mediaDevices
               .getUserMedia({ video: true })
               .then((stream) => {
                    if (stream == null) return setIsPlay(false);
                    videoRef.current.srcObject = stream;
                    return;
               })
               .catch((err) => {
                    setMediaTest();
                    console.log(err);
                    alert("could not start video, please check your device setting");
               });
     };

     const stopVideo = () => {
          console.log(videoRef.current);
          videoRef.current.autoPlay = false;

          const stream = videoRef.current.srcObject;
          if (stream === null) return;
          const tracks = stream.getTracks();
          tracks.forEach((track) => track.stop());
          videoRef.current.srcObject = null;

          // props.history.push("/create_employee");
          // props.setIsCamera(false);
          setIsCamera(false);
     };

     const capture = async () => {
          clearInterval(faceapiInterval);

          await canvasRef.current.getContext("2d").drawImage(videoRef.current, 0, 0);
          console.log(canvasRef.current.toDataURL("image/jpeg", 0.5));

          await setThisEmployee({ ...thisEmployee, image: canvasRef.current.toDataURL("image/jpeg", 0.5) });
          setPause(true);
          setIsPlay(false);
     };

     return (
          <section className="video-box" onPlay={onPlay}>
               <video id="video" autoPlay muted ref={videoRef} paused={pause.toString()} className="video-frame"></video>
               <canvas ref={canvasRef} width={cameraSize.width} height={cameraSize.height}></canvas>

               {pause && (
                    <>
                         <img src={thisEmployee.image} style={cameraSize} />
                         <div className="btn-div" style={cameraSize}>
                              <GiConfirmed className="green" onClick={stopVideo} />
                              <GiCancel onClick={onPlay} className="red" />
                         </div>
                    </>
               )}
               {!isPlay && !pause && <CameraLoader mediaTest={mediaTest} />}

               {alert.length > 0 && alert.map((elm) => <h1 className="alert-text">{elm}</h1>)}
          </section>
     );
};

export default withRouter(FaceCamera);

// import React, { forwardRef } from "react";

// const FaceCamera = forwardRef((props, ref) => {
//      return <input type="text" value="hello" ref={ref} readOnly />;
// });

// export default FaceCamera;
