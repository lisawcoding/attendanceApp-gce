import { useContext, useRef } from "react";
import { useState } from "react/cjs/react.development";
import { URLContext } from "../../../contexts/URLContext";
import congratulations from "../../../images/congratulations.jpg";

function ChangePW(props) {
     const { loginURL, usersURL, tokenURL, registerURL, updatdPasswordURL, findUserURL, options, emailTokenURL } = useContext(URLContext);
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

          fetch(findUserURL, {
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

                    //send email with token
                    delete data.password;
                    setThisUser(data);

                    fetch(emailTokenURL, options("POST", data) )
                    .then(res=>res.json())
                    .then(data => {
                         console.log(data)
                         if(data.error) return setAlert("mail sent failure");
                         setIsSentMail(true)                
                    })
                    setAlert([]);
               })
               .catch((err) => console.error(err));
     };

     const submitVerifyToken = (e) => {
          e.preventDefault();
          // btnRef.current.disabled = true;

          // check if passwords are indentical
          if (e.target.password.value !== e.target.password2.value) return setAlert([props.t("Those passwords didn’t match")]);

          fetch(updatdPasswordURL, {
               method: "PUT",
               headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${e.target.token.value}`,
               },
               body: JSON.stringify({ ...thisUser, password: e.target.password.value }),
          })
               .then((res) => res.json())
               .then((data) => {
                    console.log(data);

                    if (data.error) {
                         if (data.error.message.indexOf("expire") !== -1) {
                              setAlert("token expired");
                              setTimeout(() => {
                                   window.location.reload();
                                   return;
                              }, 1200);
                         } else {
                              return setAlert("invalid token");
                         }
                    } else {
                         setIsSuccess(true);
                    }
               })
               .catch((err) => console.error(err));
     };

     return (
          <>
               {!isSentMail ? (
                    <form className="sendMailForm" onSubmit={sendEmail}>
                         <input type="email" name="email" placeholder="email" onChange={changeInput} required />
                         <input type="submit" value={props.t("next")} />
                         {/* <button>{props.t("next")}</button> */}
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
                         <button onClick={() => {window.location.reload()}}>
                              {props.t("login")}
                         </button>
                         {/* <input type="submit" value={props.t("login")} onClick={window.location.reload()} /> */}
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
