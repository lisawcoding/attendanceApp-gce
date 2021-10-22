import { useContext, useRef } from "react";
import { useState } from "react/cjs/react.development";
import { FunctionContext } from "../../contexts/FunctionContext";
import { URLContext } from "../../contexts/URLContext";
import congratulations from "../../images/congratulations.jpg";

function ChangePW(props) {
     const { loginURL, usersURL, tokenURL, mailURL, userEditURL } = useContext(URLContext);
     const { runFetch } = useContext(FunctionContext);
     const btnRef = useRef();
     const [alert, setAlert] = useState([]);
     const [isSentMail, setIsSentMail] = useState(false);
     const [inputValue, setInputValue] = useState({ password: "" });
     const [isSuccess, setIsSuccess] = useState(false);

     const changeInput = (e) => {
          setAlert([]);
          btnRef.current.disabled = false;

          e.target.name.indexOf("password") !== -1 && setInputValue({ ...inputValue, [e.target.name]: e.target.value });
     };

     const sendEamil = (e) => {
          e.preventDefault();
          btnRef.current.disabled = true;

          runFetch(`${usersURL}/find`, "POST", { email: e.target.email.value }, function (data) {
               //check if email already exist
               if (!data) return setAlert([props.t("the eamil is invalid")]);
               //send token email
               console.log(data);
               //    delete data.password;
               emailToken(data);

               return;
          });
     };

     const emailToken = (elm) => {
          console.log("elm: ", elm);
          setAlert([]);

          runFetch(mailURL, "POST", elm, function (data) {
               if (data.status.toLowerCase().indexOf("success") !== -1) {
                    setIsSentMail(true);
                    delete elm.password;
                    setInputValue({ ...inputValue, ...elm });
               }
          });
     };

     const submitVerifyToken = (e) => {
          e.preventDefault();
          btnRef.current.disabled = true;

          // check if passwords are indentical
          if (e.target.password.value !== e.target.password2.value) return setAlert([props.t("Those passwords didn’t match")]);

          runFetch(
               `${mailURL}/auth`,
               "POST",
               inputValue,
               function (data) {
                    if (data.status.toLowerCase().indexOf("success") === -1) {
                         if (data.result.message && data.result.message.toLowerCase().indexOf("expire") !== -1) {
                              return setAlert("token expired");
                         } else {
                              return setAlert("invalid token");
                         }
                    }
                    // edit this user
                    runFetch(`${usersURL}/${inputValue._id}`, "PUT", { password: inputValue.password }, function (data) {
                         data.status.indexOf("success") !== -1 && setIsSuccess(true);
                    });
               },
               e.target.token.value
          );
     };

     return (
          <>
               {!isSentMail ? (
                    <form className="sendMailForm" onSubmit={sendEamil}>
                         <input type="email" name="email" placeholder="email" onChange={changeInput} required />
                         <input type="submit" value={props.t("next")} ref={btnRef} />
                         {alert.length > 0 && <h1 className="alert-text">{props.t(`${alert}`)}!</h1>}
                    </form>
               ) : !isSuccess ? (
                    <form onSubmit={submitVerifyToken}>
                         <input type="email" name="email" placeholder={inputValue.email} disabled />
                         <input type="text" name="password" placeholder="password" value={inputValue.password} onChange={changeInput} disabled={false} />
                         <input type="text" name="password2" placeholder="confirm password" onChange={changeInput} />
                         <textarea type="text" name="token" placeholder={props.t("verify token")} required rows="5" onChange={changeInput} />
                         <input type="submit" value={props.t("reset password")} ref={btnRef} disabled={false} />
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
