import { useContext, useRef } from "react";
import { useState } from "react/cjs/react.development";
import { FunctionContext } from "../../contexts/FunctionContext";
import { URLContext } from "../../contexts/URLContext";
import ChangePW from "./ChangePW";

function LogIn(props) {
     const { loginURL, usersURL, tokenURL, mailURL } = useContext(URLContext);
     const { runFetch } = useContext(FunctionContext);
     const formRef = useRef();
     const btnRef = useRef();
     const [alert, setAlert] = useState([]);

     const onSubmit = (e) => {
          e.preventDefault();
          // btnRef.current.disabled= true

          console.log("on submit");
          var fd = new FormData(formRef.current);
          fd.forEach((value, key) => (fd[key] = value));

          fetch(loginURL, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify(fd),
          })
               .then((res) => res.json())
               .then((data) => {
                    console.log(data);
                    if (data.error != undefined) return setAlert(data.error);
                    if (data.success) {
                         sessionStorage.setItem("accessToken", data.accessToken);
                         sessionStorage.setItem("refreshToken", data.refreshToken);
                         props.props.history.push("/home");
                    }
                    window.location.reload();
               })
               .catch((err) => console.error(err));
     };

     const changeInput = (e) => {
          setAlert([]);
          btnRef.current.disabled = false;
     };

     const deleteBtn = (e) => {
          console.log("click deleteBtn");
          fetch(`${usersURL}/delete`, {
               method: "DELETE",
               // headers: {
               //      "Content-Type": "application/json"
               // },
               // body: JSON.stringify()
          })
               .then((res) => res.json())
               .catch((err) => console.log(err));
     };

     return (
          <>
               <form ref={formRef} onSubmit={onSubmit}>
                    <input type="email" name="email" placeholder="email" onChange={changeInput} required />
                    <input type="password" name="password" placeholder="password" onChange={changeInput} required />
                    <div className="bottom-div">
                         <p
                              className="link"
                              onClick={() => {
                                   props.setIsForgotPW(true);
                              }}
                         >
                              {props.t("forgot password")}
                         </p>
                    </div>
                    {alert.length > 0 && <h1 className="alert-text">{props.t(`${alert}`)}!</h1>}
                    <input type="submit" value={props.t("login")} ref={btnRef} />
               </form>
               <button onClick={deleteBtn}>delete</button>
          </>
     );
}

export default LogIn;