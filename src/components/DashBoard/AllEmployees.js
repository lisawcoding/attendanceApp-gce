import React, { useEffect, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { InitContext } from "../../contexts/InitContext";
import Card_model from "./Card_model";
import "./AllEmployees.scss";
import { URLContext } from "../../contexts/URLContext";

function AllEmployees() {
     const { employeesURL } = useContext(URLContext);
     const { initEmployees, setInitEmployees } = useContext(InitContext);
     const [allEmployees, setAllemployees] = useState(initEmployees);
     const [isLoading, setIsLoading] = useState(true);

     useEffect(() => {
          fetch(employeesURL)
               .then((res) => res.json())
               .then((data) => {
                    console.log(data);
                    setAllemployees([...allEmployees, ...data.result]);
                    setIsLoading(false);
               })
               .catch((err) => console.error(`fetch error: ${err}`));
     }, []);

     return (
          <div id="AllEmployees">
               {isLoading && (
                    <div className="loader-wrapper">
                         <div className="loader"></div>
                    </div>
               )}
               <h1>all employees</h1>
               <section className="cards-div">{allEmployees.length > 0 && allEmployees.map((elm) => <Card_model elm={elm} key={uuidv4()} />)}</section>
          </div>
     );
}

export default AllEmployees;
