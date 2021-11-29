import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Card_model from "./Card_model";
import "./AllEmployees.scss";
import { DataContext } from "../../contexts/DataContext";
import { AiOutlineSchedule } from "react-icons/ai";
import { BiImageAlt, BiUserPin } from "react-icons/bi";
import "./Card_model.scss";

function AllEmployees() {
     const { allEmployees, isLoading } = useContext(DataContext);

     return (
          <>
               <div className="loader-wrapper" style={{ display: isLoading ? "flex" : "none" }}>
                    <div className="loader"></div>
               </div>
               {allEmployees && (
                    <div id="AllEmployees">
                         <h1>total {allEmployees.length} employees</h1>
                         <section className="cards-div">
                              {allEmployees.map((elm) => (
                                   <Card_model elm={elm} key={elm._id} Link={Link} IconImage={BiImageAlt} IconSchedule={AiOutlineSchedule} IconUserPin={BiUserPin} />
                              ))}
                         </section>
                    </div>
               )}
               {allEmployees && allEmployees.length<1 && <h1>no employees</h1>}
          </>
     );
}

export default AllEmployees;