import { Link } from "react-router-dom";

const DeletePopup = (props) => {
     console.log(props.elm);
     return (
          <div className="Popup overlay" onClick={props.clickPopup}>
               <div className="box">
                    <div className="circle exclamation"></div>
                    <h1>are you sure?</h1>
                    <p>do you really want to delete these records? this process cannot be undone.</p>
                    <h1 className="btn-div">
                         <button className="btn cancel" onClick={props.closePopup}>
                              cancel
                         </button>
                         <button className="btn delete" onClick={props.deletItem}>
                              delete
                         </button>
                         {/* <Link to={{ pathname: `/employees/${props.elm._id}`, state: { ...props.elm, updated: true } }}>delete</Link> */}
                    </h1>
                    <h1 className="link">{/* <Link to={{ pathname: `/employees/${props.elm._id}`, state: { ...props.elm, updated: true } }}>ok</Link> */}</h1>
               </div>
          </div>
     );
};

export default DeletePopup;
