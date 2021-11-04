import React, { useState, useRef, createRef, useEffect, useContext, useLayoutEffect, forwardRef } from "react";
import * as faceapi from "face-api.js";
import { Link, withRouter } from "react-router-dom";

import { GiConfirmed, GiCancel } from "react-icons/gi";
import { InitContext } from "../../contexts/InitContext";
import "./Camera.scss";
// import { CameraLoader } from "./CameraLoader";
import { DataContext } from "../../contexts/DataContext";

const FaceCamera = (props, ref) => {
     // const { thisEmployee, setThisEmployee } = useContext(DataContext);
     // const { imageBase64, setImgBase64 } = useContext(InitContext);
     const [pause, setPause] = useState(false);
     const [isPlay, setIsPlay] = useState(false);
     const [mediaTest, setMediaTest] = useState(null);
     const [alert, setAlert] = useState([]);
     const [cameraSize, setCameraSize] = useState({ width: 0, height: 0 });
     const videoRef = useRef();
     const canvasRef = useRef();
     const [thisEmployee, setThisEmployee] = useState({ log: "clockIn" });

     let faceapiInterval;
     const onPlay = async () => {
          console.log("onPlay");
          setIsPlay(true);
          setPause(false);

          // const displaySize = { width: videoRef.current.videoWidth, height: videoRef.current.videoHeight };
          const displaySize = { width: videoRef.current.clientWidth, height: videoRef.current.clientHeight };
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
                    if (detections.length === 1 && detections[0]._score > 0.5) {
                         capture();
                         stopVideo();
                    }
               }
               // if (videoRef.current.autoPlay === false) clearInterval(faceapiInterval);
               console.log(detections);
          }, 350);
     };

     useEffect(() => {
          // return;
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
          // return;

          // setThisEmployee({ ...thisEmployee, image: "" });

          navigator.mediaDevices
               .getUserMedia({ video: true })
               .then((stream) => {
                    if (stream == null) return setIsPlay(false);
                    videoRef.current.srcObject = stream;
                    return;
               })
               .catch((err) => {
                    setMediaTest("could not start video, please check your device setting");
                    console.log(err);
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
     };

     const capture = async () => {
          clearInterval(faceapiInterval);

          await canvasRef.current.getContext("2d").drawImage(videoRef.current, 0, 0);
          console.log(canvasRef.current.toDataURL("image/jpeg", 0.5));
          // await setImgBase64(canvasRef.current.toDataURL("image/jpeg", 0.5));
          await setThisEmployee({ ...thisEmployee, image: canvasRef.current.toDataURL("image/jpeg", 0.5), time: props.timer.toString() });
          setPause(true);
          setIsPlay(false);
     };

     return (
          <section id="Camera" onPlay={onPlay}>
               <video id="video" autoPlay muted ref={videoRef} paused={pause.toString()}></video>
               <canvas ref={canvasRef} width={cameraSize.width} height={cameraSize.height}></canvas>

               {pause && (
                    <>
                         <img src={thisEmployee.image} style={cameraSize} />
                         {/* <div className="btn-div" style={cameraSize}>
                              <GiConfirmed className="green" onClick={stopVideo} />
                              <GiCancel onClick={onPlay} className="red" />
                         </div> */}
                    </>
               )}
               {/* {!isPlay && !pause && <CameraLoader mediaTest={mediaTest} />} */}

               {alert.length > 0 && alert.map((elm) => <h1 className="alert-text">{elm}</h1>)}
               {thisEmployee.image && (
                    <div className="detail">
                         <h1>{thisEmployee.log}</h1>
                         <h1>time: {thisEmployee.time}</h1>
                    </div>
               )}
          </section>
     );
};

export default withRouter(FaceCamera);

// import React, { forwardRef } from "react";

// const FaceCamera = forwardRef((props, ref) => {
//      return <input type="text" value="hello" ref={ref} readOnly />;
// });

// export default FaceCamera;
