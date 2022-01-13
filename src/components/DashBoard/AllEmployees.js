import { useContext, useState } from "react";
import "./AllEmployees.scss";
import { DataContext } from "../../contexts/DataContext";
import { BiSearchAlt } from "react-icons/bi";
import AllEmployeesCards from "./AllEmployeesCards";
import Loader from "../Common/Loader";
import { useEffect } from "react/cjs/react.development";

function AllEmployees () {
     const { allEmployees, isLoading, setIsLoading } = useContext(DataContext);
     const [ searchTerm, setSearchTerm ] = useState("");

     const changeSearchInput = e => setSearchTerm(e.target.value);

     useEffect(() => {
          if(document.readyState!=="complete") setIsLoading(true)
     }, [])

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