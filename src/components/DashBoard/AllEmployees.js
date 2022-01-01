import { useContext, useState } from "react";
import "./AllEmployees.scss";
import { DataContext } from "../../contexts/DataContext";
import { BiSearchAlt } from "react-icons/bi";
import AllEmployeesCards from "./AllEmployeesCards";
import Loader from "../Common/Loader";

function AllEmployees () {
     const { allEmployees } = useContext(DataContext);
     const { isLoading } = useContext(DataContext);
     const [ searchTerm, setSearchTerm ] = useState("");

     const changeSearchInput = e => setSearchTerm(e.target.value);

     return (
          <>
          { isLoading ? <Loader /> : 
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
          }          
          </>
     );
}

export default AllEmployees;