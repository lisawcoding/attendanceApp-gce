import { Link } from "react-router-dom";
import "./SuccessPopup.scss";

const SuccessPopup = ({action, pathname, closePopup}) => {
     return (
          <div className="Popup overlay" onClick={closePopup}>
               <div className="box">
                    <div className="circle check"></div>
                    <h1>Awesome</h1>
                    <p>this employee has been successfully {action}!</p>
                    <h1>
                         <Link className="btn ok" to={pathname}>
                              ok
                         </Link>
                         {/* <Link className="btn ok" to={{ pathname: `/employees/edit/${elm._id}`, state: { ...elm, updated: true } }}>
                              ok
                         </Link> */}
                    </h1>
               </div>
          </div>
     );
};

export default SuccessPopup;
