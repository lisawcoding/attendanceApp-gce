import React, { useState, useRef, createRef, useEffect, useContext } from 'react';
import { 
    Link,
} from 'react-router-dom';

import "../styles/File_model.scss";
import { BiCamera } from 'react-icons/bi';
import { InitContext } from '../contexts/InitContext';

function File_model (props) {
    const [ waiting, setWaiting ] = useState(false)
    const {imageBase64, setImageBase64} = useContext(InitContext)
    
    return (
        <div>
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
                <section className="img-wrapper" >    
                    { imageBase64.length < 1 ?  <Link to="/facecamera"><BiCamera className="BiCamera" /></Link> : <img src={imageBase64} />}    
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