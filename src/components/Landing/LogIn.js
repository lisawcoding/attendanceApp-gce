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
          btnRef.current.disabled = true;

          var fd = new FormData(formRef.current);
          fd.forEach((value, key) => (fd[key] = value));

          runFetch(`${usersURL}/find`, "POST", fd, function (data) {
               if (data == null) {
                    return setAlert(props.t("invalid email or password"));
               } else {
                    runFetch(loginURL, "POST", { email: e.target.email.value }, function (data) {
                         if (data.status.indexOf("success") !== -1) {
                              sessionStorage.setItem("refreshToken", data.refreshToken);
                              props.props.history.push("/home");
                              return;
                         }
                    });
               }
               // window.location.reload();
          });
     };

     const changeInput = (e) => {
          setAlert([]);
          btnRef.current.disabled = false;
     };

     return (
          <form ref={formRef} onSubmit={onSubmit}>
               <input type="email" name="email" placeholder="email" onChange={changeInput} required />
               <input type="password" name="password" placeholder="password" onChange={changeInput} required />
               <div className="bottom-div">
                    {/* <label>
                                   <input type="checkbox" name="remeber" value="true" />
                                   <p>{props.t("remember me")}</p>
                              </label> */}
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
