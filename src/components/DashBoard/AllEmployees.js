import React, { useEffect, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { InitContext } from "../../contexts/InitContext";
import Card_model from "./Card_model";
import "./AllEmployees.scss";
import { URLContext } from "../../contexts/URLContext";
import { DataContext } from "../../contexts/DataContext";
import { FunctionContext } from "../../contexts/FunctionContext";

function AllEmployees(props) {
     const { employeesURL, companiesURL, usersURL } = useContext(URLContext);
     const { initEmployees, setInitEmployees } = useContext(InitContext);
     const { thisUser, setThisUser, editedEmployee, setEditedEmployee } = useContext(DataContext);
     const { reIssueToken } = useContext(FunctionContext);
     const [allEmployees, setAllEmployees] = useState(null);
     const [isLoading, setIsLoading] = useState(true);

     useEffect(() => {
          const fetchEmployees = () => {
               fetch(`${usersURL}/${thisUser._id}/employees`, {})
                    .then((res) => res.json())
                    .then((data) => {
                         console.log(data);
                         if (data.error) {
                              reIssueToken(props);
                         } else {
                              setAllEmployees(data);
                              setIsLoading(false);
                         }
                    })
                    .catch((err) => console.error(err));
          };

          if (thisUser._id) fetchEmployees();
     }, [thisUser]);

     return (
          <div id="AllEmployees">
               {isLoading && (
                    <div className="loader-wrapper">
                         <div className="loader"></div>
                    </div>
               )}
               <h1>all employees</h1>
               <section className="cards-div">{allEmployees != null && allEmployees.map((elm) => <Card_model elm={elm} key={uuidv4()} />)}</section>
          </div>
     );
}

export default AllEmployees;
