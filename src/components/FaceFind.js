import React, { useState, useRef, createRef, useEffect, useContext } from "react";
import * as faceapi from "face-api.js";
import { Link, NavLink, withRouter } from "react-router-dom";

// import "../styles/FaceCamera.scss";
import "../styles/FaceFind.scss";
import { AiOutlineStop } from "react-icons/ai";
import { GiCarnivorousPlant, GiConfirmed, GiConsoleController } from "react-icons/gi";
import { BiDirections } from "react-icons/bi";
import { InitContext } from "../contexts/InitContext";
import { loadFaceDetectionModel, padToSquare } from "face-api.js";
import { BiCamera } from "react-icons/bi";
import { FiCheck } from "react-icons/fi";
import { GiCancel } from "react-icons/gi";

function FaceCamera(props) {
     const videoRef = useRef();
     const canvasRef = useRef();
     const videoBoxRef = useRef();
     const imgRef = useRef();
     const { imageBase64, setImgBase64, initEmployees, setInitEmployees } = useContext(InitContext);
     const [pause, setPause] = useState(false);
     const [isPlay, setIsPlay] = useState(false);

     useEffect(() => {
          Promise.all([
               faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
               // faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
               faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
               faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
               // faceapi.nets.faceExpressionNet.loadFromUri('/models')
          ])
               .then((val) => console.log(val))
               .then(start);
     }, []);

     async function start() {
          const imgUpload = document.querySelector("#img-upload");
          // const container = document.createElement("div");
          // container.style.position = "relative";
          // videoBoxRef.current.append(container)

          // const labeledFaceDescriptors = await loadLabeledImage();
          // const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
          // console.log(labeledFaceDescriptors)
          // console.log(faceMatcher)

          let image;
          let canvasTop;
          imgUpload.addEventListener("change", async () => {
               if (image) image.remove();
               // if(canvasTop) canvasTop.remove();
               console.log(imgUpload.files[0]);
               image = await faceapi.bufferToImage(imgUpload.files[0]); //return a base64 src
               console.log(image);
               // videoBoxRef.current.append(image)
               // canvasTop = faceapi.createCanvasFromMedia(image)
               // videoBoxRef.current.append(canvasTop)

               // const displaySize = { width: image.width, height: image.height}
               // faceapi.matchDimensions(canvasTop, displaySize)

               const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();
               console.log(detections);

               // const resizedDetections = faceapi.resizeResults(detections, displaySize)
               // console.log(resizedDetections)

               // const results = resizedDetections.map( d => faceMatcher.findBestMatch(d.descriptor) )
               // console.log(results)

               // results.forEach((result, i) => {
               //     console.log(result)
               //     const box = resizedDetections[i].detection.box;
               //     const drawBox = new faceapi.draw.DrawBox( box, { label: result.toString()})
               //     drawBox.draw(canvasTop)
               // })
          });
     }

     function loadLabeledImage() {
          // const labels = ["lisa",、 "thor"]
          const urls = [
               "https://raw.githubusercontent.com/WebDevSimplified/Face-Recognition-JavaScript/master/labeled_images/Thor/1.jpg",
               "https://raw.githubusercontent.com/lisawcoding/resume-1/master/img/id_photo.jpg",
          ];

          const labels = [];
          const imgSrc = [];

          initEmployees.map((employee) => {
               labels.push(employee.name);
               imgSrc.push(employee.image);
          });
          console.log(labels);
          console.log(imgSrc);

          return Promise.all(
               labels.map(async (label, i) => {
                    // const img = await faceapi.fetchImage(urls[i])
                    // const detection = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()

                    const img = await document.createElement("img");
                    img.src = imgSrc[1];
                    img.alt = labels[i];
                    console.log(img);
                    const detection = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();

                    const test = new faceapi.LabeledFaceDescriptors(label, [detection.descriptor]);
                    console.log(test);
                    return test;
               })
          );
     }

     const startVideo = () => {
          setImgBase64("");
          navigator.mediaDevices
               .getUserMedia({ video: true })
               .then((stream) => (videoRef.current.srcObject = stream))
               .catch((err) => console.log(err));
     };

     let faceapiInterval;
     let displaySize;
     const onPlay = async () => {
          console.log("onPlay");
          setIsPlay(true);
          setPause(false);

          const displaySize = { width: videoRef.current.videoWidth, height: videoRef.current.videoHeight };
          console.log(displaySize);
          console.log(videoRef);
          faceapi.matchDimensions(canvasRef.current, displaySize);

          faceapiInterval = setInterval(async () => {
               const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions());
               const resizedDetections = faceapi.resizeResults(detections, displaySize);
               canvasRef.current.getContext("2d").clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
               faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
               console.log(detections);

               if (detections.length === 1 && detections[0]._score > 0.65) capture();
          }, 100);
     };

     const capture = async () => {
          await clearInterval(faceapiInterval);
          await canvasRef.current.getContext("2d").drawImage(videoRef.current, 0, 0);
          console.log(canvasRef.current.toDataURL("image/jpeg", 0.5));
          await setImgBase64(canvasRef.current.toDataURL("image/jpeg", 0.5));
          setPause(true);
          setIsPlay(false);
     };

     const stopVideo = () => {
          const stream = videoRef.current.srcObject;
          if (stream === null) return;
          const tracks = stream.getTracks();
          tracks.forEach((track) => track.stop());
          videoRef.current.srcObject = null;
     };

     return (
          <section className="video-box" ref={videoBoxRef} onPlay={onPlay}>
               <input type="file" id="img-upload" style={{ zIndex: "999" }} />
               {/* <img ref={imgRef} /> */}

               {/* <video id="video" autoPlay muted ref={videoRef} paused={pause.toString()} ></video>
            <canvas ref={canvasRef} ></canvas>    */}

               {/* { pause === true && <img src={imageBase64} style={displaySize} />} */}

               {/* { pause && 
            <>
             <img src={imageBase64} style={displaySize} />
                <div className="btn-div">
                    <Link to="/create_employee" onClick={stopVideo}><GiConfirmed className="red" /></Link>  
                    <GiCancel onClick={onPlay} className="green" />
                </div>  
            </>
            } */}

               {/* { !isPlay && !pause &&
                <div className="camera-loader-div">
                    <BiCamera className="BiCamera" /> 
                    <div className="lds-ellipsis"><div></div><div></div><div></div></div>
                </div>
            } */}
          </section>
     );
}

export default FaceCamera;
