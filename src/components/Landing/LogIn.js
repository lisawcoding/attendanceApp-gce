import { useContext, useRef } from "react";
import { useState } from "react/cjs/react.development";
import { DataContext } from "../../contexts/DataContext";
import { FunctionContext } from "../../contexts/FunctionContext";
import { URLContext } from "../../contexts/URLContext";
import ChangePW from "./ChangePW";
import Input from "../Common/Input";

function LogIn(props) {
     const { loginURL} = useContext(URLContext);
     const { setThisUser } = useContext(DataContext);
     const formRef = useRef();
     const btnRef = useRef();
     const fieldsetRef = useRef();
     const [alert, setAlert] = useState([]);

     const onSubmit = (e) => {
          e.preventDefault();
          btnRef.current.disabled=true;

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
               .then(res => res.json())
               .then(data => {
                    console.log(data);
                    if (data.error != undefined) return setAlert(data.error);
                    if (data.success) {
                         sessionStorage.setItem("accessToken", data.accessToken);
                         sessionStorage.setItem("refreshToken", data.refreshToken);
                         setThisUser(data.user);
                         props.props.history.push("/home");
                         return;
                    }
                    window.location.reload();
               })
               .catch((err) =>{ 
                    console.log(err);
                    console.log(err);
                    if(!navigator.onLine) return setAlert("network error, please check your nework connection.");
                    
                    if(err) window.location.reload()
                    // window.location.reload();
                    // detect if network aceesss faluire
               });
     };

     const changeInput = (e) => {
          setAlert([]);
          btnRef.current.disabled = false;
     };

     return (
          <form ref={formRef} onSubmit={onSubmit} className="login-form">
               <Input name="email" type="email" placeholder="email..." handleChange={changeInput} required autoFocus />
               <Input type="password" name="password" placeholder="password" handleChange={changeInput} required />
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
     );
}

export default LogIn;
