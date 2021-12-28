import { Link } from "react-router-dom";
import { AiOutlineSchedule } from "react-icons/ai";
import { BiImageAlt, BiUserPin } from "react-icons/bi";
import "./EmployeeCards.scss";
import { useMemo } from "react";

function EmployeeCards({allEmployees, searchTerm}) {

    const columns = useMemo(()=>{
        console.log("useMemo")
        return Object.keys(allEmployees[0]);  
        // console.log("columns: ", columns)
    }, [])

    return (
        <section className="cards-div">
            {allEmployees
                .filter(employee=> employee.name.toLowerCase().indexOf(searchTerm.toLowerCase()>-1)
                    // employee.column.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
                )
                .map((elm) => 
                    <div id="EmployeeCards" className="card" key={elm._id}>
                        <h1>{elm.name}</h1>
                        <p>{elm._id}</p>
                        <div className="img-wrapper">
                            {elm.image && elm.image.length > 0 ? <img src={elm.image} /> : <BiImageAlt />}
                        </div>
                        <div className="icon-div">
                            <Link to={{ pathname: `/employee/records/${elm._id}`, state: elm }}><AiOutlineSchedule/></Link>
                            <Link to={{ pathname: `/employee/profile/${elm._id}`, state: elm }}><BiUserPin/></Link>
                            {/* <Link to={{ pathname: `/employees/edit/${elm._id}/records`, state: elm }}><AiOutlineSchedule/></Link>
                            <Link to={{ pathname: `/employees/edit/${elm._id}`, state: elm }}><BiUserPin/></Link> */}
                        </div>
                    </div>
               )}
        </section> 
    );
}

export default EmployeeCards