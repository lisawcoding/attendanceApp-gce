import { BiImageAlt } from "react-icons/bi";
import "./Records.scss";
import RecordsTable from "./RecordsTable";

function Records(props) {

     return (
         <main id="Records">
                <section className="top-div">
                    <div className="employee-img-wrapper">
                        {
                            props.location.state.image ? <img src={props.location.state.image} alt={props.location.name} /> : <BiImageAlt/>
                        }
                    </div>
                    <div className="personal-info">
                        <h1>{props.location.state.name}</h1>
                        <h1>{props.location.state._id}</h1>
                    </div>
                </section>
                <RecordsTable props={props}/>
         </main>
     );
}

export default Records;