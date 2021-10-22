import React, { useContext, useEffect, useLayoutEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaPen, FaTrash } from "react-icons/fa";
import { BiCamera, BiImageAlt } from "react-icons/bi";
import EachEmployee_form from "./EachEmployee_form";

import "./EachEmployee.scss";
import { URLContext } from "../../contexts/URLContext";
import { DataContext } from "../../contexts/DataContext";
import { InitContext } from "../../contexts/InitContext";

function EachEmployee(props) {
     const { thisEmployee, setThisEmployee } = useContext(DataContext);
     const { employeesURL } = useContext(URLContext);
     const { employeeObj } = useContext(InitContext);
     const [edit, setEdit] = useState(false);
     const [inputValue, setInputValue] = useState(employeeObj);
     const formRef = useRef();
     const submitBtnRef = useRef();

     useLayoutEffect(() => {
          fetch(`${employeesURL}/${props.match.params.id}`)
               .then((res) => res.json())
               .then((data) => {
                    console.log(data);
                    //  setInputValue(data)
                    setThisEmployee(data.result);
               })
               .catch((err) => console.error(err));
     }, []);

     const clickEditBtn = (e) => setEdit(!edit);

     const clickDelBtn = () => {
          console.log(`${employeesURL}/${props.match.params.id}`);
          fetch(`${employeesURL}/${props.match.params.id}`, {
               method: "DELETE",
          })
               .then((res) => res.json())
               .then((data) => {
                    props.history.goBack();
                    console.log(data);
               })
               .catch((err) => console.error(err));
     };

     const uploadPhoto = (value) => {
          setInputValue({ ...inputValue, image: value });
     };

     const changeInput = (e) => {
          console.log(e.target.value);
          setInputValue({ ...inputValue, [e.target.name]: e.target.value });
     };
     const submitForm = (e) => {
          e.preventDefault();

          fetch(`${employeesURL}/${props.match.params.id}`, {
               method: "PUT",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify(inputValue),
          })
               .then((res) => res.json())
               .then((data) => {
                    setEdit(false);
               })
               .catch((err) => console.error(err));
     };

     return (
          <div id="EachEmployee" className={edit ? "input-active-div center" : "center"}>
               {/* <EachEmployee_form elm={inputValue} changeInput={changeInput} disabled={!edit} submitForm={submitForm} uploadPhoto={uploadPhoto} /> */}
               <div className="card">
                    <h1>each employee</h1>
                    <div className="but-div">
                         <FaPen onClick={clickEditBtn} />
                         <FaTrash onClick={clickDelBtn} />
                         <p>_id: {props.match.params.id}</p>
                    </div>
                    <form className="employeeForm" ref={formRef}>
                         <section className="img-wrapper">
                              {thisEmployee.image.length < 1 ? (
                                   <BiImageAlt className="BiImageAlt" />
                              ) : (
                                   // <Link to="/facecamera">
                                   //      <BiCamera className="BiCamera" />
                                   //
                                   // </Link>
                                   <img src={thisEmployee.image} type="text" name="image" />
                              )}
                         </section>

                         <section className="info-div">
                              <label>
                                   <span>name</span>
                                   <input type="text" name="name" onChange={changeInput} required value={thisEmployee.name} />
                              </label>
                              <label>
                                   <span>employee id</span>
                                   <input type="text" name="id" onChange={changeInput} value={thisEmployee.id} />
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
                    </form>
               </div>
          </div>
     );
}

export default EachEmployee;
