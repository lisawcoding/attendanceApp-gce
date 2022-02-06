import React, { useState, useRef, useEffect, useContext } from "react";
import * as faceapi from "face-api.js";
import { withRouter } from "react-router-dom";
import "./PunchCamera.scss";
import { DataContext } from "../../contexts/DataContext";
import { URLContext } from "../../contexts/URLContext";
import { FunctionContext } from "../../contexts/FunctionContext";
// import { LabeledFaceDescriptors } from "face-api.js";
import CameraLoader from "../Common/CameraLoader";

const PunchCamera = (props) => {
     const { usersURL, options } = useContext(URLContext);
     const { allEmployees } = useContext(DataContext);
     const { reIssueToken } = useContext(FunctionContext);
     const [ punchEmployee, setPunchEmployee ] = useState(null);
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

          return()=>{
               window.location.reload()
          }
     }, []);

     useEffect(()=>{
          if(!isPlay) return
          videoRef.current.play();
     }, [props.punch])

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

     const onPlay = () => {
          console.log("onPlay");
          setIsPlay(true);

          clearPunchInfo()
          startDetectFace()
     };

     const clearPunchInfo = () => {
          setPunchEmployee(null)
          canvasRef.current.getContext('2d').clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
     }
        
     const labelImages = async() => {
          let employeesWithImage = allEmployees.filter((employee) => employee.image.length > 0 )
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
          .then(results => setLableFaceDescriptors(results.filter((r) => r !== undefined)))
          .catch( err=> window.location.reload())
     }

     let faceapiInterval;
     const startDetectFace = () => {
          const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.9);
          const displaySize = { width: videoRef.current.clientWidth, height: videoRef.current.clientHeight };
          
          faceapiInterval = setInterval(async () => {
               const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();
               const resizedDetections = faceapi.resizeResults(detections, displaySize);
               const results = resizedDetections.map((d) => faceMatcher.findBestMatch(d.descriptor));

               setAlert([])
               // console.log("run faceapiInaterval")
               // console.log(detections)
               // console.log(results)

               if (detections.length > 1) return setAlert([...alert, "there are more than one person in the camera, only one person allowed"]);
               if (detections.length == 0 || (detections.length === 1 && detections[0].detection._score < 0.6) ) return setAlert([...alert, "detecting..."])

               videoRef.current.pause();
               clearInterval(faceapiInterval);
               // showLabelBox(resizedDetections, results)

               if (results[0]._label == "unknown") return setAlert([...alert, "cannot recongize this face"]);
               saveInfo(results);
               
               // setTimeout(()=>{
               //      videoRef.current.play();
               // }, 9000)

               if (videoRef.current.autoPlay === false) clearInterval(faceapiInterval);
               return;
          }, 350);
     }

     const showLabelBox = ( resizedDetections, results ) =>{
          setCameraSize({ width: videoRef.current.clientWidth, height: videoRef.current.clientHeight });
          const box = resizedDetections[0].detection.box;
          const drawBox = new faceapi.draw.DrawBox(box, { label: results[0] });
          drawBox.draw(canvasRef.current);
     }

     const saveInfo = (results) => {
          const parseResult = JSON.parse(results[0]._label);
          const timer = new Date();
          console.log(parseResult);

          let url = `${usersURL}/${parseResult.user}/employees/${parseResult._id}/records/create`;
          let data = {
               name: parseResult.name,
               employee: parseResult._id,
               date: timer.toLocaleDateString("en-CA"),
               date1: new Date(),
          };
          data[props.punch.status] = timer.toTimeString().slice(0, 8);

          fetchAddRecord(url, data);
          setPunchEmployee(data)
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

     return (
          <>
          {!isPlay && <CameraLoader />}
               {/* <button onClick={stopVideo}>stop</button> */}
               {/* <button onClick={startVideo}>start</button> */}
               <video onPlay={onPlay} id="video" autoPlay muted ref={videoRef} ></video>
               <canvas ref={canvasRef} width={cameraSize.width} height={cameraSize.height}></canvas>
               {alert.length > 0 && alert.map((elm, i) => <h1 key={`${elm}-${i}`} className="alert-text">{elm}</h1>)}
               {punchEmployee && (
                    <div className="info-div">
                         <h1>{punchEmployee.name}</h1>
                         <h1 className={ punchEmployee[props.punch.status] > props.thisUser.setting[props.punch.status] ? (
                              props.punch.status == "in" ? "red" : "" ) : (props.punch.status=="out" ? "" : "red")}>
                              {props.punch.status}: {punchEmployee[props.punch.status]}
                         </h1>
                    </div>
               )}               
          </>
     );
};

export default withRouter(PunchCamera);