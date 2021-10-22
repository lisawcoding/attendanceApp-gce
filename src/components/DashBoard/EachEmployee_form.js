import { useRef } from "react";
import * as faceapi from "face-api.js";

import { BiCamera } from "react-icons/bi";
import { AiOutlineStop } from "react-icons/ai";
import { GiConfirmed } from "react-icons/gi";

function EachEmployee_form(props) {
     const videoRef = useRef();
     const canvasRef = useRef();

     const videoBoxRef = useRef();
     const imgRef = useRef();

     // const changeImgInput = async() => {
     //     const imgFile = imgInputRef.current.files[0]
     //     const img = await faceapi.bufferToImage(imgFile)

     //     imgBoxRef.current.append(img);
     //     const canvasTop = faceapi.createCanvasFromMedia(img)
     //     imgBoxRef.current.append(canvasTop)
     //     const displaySize={width: img.width, height: img.height}
     //     faceapi.matchDimensions(canvasTop, displaySize)

     //     Promise.all([
     //         faceapi.nets.ssdMobilenetv1.load('/models'),
     //         faceapi.nets.faceLandmark68Net.load('/models'),
     //         faceapi.nets.faceRecognitionNet.load('/models')
     //     ])
     //     .then( () => recongizeFace1(img, canvasTop, displaySize))
     //     .catch(err => console.error(err))
     // }

     // const recongizeFace1 = async(img, canvasTop, displaySize) => {
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

     async function startVideo(e) {
          await navigator.mediaDevices
               .getUserMedia({ video: true })
               .then(function (stream) {
                    console.log(videoRef);
                    videoRef.current.srcObject = stream;
               })
               .catch(function (err) {
                    console.log(err);
               });
     }

     function stopVideo() {
          const stream = videoRef.current.srcObject;
          if (stream === null) return;
          const tracks = stream.getTracks();
          tracks.forEach((track) => track.stop());
          videoRef.current.srcObject = null;
     }

     async function screenShot() {
          canvasRef.current.width = videoRef.current.videoWidth;
          canvasRef.current.height = videoRef.current.videoHeight;
          await canvasRef.current.getContext("2d").drawImage(videoRef.current, 0, 0);

          props.uploadPhoto(canvasRef.current.toDataURL("image/jpeg", 0.5));
          stopVideo();

          Promise.all([faceapi.nets.ssdMobilenetv1.load("/models"), faceapi.nets.faceLandmark68Net.load("/models"), faceapi.nets.faceRecognitionNet.load("/models")])
               .then(() => {
                    recognizeFace(imgRef.current);
               })
               .catch((err) => console.error(err));
     }

     const recognizeFace = async () => {
          const detections = await faceapi.detectAllFaces(canvasRef.current).withFaceLandmarks().withFaceDescriptors();
          const displaySize = { width: 500, height: 500 };
          const resizedDetections = faceapi.resizeResults(detections, displaySize);
          resizedDetections.forEach((detection) => {
               const box = detection.detection.box;
               const drawBox = new faceapi.draw.DrawBox(box, {
                    label: "face",
               });
               drawBox.draw(canvasRef.current);
          });

          console.log(detections);
     };

     return (
          <div className="card">
               {/* <img ref={imgRef} src={two} /> */}
               <form onSubmit={props.submitForm} id="EachEmployee_form" encType="multipart/form-data">
                    <section className="img-wrapper">
                         {props.disabled === true ? (
                              <img src={props.elm.image} alt={`${props.elm.name}'s image`} />
                         ) : (
                              <div className="camera-div">
                                   {/* <div className="video-box" ref={videoBoxRef}>
                                   <video id="video" autoPlay muted ref={videoRef}></video>
                                   <canvas ref={canvasRef}></canvas>
                              </div>
                              <div className="btn-div">
                                   <BiCamera onClick={startVideo} />
                                   <AiOutlineStop onClick={stopVideo} />
                                   <GiConfirmed onClick={screenShot} />
                              </div> */}
                              </div>
                         )}
                    </section>

                    <section className="info-div">
                         <label>
                              <span>name</span>
                              <input type="text" name="name" disabled={props.disabled} value={props.elm.name} onChange={props.changeInput} autoComplete="off" required />
                         </label>
                         <label>
                              <span>employee id</span>
                              <input type="text" name="id" disabled={props.disabled} value={props.elm.id} onChange={props.changeInput} />
                         </label>
                         <label>
                              <span>password</span>
                              <input type="text" name="password" disabled={props.disabled} value={props.elm.password} onChange={props.changeInput} required />
                         </label>
                         <label>
                              <span>phone number</span>
                              <input type="tel" name="tel" disabled={props.disabled} value={props.elm.tel} onChange={props.changeInput} />
                         </label>
                         <label>
                              <span>remark</span>
                              <input type="text" name="remark" disabled={props.disabled} value={props.elm.remark} onChange={props.changeInput} />
                         </label>
                         <label>
                              <span>date</span>
                              <input type="date" name="date" disabled={props.disabled} value={props.elm.date} onChange={props.changeInput} />
                         </label>
                         {props.disabled === false && <input type="submit" value="update" />}
                    </section>
               </form>
          </div>
     );
}

export default EachEmployee_form;
