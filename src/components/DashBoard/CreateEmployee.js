import React, { useContext, useState, useRef, useLayoutEffect, useEffect } from "react";
import { Link } from "react-router-dom";

import { InitContext } from "../../contexts/InitContext";
import { BiCamera } from "react-icons/bi";
import { URLContext } from "../../contexts/URLContext";
import "./CreateEmployee.scss";
import { DataContext } from "../../contexts/DataContext";
import { FunctionContext } from "../../contexts/FunctionContext";
import FaceCamera from "../FaceCamera/FaceCamera";

function CreateEmployee(props) {
     const { usersURL } = useContext(URLContext);
     const { thisUser, setThisUser, thisEmployee, setThisEmployee } = useContext(DataContext);
     const { reIssueToken } = useContext(FunctionContext);
     const { logout } = useContext(FunctionContext);
     const [isCamera, setIsCamera] = useState(false);
     const submitBtnRef = useRef();
     const formRef = useRef();

     useEffect(() => {
          return () => {
               window.location.reload();
          };
     }, []);

     const submitForm = (e) => {
          e.preventDefault();
          console.log("submit");

          // var fd = new FormData(formRef.current);
          // fd.append("image", imageBase64);
          // fd.forEach((value, key) => (fd[key] = value));
          const fetchEmployee = () => {
               fetch(`${usersURL}/${thisUser._id}/employees`, {
                    method: "POST",
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
                              fetchEmployee();
                              return;
                         } else {
                              props.history.push("/employees");
                              setThisUser({ ...thisUser, employees: data });
                              Object.keys(thisEmployee).map((key) => (thisEmployee[key] = ""));
                         }
                    })
                    .catch((err) => console.error(err));
          };
          fetchEmployee();
     };

     const changeInput = (e) => {
          setThisEmployee({ ...thisEmployee, [e.target.name]: e.target.value });
          // console.log(e.target.value);
          // // if(e.target.name==="image"){
          // //     if(e.target.files[0].size > 1006300) {
          // //         alert("image size exceed")
          // //     } else {
          // //         e.target.files.length>0 && setFile(URL.createObjectURL(e.target.files[0]));
          // //     }
          // // }
          // setInputValue({ ...inputValue, [e.target.name]: e.target.value });
     };

     const uploadPhoto = (value) => {
          // setInputValue({ ...inputValue, image: value });
     };

     return (
          <>
               <div id="CreateEmployee" className="center">
                    <div className="card">
                         <h1>create employee</h1>
                         <form onSubmit={submitForm} className="employeeForm" ref={formRef} autoComplete="false">
                              {/* <div>
                        <div ref={imgBoxRef} className="img-box" style={{position: "relative"}} >
                            <img ref={imgRef} />
                        </div>
                        <label htmlFor="upload-img" className="upload-btn-wrapper">
                            <ImFolderUpload />
                            <input id="upload-img" type="file" accept="image/*" placeholder="image" name="image" onChange={changeImgInput} ref={imgInputRef} />
                        </label>                        
                    </div> */}
                              <section className="img-wrapper">
                                   {thisEmployee.image.length < 1 ? (
                                        // <Link to="/facecamera"></Link>
                                        <BiCamera
                                             className="BiCamera"
                                             onClick={() => {
                                                  setIsCamera(true);
                                             }}
                                        />
                                   ) : (
                                        <img src={thisEmployee.image} type="text" name="image" />
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
               {isCamera && <FaceCamera setIsCamera={setIsCamera} />}
          </>
     );
}

export default CreateEmployee;
