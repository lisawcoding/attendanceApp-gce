import React, { useContext, useLayoutEffect, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BiCamera, BiImageAlt } from "react-icons/bi";
import SuccessPopup from "../Common/SuccessPopup";

import "./EmployeeProfile.scss";
import { URLContext } from "../../contexts/URLContext";
import { DataContext } from "../../contexts/DataContext";
import { FunctionContext } from "../../contexts/FunctionContext";
import DeletePopup from "../Common/DeletePopup";
import FaceCamera from "../FaceCamera/FaceCamera";
import { FormInfoDiv } from "../Common/FormInfoDiv";

function EmployeeProfile(props) {
     const { thisUser, setIsLoading, InitEmployeeInputs } = useContext(DataContext);
     const { usersURL, options } = useContext(URLContext);
     const { reIssueToken, fetchUser } = useContext(FunctionContext);
     const [isEdit, setIsEdit] = useState(false);
     const [isSuccessPopup, setIsSuccessPopup] = useState(false);
     const [isDelPopup, setIsDelPopup] = useState(false);
     const [isCamera, setIsCamera] = useState(false);
     const [ thisEmployee, setThisEmployee ] = useState(InitEmployeeInputs)
     const EachEmployeeURL = `${usersURL}/${thisUser._id}/employees/${props.match.params.id}`;

     useEffect(() => {
          if(props.location.state) setThisEmployee(props.location.state);
     }, []);

     const changeInput = (e) => setThisEmployee({ ...thisEmployee, [e.target.name]: e.target.value });

     const editEmployee = (e) => {
          e.preventDefault();
          console.log("editEmployee()")
          
          setIsEdit(false);
          setIsLoading(true)

          fetch( EachEmployeeURL , options("PUT", thisEmployee))
          .then((res) => res.json())
          .then(async (data) => {
               console.log(data);
               if (data.error) {
                    await reIssueToken(props);
                    editEmployee();
               } else {
                    setIsSuccessPopup(true);
                    fetchUser()
               }
          })
          .catch((err) => console.error(err));
     };

     const deleteEmployee = () => {
          setIsLoading(true);
          fetch( EachEmployeeURL , options("DELETE"))
          .then((res) => res.json())
          .then(async (data) => {
               console.log(data);
               if (data.error) {
                    await reIssueToken(props);
                    deleteEmployee();
                    return;
               }
               props.history.push("/employees");
               fetchUser()
          })
          .catch((err) => console.error(err));          
     };

     const clickCemeraIcon = () => setIsCamera(true);


     return (
          <div id="EmployeeProfile" className="center">
               <div className="card">
                    <section className="top-div">
                         <AiOutlineEdit onClick={() => {setIsEdit(!isEdit)}} className={ isEdit ? "click-icon" : null } title="edit profile"/>
                         <AiOutlineDelete onClick={() => {setIsDelPopup(!isDelPopup)}} title="delete profile" />
                    </section>
                    <form onSubmit={editEmployee} className="employeeForm" >
                         <section className="img-wrapper" >
                              { thisEmployee.image.length > 1 ?
                                   <img src={thisEmployee.image} name="image" alt={thisEmployee.name} />:
                                   <BiImageAlt className="BiImageAlt" style={{ display: isEdit ? "none" : "block" }} />
                              }
                              <BiCamera 
                                   style={{display: (!isEdit || isCamera) ? "none" : "block"}} 
                                   className={ thisEmployee.image.length > 0 ? "small-icon" : null} 
                                   onClick={clickCemeraIcon} 
                                   title="take a new picture" 
                                   />   
                         </section>
                         <FormInfoDiv changeInput={changeInput} thisEmployee={thisEmployee} disabled={!isEdit} />
                    </form>
               </div>
               {isSuccessPopup && <SuccessPopup closePopup={()=>{setIsSuccessPopup(false)}} action="updated" pathname={`/employee/profile/${thisEmployee._id}`} />}
               {isDelPopup && <DeletePopup closePopup={()=>{setIsDelPopup(false)}} deleteItem={deleteEmployee} />}
               {isCamera && <FaceCamera thisEmployee={thisEmployee} setThisEmployee={setThisEmployee} />}
          </div>
     );
}

export default EmployeeProfile;