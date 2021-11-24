import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import Card_model from "./Card_model";
import "./AllEmployees.scss";
import { DataContext } from "../../contexts/DataContext";

function AllEmployees() {
     const {  allEmployees } = useContext(DataContext);


     return (
          <>
               {allEmployees && (
                    <div id="AllEmployees">
                         <h1>total {allEmployees.length} employees</h1>
                         <section className="cards-div">
                              {allEmployees.map((elm) => (
                                   <Card_model elm={elm} key={uuidv4()} />
                              ))}
                         </section>
                    </div>
               )}
          </>
     );
}

export default AllEmployees;