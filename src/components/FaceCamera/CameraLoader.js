import { BiCamera, BiCameraOff } from "react-icons/bi";

export const CameraLoader = (props) => {
     return (
          <div className="camera-loader-div">
               {props.mediaTest == null ? (
                    <>
                         <BiCamera className="BiCamera" />
                         <div className="lds-ellipsis">
                              <div></div>
                              <div></div>
                              <div></div>
                         </div>
                    </>
               ) : (
                    <>
                         <BiCameraOff />
                         <h1 className="alert-text">{props.mediaTest}</h1>
                    </>
               )}
          </div>
     );
};
