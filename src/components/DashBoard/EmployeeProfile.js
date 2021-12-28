import React, { useContext, useLayoutEffect, useEffect, useState, useRef } from "react";
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
     const { thisUser, InitEmployeeInputs, setIsLoading } = useContext(DataContext);
     const { usersURL, options } = useContext(URLContext);
     const { reIssueToken, fetchUser } = useContext(FunctionContext);
     const [isEdit, setIsEdit] = useState(false);
     const [isSuccessPopup, setIsSuccessPopup] = useState(false);
     const [isDelPopup, setIsDelPopup] = useState(false);
     const [isCamera, setIsCamera] = useState(false);
     const formRef = useRef();
     const [thisEmployee, setThisEmployee] = useState(InitEmployeeInputs);
     const EachEmployeeURL = `${usersURL}/${thisUser._id}/employees/${props.match.params.id}`;

     // if(!thisEmployee) return <h1>return</h1>

     useEffect(() => {
          if(props.location.state) setThisEmployee(props.location.state);
     }, []);

     const changeInput = (e) => setThisEmployee({ ...thisEmployee, [e.target.name]: e.target.value });

     const editEmployee = (e) => {
          e.preventDefault();
          console.log("editEmployee()")
          
          setIsEdit(false);
          setIsLoading(true)
          // updateEmployee();
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

     const clickCemeraIcon = () => { 
          console.log("click camera icon")
          setIsCamera(!isCamera)
     };

     return (
          <div id="EachEmployee" className="center">
               <div className="card">
                    <section className="top-div">
                         <AiOutlineEdit onClick={() => {setIsEdit(!isEdit);}} className={ isEdit ? "click-icon" : "" }/>
                         <AiOutlineDelete onClick={() => {setIsDelPopup(!isDelPopup)}}/>
                    </section>
                    <form ref={formRef} onSubmit={editEmployee}>
                         <fieldset disabled={!isEdit} className="employeeForm">
                              <section className="img-wrapper">
                                   {console.log(thisEmployee)}
                                   { thisEmployee.image.length > 1 ?
                                        <img src={thisEmployee.image} name="image" alt={thisEmployee.name} />:
                                        <BiImageAlt className="BiImageAlt" style={{ display: isEdit ? "none" : "block" }} />
                                   }
                                   <BiCamera style={{ display: !isEdit ? "none" : "block" }} className={ thisEmployee.image.length > 0 ? "small-icon" : ""} onClick={clickCemeraIcon} />   
                              </section>
                              <FormInfoDiv changeInput={changeInput} thisEmployee={thisEmployee} />
                         </fieldset>
                    </form>
               </div>
               {isSuccessPopup && <SuccessPopup closePopup={()=>{setIsSuccessPopup(false)}} action="updated" pathname={`/employee/profile/${thisEmployee._id}`} />}
               {isDelPopup && <DeletePopup closePopup={()=>{setIsDelPopup(false)}} deleteItem={deleteEmployee} />}
               {isCamera && <FaceCamera thisEmployee={thisEmployee} setThisEmployee={setThisEmployee} />}
          </div>
     );
}

export default EmployeeProfile;