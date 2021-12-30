import React, { useContext, useState, useRef } from "react";
import { BiCamera } from "react-icons/bi";
import { URLContext } from "../../contexts/URLContext";
import "./CreateEmployee.scss";
import { DataContext } from "../../contexts/DataContext";
import { FunctionContext } from "../../contexts/FunctionContext";
import FaceCamera from "../FaceCamera/FaceCamera";
import SuccessPopup from "../Common/SuccessPopup";
import { FormInfoDiv } from "../Common/FormInfoDiv";

function CreateEmployee(props) {
     const { usersURL, options } = useContext(URLContext);
     const { thisUser,InitEmployeeInputs, setIsLoading } = useContext(DataContext);
     const { reIssueToken, fetchUser } = useContext(FunctionContext);
     const [isCamera, setIsCamera] = useState(false);
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

          // var obj={};
          // var fd = new FormData(formRef.current);
          // fd.forEach((value, key) => (obj[key] = value));
          createEmployee();
     };

     const changeInput = (e) => setThisEmployee({ ...thisEmployee, [e.target.name]: e.target.value });

     const clickCameraIcon = () => setIsCamera(true)

     return (
          <>
               <div id="CreateEmployee" className="center">
                    <form onSubmit={submitForm} ref={formRef} autoComplete="false" className="card">
                         <fieldset className="employeeForm">
                              <section className="img-wrapper">
                                   {thisEmployee.image.length < 1 ? 
                                        <BiCamera className="BiCamera" onClick={clickCameraIcon} />:
                                        <img src={thisEmployee.image} name="image" className="check" alt={thisEmployee.name} />
                                   }
                              </section>
                              <FormInfoDiv changeInput={changeInput} thisEmployee={thisEmployee} />
                         </fieldset>
                    </form>
               </div>
               {isSuccessPopup && <SuccessPopup closePopup={()=>{setIsSuccessPopup(false)}} action="created" pathname="/employees" />}
               {isCamera && <FaceCamera thisEmployee={thisEmployee} setThisEmployee={setThisEmployee} />}
          </>
     );
}

export default CreateEmployee;