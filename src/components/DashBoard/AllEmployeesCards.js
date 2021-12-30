import { Link } from "react-router-dom";
import { AiOutlineSchedule } from "react-icons/ai";
import { BiImageAlt, BiUserPin } from "react-icons/bi";
import { useMemo } from "react";
import "./AllEmployeesCards.scss";

function AllEmployeesCards ({allEmployees, searchTerm}) {

    // const columns = useMemo(()=>{
    //     console.log("useMemo")
    //     return Object.keys(allEmployees[0]);  
    //     // console.log("columns: ", columns)
    // }, [])

    return (
        <section className="cards-div">
            {allEmployees
            .map(elm => 
            <div id="AllEmpoyeeCards" className="card" key={elm._id}>
                <div className="img-wrapper">
                    {elm.image && elm.image.length > 0 ? <img src={elm.image} /> : <BiImageAlt />}
                </div>
                <h1>{elm.name}</h1>
                <p>{elm._id}</p>
                <div className="icon-div">
                    <Link to={{ pathname: `/employee/records/${elm._id}`, state: elm }}><AiOutlineSchedule/></Link>
                    <Link to={{ pathname: `/employee/profile/${elm._id}`, state: elm }}><BiUserPin/></Link>
                </div>
            </div>)
            }
        </section> 
        // <section className="cards-div">
        //     {allEmployees
        //     .map(elm => 
        //     <div id="AllEmpoyeeCards" className="card" key={elm._id}>
        //         <h1>{elm.name}</h1>
        //         <p>{elm._id}</p>
        //         <div className="img-wrapper">
        //             {elm.image && elm.image.length > 0 ? <img src={elm.image} /> : <BiImageAlt />}
        //         </div>
        //         <div className="icon-div">
        //             <Link to={{ pathname: `/employee/records/${elm._id}`, state: elm }}><AiOutlineSchedule/></Link>
        //             <Link to={{ pathname: `/employee/profile/${elm._id}`, state: elm }}><BiUserPin/></Link>
        //         </div>
        //     </div>)
        //     }
        // </section> 
    );
}

export default AllEmployeesCards;