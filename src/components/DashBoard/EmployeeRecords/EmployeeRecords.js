import { BiImageAlt } from "react-icons/bi";
import "./EmployeeRecords.scss";
import EmployeeRecords_table from "./EmployeeRecords_table";

function EmployeeRecords(props) {

     return (
         <main id="Records">
                <section className="img-div">
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
                <EmployeeRecords_table props={props}/>
         </main>
     );
}

export default EmployeeRecords;