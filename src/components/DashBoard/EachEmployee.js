import React, { useContext, useLayoutEffect, useState, useRef } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BiCamera, BiImageAlt } from "react-icons/bi";
import SuccessPopup from "../SuccessPopup";

import "./EachEmployee.scss";
import { URLContext } from "../../contexts/URLContext";
import { DataContext } from "../../contexts/DataContext";
import { FunctionContext } from "../../contexts/FunctionContext";
import DeletePopup from "../DeletePopup";
import FaceCamera from "../FaceCamera/FaceCamera";

function EachEmployee(props) {
     const { thisUser, InitEmployeeInputs, setIsLoading } = useContext(DataContext);
     const { usersURL, options } = useContext(URLContext);
     const { reIssueToken, fetchUser } = useContext(FunctionContext);
     const [isEdit, setIsEdit] = useState(false);
     const [isSuccessPopup, setIsSuccessPopup] = useState(false);
     const [isDelPopup, setIsDelPopup] = useState(false);
     const [isCamera, setIsCamera] = useState(false);
     const formRef = useRef();
     const submitBtnRef = useRef();
     const [thisEmployee, setThisEmployee] = useState(InitEmployeeInputs);
     const EachEmployeeURL = `${usersURL}/${thisUser._id}/employees/${props.match.params.id}`;

     useLayoutEffect(() => {
          setThisEmployee(props.location.state);
     }, []);

     const changeInput = (e) => setThisEmployee({ ...thisEmployee, [e.target.name]: e.target.value });

     const editEmployee = (e) => {
          e.preventDefault();
          
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

     const clickCemeraIcon = () => setIsCamera(true);

     return (
          <div id="EachEmployee" className="center">
               <h1>update employee profile</h1>
               <div className="card">
                    <section className="top-div">
                         <AiOutlineEdit onClick={() => {setIsEdit(!isEdit);}} style={{ fill: isEdit ? "var(--pink)" : "" }}/>
                         <AiOutlineDelete onClick={() => {setIsDelPopup(!isDelPopup)}}/>
                    </section>
                    <form ref={formRef} onSubmit={editEmployee}>
                         <fieldset disabled={!isEdit} className="employeeForm">
                              {thisEmployee && (
                                   <section className="img-div">
                                        <div className="img-wrapper">
                                             {
                                                  thisEmployee.image.length > 1 ?
                                                       <img src={thisEmployee.image} name="image" />:
                                                       <BiImageAlt className="BiImageAlt" style={{ display: isEdit ? "none" : "block" }} />
                                             }
                                             <BiCamera style={{ display: !isEdit ? "none" : "block" }} className={ thisEmployee.image.length > 0 ? "small-icon" : ""} onClick={clickCemeraIcon} />   
                                        </div>
                                   </section>
                              )}
                              <section className="info-div">
                                   <label>
                                        <span>name</span>
                                        <input type="text" name="name" onChange={changeInput} required value={thisEmployee.name} />
                                   </label>
                                   <label>
                                        <span>password</span>
                                        <input type="password" name="password" onChange={changeInput} required value={thisEmployee.password} />
                                   </label>
                                   <label>
                                        <span>phone number</span>
                                        <input name="tel" type="tel" onChange={changeInput} size="20" minLength="7" maxLength="14" value={thisEmployee.tel} />
                                   </label>
                                   <label>
                                        <span>remark</span>
                                        <input type="text" name="remark" onChange={changeInput} value={thisEmployee.remark} />
                                   </label>
                                   <label>
                                        <span>date</span>
                                        <input type="date" name="date" onChange={changeInput} placeholder={thisEmployee.date} value={thisEmployee.date} />
                                   </label>
                                   <input type="submit" value="confirm" ref={submitBtnRef} />
                              </section>
                         </fieldset>
                    </form>
               </div>
               {isSuccessPopup && <SuccessPopup closePopup={()=>{setIsSuccessPopup(false)}} action="updated" pathname={`/employees/edit/${thisEmployee._id}`} />}
               {isDelPopup && <DeletePopup closePopup={()=>{setIsDelPopup(false)}} deleteItem={deleteEmployee} />}
               {isCamera && <FaceCamera thisEmployee={thisEmployee} setThisEmployee={setThisEmployee} />}
          </div>
     );
}

export default EachEmployee;