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
               ) : <BiCameraOff />}
          </div>
     );
};