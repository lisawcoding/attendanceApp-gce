import React, { useState, useRef, useEffect, useContext } from "react";
import * as faceapi from "face-api.js";
import { withRouter } from "react-router-dom";
import "./PunchCamera.scss";
import { CameraLoader } from "../FaceCamera/CameraLoader";
import { DataContext } from "../../contexts/DataContext";
import { URLContext } from "../../contexts/URLContext";
import { FunctionContext } from "../../contexts/FunctionContext";

const PunchCamera = (props) => {
     const { usersURL, options } = useContext(URLContext);
     const { allEmployees } = useContext(DataContext);
     const { reIssueToken } = useContext(FunctionContext);
     const [pause, setPause] = useState(false);
     const [isPlay, setIsPlay] = useState(false);
     const [alert, setAlert] = useState([]);
     const [cameraSize, setCameraSize] = useState({ width: 0, height: 0 });
     const videoRef = useRef();
     const canvasRef = useRef();
     const [labeledFaceDescriptors, setLableFaceDescriptors] = useState(null)
     

     useEffect(() => {
          Promise.all([
               faceapi.nets.tinyFaceDetector.loadFromUri("../../models"),
               faceapi.nets.faceRecognitionNet.loadFromUri("../../models"),
               faceapi.nets.faceLandmark68Net.loadFromUri("../../models"),
               faceapi.nets.ssdMobilenetv1.loadFromUri("../../models"),
          ])
          .then(async()=>{
               await labelImages()
               startVideo()
          })
          .catch(err=>{
               console.error(err)
               window.location.reload()
          })
     }, []);

     useEffect(()=>{
          pause && setTimeout(()=>{
               onPlay() 
          }, 12000)
     }, [pause])

     const labelImages = async() => {
          let employeesWithImage = allEmployees.filter((employee) => employee.image.length > 0)
          console.log(employeesWithImage)
          return Promise.all(
               employeesWithImage.map(async (employee) => {
                    const img = await faceapi.fetchImage(employee.image);
                    const detection = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
                    console.log(employee.name + " : " + detection);

                    delete employee.image;
                    if (detection != undefined) return new faceapi.LabeledFaceDescriptors(JSON.stringify(employee), [detection.descriptor]);
               })
          )
          .then(results => setLableFaceDescriptors(results))
          .catch(err=>{
               console.log("labelImages error: ", err)
               // window.location.reload()
          })
     }

     const fetchAddRecord = (url, data) => {
          fetch(url, options("POST", data))
          .then((res) => res.json())
          .then(async (data) => {
               console.log(data);
               if (data.error) {
                    await reIssueToken(props);
                    fetchAddRecord();
                    return;
               }
          })
          .catch((err) => console.error(err));
     };

     const saveInfo = (results) => {
          const parseResult = JSON.parse(results[0]._label);
          console.log(parseResult);
          props.setThisEmployee({ ...parseResult, time: props.timer.toTimeString().slice(0, 8) });

          var data = {
               name: parseResult.name,
               employee: parseResult._id,
               date: props.timer.toLocaleDateString("en-CA"),
               // date: '2021-11-22',
               date1: new Date(),
          };
          data[props.punch.status] = props.timer.toTimeString().slice(0, 8);
          
          fetchAddRecord(`${usersURL}/${parseResult.user}/employees/${parseResult._id}/records`, data);
     }

     let faceapiInterval;
     const startDetectFace = (faceMatcher, displaySize) => {
          faceapiInterval = setInterval(async () => {
               const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();
               const resizedDetections = faceapi.resizeResults(detections, displaySize);
               const results = resizedDetections.map((d) => faceMatcher.findBestMatch(d.descriptor));

               setAlert([])
               console.log("run faceapiInaterval")
               console.log(detections);
               console.log(results)
               if(detections.length == 0) return setAlert([])
               if (detections.length > 1) return setAlert([...alert, "there are more than one person in the camera, only one person allowed"]);
               if (detections.length === 1 && detections[0].detection._score > 0.5) {
                    const box = resizedDetections[0].detection.box;
                    const drawBox = new faceapi.draw.DrawBox(box, { label: results[0] });
                    drawBox.draw(canvasRef.current);

                    if(results[0]._label == "unknown") return setAlert([...alert, "cannot recongize this face"]);
                    saveInfo(results)
                    capture(); 
                    setAlert([])
               }
               if (videoRef.current.autoPlay === false) clearInterval(faceapiInterval);
          }, 350);
     }

     const onPlay = () => {
          console.log("onPlay");
          videoRef.current.play()
          setIsPlay(true);
          setPause(false);
          props.setThisEmployee(null)

          canvasRef.current.getContext('2d').clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
          
          const displaySize = { width: videoRef.current.clientWidth, height: videoRef.current.clientHeight };
          setCameraSize({ width: videoRef.current.clientWidth, height: videoRef.current.clientHeight });

          startDetectFace( faceMatcher, displaySize )
     };

     const startVideo = () => {
          console.log("startVideo");
          
          navigator.mediaDevices
               .getUserMedia({ video: true })
               .then(async (stream) => {
                    if (stream == null) return setIsPlay(false);
                    videoRef.current.srcObject = stream;
                    return;
               })
               .catch((err) => {
                    setAlert([...alert, "could not start video, please check your device setting"]);
                    console.log("startVideo error: ", err);
               });
     };

     const stopVideo = () => {
          console.log("stop")
          const stream = videoRef.current.srcObject;
          if (stream === null) return;
          const tracks = stream.getTracks();
          tracks.forEach((track) => track.stop());
          videoRef.current.srcObject = null;
     };

     const capture = async () => {
          clearInterval(faceapiInterval);
          videoRef.current.pause();
          await canvasRef.current.getContext("2d").drawImage(videoRef.current, 0, 0);
          setPause(true);
     };

     return (
          <>
               {!isPlay && !pause && <CameraLoader />}

               <section onPlay={onPlay} className="video-frame" width={cameraSize.width} height={cameraSize.height}>
                    <video id="video" autoPlay muted ref={videoRef} ></video>
                    <canvas ref={canvasRef} width={cameraSize.width} height={cameraSize.height}></canvas>
                    {alert.length > 0 && alert.map((elm) => <h1 key={elm} className="alert-text">{elm}</h1>)}
               </section>
               <section>
                    {props.thisEmployee && (
                         <div>
                              <h1>{props.thisEmployee.name}</h1>
                              <h1>{props.thisEmployee._id}</h1>
                              <h1>
                                   {props.punch.status}:
                                   {props.punch.status == "in" ? (
                                        <span style={{ color: props.thisEmployee.time > props.thisUser.setting.timeIn ? "var(--red)" : "" }}>{props.thisEmployee.time}</span>
                                   ) : (
                                        <span style={{ color: props.thisEmployee.time < props.thisUser.setting.timeOut ? "var(--red)" : "" }}>{props.thisEmployee.time}</span>
                                   )}
                              </h1>
                              {/* <button onClick={stopVideo}>stop</button> */}
                              <button className="play-btn" onClick={onPlay}>play</button>
                         </div>
                    )}                    
               </section>
          </>
     );
};

export default withRouter(PunchCamera);