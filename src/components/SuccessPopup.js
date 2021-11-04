import { Link } from "react-router-dom";
import "./SuccessPopup.scss";

const SuccessPopup = (props) => {
     return (
          <div className="Popup overlay" onClick={props.closePopup}>
               <div className="box">
                    <div className="circle check"></div>
                    <h1>Awesome</h1>
                    <p>this employee has been successfully updated!</p>
                    <h1>
                         <Link className="btn ok" to={{ pathname: `/employees/${props.elm._id}`, state: { ...props.elm, updated: true } }}>
                              ok
                         </Link>
                    </h1>
               </div>
          </div>
     );
};

export default SuccessPopup;
