import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Card_model from "./Card_model";
import "./AllEmployees.scss";
import { DataContext } from "../../contexts/DataContext";
import { AiOutlineSchedule } from "react-icons/ai";
import { BiImageAlt, BiUserPin, BiSearchAlt } from "react-icons/bi";
import "./Card_model.scss";

function AllEmployees() {
     const { allEmployees } = useContext(DataContext);
     const [ searchTerm, setSearchTerm ] = useState("");

     const changeSearchInput = e => setSearchTerm(e.target.value);

     return (
          <main id="AllEmployees">
               <div className="top-div">
                    <div className="search-input">
                         <input type="text" onChange={changeSearchInput} value={searchTerm} />
                         <BiSearchAlt />
                    </div>
               </div>
               {
                    allEmployees && (
                         <>                         
                              <section className="cards-div">
                                   {allEmployees
                                        .filter((employee)=>employee.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                        .map((elm) => <Card_model elm={elm} key={elm._id} Link={Link} IconImage={BiImageAlt} IconSchedule={AiOutlineSchedule} IconUserPin={BiUserPin} />)}
                              </section>
                              {allEmployees.length<1 && <h1>no employees</h1>}
                         </>
                    )
               }
          </main>
     );
}

export default AllEmployees;