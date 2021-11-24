import { Link } from "react-router-dom";
import { BiImageAlt } from "react-icons/bi";
import "./Card_model.scss";

function Card_model({elm}) {

     return (
          <div id="Card_model" className="card">
               <Link to={{ pathname: `/employees/edit/${elm._id}`, state: elm }}>
                    <h1>{elm.name}</h1>
                    <p>{elm._id}</p>
                    <div className="img-wrapper">
                         {elm.image && elm.image.length > 0 ? <img src={elm.image} /> : <BiImageAlt />}
                    </div>
               </Link>
          </div>
     );
}

export default Card_model;