import React, { useContext, useEffect, useLayoutEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BiCamera, BiImageAlt, BiFace } from "react-icons/bi";
import EachEmployee_form from "./EachEmployee_form";
import SuccessPopup from "../SuccessPopup";
// import createHistory from "createBrowserHistory";
// require("history").createBrowserHistory
// `require("history/createBrowserHistory")`

import "./EachEmployee.scss";
import { URLContext } from "../../contexts/URLContext";
import { DataContext } from "../../contexts/DataContext";
import { InitContext } from "../../contexts/InitContext";
import { FunctionContext } from "../../contexts/FunctionContext";
import DeletePopup from "../DeletePopup";
import FaceCamera from "../FaceCamera/FaceCamera";

function EachEmployee(props) {
     const { thisEmployee, setThisEmployee, thisUser } = useContext(DataContext);
     const { employeesURL, usersURL } = useContext(URLContext);
     const { reIssueToken, logout } = useContext(FunctionContext);
     const [isEdit, setIsEdit] = useState(false);
     const [isSuccessPopup, setIsSuccessPopup] = useState(false);
     const [isDelPopup, setIsDelPopup] = useState(false);
     const [isCamera, setIsCamera] = useState(false);
     const formRef = useRef();
     const submitBtnRef = useRef();

     useLayoutEffect(() => {
          setThisEmployee(props.location.state);

          return () => {
               window.location.reload();
          };
     }, []);

     const changeInput = (e) => setThisEmployee({ ...thisEmployee, [e.target.name]: e.target.value });

     const editEmployee = async (e) => {
          e.preventDefault();

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
                    })
                    .catch((err) => console.error(err));
          };
          fetchUpdateEmployee();
     };

     // const uploadPhoto = (value) => {
     //      setInputValue({ ...inputValue, image: value });
     // };

     const closePopup = () => {
          setIsSuccessPopup(false);
          setIsDelPopup(false);
     };

     const deletItem = () => {
          const deleteEmployee = () => {
               fetch(`${usersURL}/${thisUser._id}/employees/${props.match.params.id}`, {
                    method: "DELETE",
                    headers: {
                         "Content-Type": "application/json",
                         Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
                    },
                    // body: JSON.stringify(thisEmployee),
               })
                    .then((res) => res.json())
                    .then(async (data) => {
                         console.log(data);
                         if (data.error) {
                              await reIssueToken(props);
                              deleteEmployee();

                              return;
                         }
                         setIsDelPopup(false);
                         props.history.push("/employees");
                    })
                    .catch((err) => console.error(err));
          };
          deleteEmployee();
     };

     const clickCemeraIcon = () => setIsCamera(true);

     return (
          <div id="EachEmployee" className="center">
               {/* <EachEmployee_form elm={inputValue} changeInput={changeInput} disabled={!edit} editEmployee={editEmployee} uploadPhoto={uploadPhoto} /> */}
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
                    <h1>each employee</h1>
                    <p>_id: {props.match.params.id}</p>
                    <form ref={formRef} onSubmit={editEmployee}>
                         <fieldset disabled={isEdit ? "" : "disabled"} className="employeeForm">
                              {thisEmployee && (
                                   <section className="img-div">
                                        <div className="img-wrapper">
                                             {/* {thisEmployee.image.length < 1 ? ( */}
                                             <>
                                                  <BiImageAlt className="BiImageAlt" style={{ display: isEdit ? "none" : "block" }} />
                                                  <BiCamera style={{ display: !isEdit ? "none" : "block" }} />
                                             </>
                                             {/* ) : ( */}
                                             <>
                                                  <img src={thisEmployee.image} type="text" name="image" />
                                                  <BiCamera className="small-icon" style={{ display: isEdit && thisEmployee.image.length > 1 ? "block" : "none" }} onClick={clickCemeraIcon} />
                                             </>
                                             {/* )} */}
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
               {isSuccessPopup && <SuccessPopup elm={thisEmployee} closePopup={closePopup} />}
               {isDelPopup && <DeletePopup elm={thisEmployee} closePopup={closePopup} deletItem={deletItem} />}
               {isCamera && <FaceCamera setIsCamera={setIsCamera} />}
          </div>
     );
}

export default EachEmployee;
