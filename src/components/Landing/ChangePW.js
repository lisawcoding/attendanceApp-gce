import { useContext, useRef } from "react";
import { useState } from "react/cjs/react.development";
import { FunctionContext } from "../../contexts/FunctionContext";
import { URLContext } from "../../contexts/URLContext";
import congratulations from "../../images/congratulations.jpg";

function ChangePW(props) {
     const { loginURL, usersURL, tokenURL, registerURL } = useContext(URLContext);
     const { runFetch } = useContext(FunctionContext);
     const btnRef = useRef();
     const [alert, setAlert] = useState([]);
     const [isSentMail, setIsSentMail] = useState(false);
     const [inputValue, setInputValue] = useState({
          // name: "",
          // email: "",
          // password: "",
          // password2: "",
     });
     const [isSuccess, setIsSuccess] = useState(false);
     const [thisUser, setThisUser] = useState(null);

     const changeInput = (e) => {
          setAlert([]);
          // btnRef.current.disabled = false;

          // e.target.name !== "token" && setInputValue({ ...inputValue, [e.target.name]: e.target.value });
     };

     const sendEmail = (e) => {
          e.preventDefault();
          // btnRef.current.disabled = true;

          fetch(`${usersURL}/find`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify({ email: e.target.email.value }),
          })
               .then((res) => res.json())
               .then((data) => {
                    console.log(data);
                    if (!data) return setAlert([props.t("the eamil is invalid")]);
                    if (data.mailLimit > 20) return setAlert([props.t("request for too many tokens, the limit is 20 per email address")]);

                    //email ok and send token mail
                    delete data.password;
                    // setInputValue(data);
                    setThisUser(data);
                    runFetch(`${registerURL}/mail`, "POST", data, function (data) {
                         if (data.status.toLowerCase().indexOf("success") !== -1) {
                              setIsSentMail(true);
                         } else {
                              setAlert("mail sent failure");
                         }
                    });
                    setAlert([]);
               })
               .catch((err) => console.error(err));
     };

     const submitVerifyToken = (e) => {
          e.preventDefault();
          // btnRef.current.disabled = true;

          // check if passwords are indentical
          if (e.target.password.value !== e.target.password2.value) return setAlert([props.t("Those passwords didn’t match")]);

          runFetch(
               `${registerURL}/auth`,
               "POST",
               { email: e.target.email.value },
               function (data) {
                    if (data.status.toLowerCase().indexOf("success") === -1) {
                         if (data.result.message && data.result.message.toLowerCase().indexOf("expire") !== -1) {
                              return setAlert("token expired");
                         } else {
                              return setAlert("invalid token");
                         }
                    }

                    // update user password and mail
                    console.log({ ...thisUser, password: e.target.password.value });
                    fetch(`${usersURL}/mailLimit`, {
                         method: "PUT",
                         headers: {
                              "Content-Type": "application/json",
                         },
                         body: JSON.stringify({ ...thisUser, password: e.target.password.value }),
                    })
                         .then((res) => res.json())
                         .then((data) => {
                              console.log(data);
                              setIsSuccess(true);
                         })
                         .catch((err) => console.error(err));
               },
               e.target.token.value
          );
     };

     return (
          <>
               {!isSentMail ? (
                    <form className="sendMailForm" onSubmit={sendEmail}>
                         <input type="email" name="email" placeholder="email" onChange={changeInput} required />
                         <button>{props.t("next")}</button>
                         {alert.length > 0 && <h1 className="alert-text">{props.t(`${alert}`)}!</h1>}
                    </form>
               ) : !isSuccess ? (
                    <form onSubmit={submitVerifyToken}>
                         <input type="email" name="email" placeholder={inputValue.email} disabled />
                         <input type="text" name="password" placeholder="password" onChange={changeInput} />
                         <input type="text" name="password2" placeholder="confirm password" onChange={changeInput} />
                         <textarea type="text" name="token" placeholder={props.t("verify token")} required rows="5" onChange={changeInput} />
                         <input type="submit" value={props.t("reset password")} ref={btnRef} />
                         {alert.length > 0 && <h1 className="alert-text">{props.t(`${alert}`)}!</h1>}
                    </form>
               ) : (
                    <div className="congratulations-div" style={{ backgroundImage: `URL(${congratulations})` }}>
                         <div>
                              <h1>Success!</h1>
                              <p>Great! your password has been updated. </p>
                         </div>
                         <div className="check-circle"></div>
                         <button
                              onClick={() => {
                                   window.location.reload();
                              }}
                         >
                              {props.t("login")}
                         </button>
                    </div>
               )}
               {!isSuccess && (
                    <p
                         className="link"
                         onClick={() => {
                              props.setIsForgotPW(false);
                         }}
                    >
                         {props.t("login")}
                    </p>
               )}
          </>
     );
}

export default ChangePW;
