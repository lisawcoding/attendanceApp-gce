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
     const { thisUser, isReload, setIsReload, InitEmployeeInputs } = useContext(DataContext);
     const { usersURL } = useContext(URLContext);
     const { reIssueToken } = useContext(FunctionContext);
     const [isEdit, setIsEdit] = useState(false);
     const [isSuccessPopup, setIsSuccessPopup] = useState(false);
     const [isDelPopup, setIsDelPopup] = useState(false);
     const [isCamera, setIsCamera] = useState(false);
     const formRef = useRef();
     const submitBtnRef = useRef();
     const [thisEmployee, setThisEmployee] = useState(InitEmployeeInputs);

     useLayoutEffect(() => {
          setThisEmployee(props.location.state);
     }, []);

     const changeInput = (e) => setThisEmployee({ ...thisEmployee, [e.target.name]: e.target.value });

     const fetchUpdateEmployee = () => {
          fetch(`${usersURL}/${thisUser._id}/employees/${props.match.params.id}`, {
               method: "PUT",
               headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
               },
               body: JSON.stringify(thisEmployee),
          })
               .then((res) => res.json())
               .then(async (data) => {
                    console.log(data);
                    if (data.error) {
                         await reIssueToken(props);
                         fetchUpdateEmployee();
                         return;
                    }
                    setIsEdit(false);
                    setIsSuccessPopup(true);
                    setIsReload(!isReload);
               })
               .catch((err) => console.error(err));
     };    

     const editEmployee = async (e) => {
          e.preventDefault();
          fetchUpdateEmployee();
     };

     const deleteEmployee = () => {
          fetch(`${usersURL}/${thisUser._id}/employees/${props.match.params.id}`, {
               method: "DELETE",
               headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
               },
          })
               .then((res) => res.json())
               .then(async (data) => {
                    console.log(data);
                    if (data.error) {
                         await reIssueToken(props);
                         deleteEmployee();
                         return;
                    }
                    await setIsReload(!isReload);
                    await props.history.push("/employees");
               })
               .catch((err) => console.error(err));
     };

     const deleteItem = () => {
          deleteEmployee();
     };

     const clickCemeraIcon = () => setIsCamera(true);

     return (
          <div id="EachEmployee" className="center">
               <div className="card">
                    <section className="top-div">
                         <AiOutlineEdit
                              onClick={() => {
                                   setIsEdit(!isEdit);
                              }}
                              style={{ fill: isEdit ? "var(--pink)" : "" }}
                         />
                         <AiOutlineDelete
                              onClick={() => {
                                   setIsDelPopup(!isDelPopup);
                              }}
                         />
                    </section>
                    <h1>update employee profile</h1>
                    <form ref={formRef} onSubmit={editEmployee}>
                         <fieldset disabled={!isEdit} className="employeeForm">
                              {thisEmployee && (
                                   <section className="img-div">
                                        <div className="img-wrapper">
                                             <>
                                                  <BiImageAlt className="BiImageAlt" style={{ display: isEdit ? "none" : "block" }} />
                                                  <BiCamera style={{ display: !isEdit ? "none" : "block" }} onClick={clickCemeraIcon} />
                                             </>
                                             <>
                                                  <img src={thisEmployee.image} type="text" name="image" />
                                                  <BiCamera className="small-icon" style={{ display: isEdit && thisEmployee.image.length > 1 ? "block" : "none" }} onClick={clickCemeraIcon} />
                                             </>
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
               {/* {isSuccessPopup && <SuccessPopup elm={thisEmployee} closePopup={()=>{setIsSuccessPopup(false)}} action="updated" link={} />} */}
               {isDelPopup && <DeletePopup elm={thisEmployee} closePopup={()=>{setIsDelPopup(false)}} deleteItem={deleteItem} />}
               {isCamera && <FaceCamera setIsCamera={setIsCamera} thisEmployee={thisEmployee} setThisEmployee={setThisEmployee} />}
          </div>
     );
}

export default EachEmployee;