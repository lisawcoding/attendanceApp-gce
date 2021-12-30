import { useContext, useState } from "react";
import "./AllEmployees.scss";
import { DataContext } from "../../contexts/DataContext";
import { BiSearchAlt } from "react-icons/bi";
import AllEmployeesCards from "./AllEmployeesCards";

function AllEmployees () {
     const { allEmployees } = useContext(DataContext);
     const [ searchTerm, setSearchTerm ] = useState("");

     if(!allEmployees) return <h1>loading</h1>

     const changeSearchInput = e => setSearchTerm(e.target.value);

     return (
          <main id="AllEmployees">
               <section className="top-div">
                    <div className="search-input">
                         <input type="text" onChange={changeSearchInput} value={searchTerm} placeholder="name..." />
                         <BiSearchAlt />
                    </div>
               </section>               
               <AllEmployeesCards allEmployees={allEmployees} searchTerm={searchTerm} />
               {allEmployees.length<1 && <h1>no employees</h1>}
          </main>
     );
}

export default AllEmployees;