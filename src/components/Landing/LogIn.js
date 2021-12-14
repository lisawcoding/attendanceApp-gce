import { useContext, useRef } from "react";
import { useState } from "react/cjs/react.development";
import { DataContext } from "../../contexts/DataContext";
import { FunctionContext } from "../../contexts/FunctionContext";
import { URLContext } from "../../contexts/URLContext";
import ChangePW from "./ChangePW";

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
                    if(!navigator.onLine) return setAlert("network error");
                    
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
          </>
     );
}

export default LogIn;
