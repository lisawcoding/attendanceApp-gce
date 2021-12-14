import React, { useContext, useState, useRef } from "react";
import { BiCamera } from "react-icons/bi";
import { URLContext } from "../../contexts/URLContext";
import "./CreateEmployee.scss";
import { DataContext } from "../../contexts/DataContext";
import { FunctionContext } from "../../contexts/FunctionContext";
import FaceCamera from "../FaceCamera/FaceCamera";
import SuccessPopup from "../SuccessPopup";

function CreateEmployee(props) {
     const { usersURL, options } = useContext(URLContext);
     const { thisUser,InitEmployeeInputs, setIsLoading } = useContext(DataContext);
     const { reIssueToken, fetchUser } = useContext(FunctionContext);
     const [isCamera, setIsCamera] = useState(false);
     const submitBtnRef = useRef();
     const formRef = useRef();
     const [thisEmployee, setThisEmployee] = useState(InitEmployeeInputs);
     const [isSuccessPopup, setIsSuccessPopup] = useState(false);

     const createEmployee = () => {
          fetch(`${usersURL}/${thisUser._id}/employees`, options("POST", thisEmployee))
          .then((res) => res.json())
          .then(async (data) => {
               console.log(data);
               if (data.error) {
                    await reIssueToken(props);
                    createEmployee();
               } else {
                    setIsLoading(true);
                    fetchUser();
                    setIsSuccessPopup(true);
               }
          })
          .catch((err) => console.error(err));
     };

     const submitForm = (e) => {
          e.preventDefault();

          // var fd = new FormData(formRef.current);
          // fd.forEach((value, key) => (fd[key] = value));
          createEmployee();
     };

     const changeInput = (e) => setThisEmployee({ ...thisEmployee, [e.target.name]: e.target.value });

     return (
          <>
               <div id="CreateEmployee" className="center">
                    <div className="card">
                         <form onSubmit={submitForm} className="employeeForm" ref={formRef} autoComplete="false">
                              <section className="img-wrapper">
                                   {thisEmployee.image.length < 1 ? (
                                        <BiCamera
                                             className="BiCamera"
                                             onClick={() => {
                                                  setIsCamera(true);
                                             }}
                                        />
                                   ) : (
                                        <img src={thisEmployee.image} type="text" name="image" className="check" />
                                   )}
                              </section>

                              <section className="info-div">
                                   <label>
                                        <span>name</span>
                                        <input type="text" name="name" onChange={changeInput} required value={thisEmployee.name} />
                                   </label>
                                   <label>
                                        <span>password</span>
                                        {/* <input type="password" pattern="[a-zA-Z0-9]{8,}"> */}
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
                         </form>
                    </div>
               </div>
               {isSuccessPopup && <SuccessPopup closePopup={()=>{setIsSuccessPopup(false)}} action="created" pathname="/employees" />}
               {isCamera && <FaceCamera thisEmployee={thisEmployee} setThisEmployee={setThisEmployee} />}
          </>
     );
}

export default CreateEmployee;