import { useRef, useContext, useState } from "react";
import { URLContext } from "../../contexts/URLContext";
import { FunctionContext } from "../../contexts/FunctionContext";
import congratulations from "../../images/congratulations.jpg";

function SignUp(props) {
     const formRef = useRef();
     const { mailURL, usersURL } = useContext(URLContext);
     const { runFetch } = useContext(FunctionContext);
     const [isSentMail, setIsSentMail] = useState(false);
     const [alert, setAlert] = useState([]);
     const [inputValue, setInputValue] = useState({});
     const [token, setToken] = useState("");
     const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
     const btnRef = useRef();

     const sendMail = (e) => {
          e.preventDefault();

          btnRef.current.disabled = true;

          runFetch(`${usersURL}/find`, "POST", { email: e.target.email.value }, function (data) {
               //check if email already exist
               if (data) return setAlert([props.t(`the email is taken. Try another.`)]);
               // check if passwords are indentical
               if (e.target.password.value !== e.target.password2.value) return setAlert([props.t("Those passwords didn’t match")]);
               //send token email
               emailToken();
          });
     };

     const emailToken = () => {
          setAlert([]);

          var obj = {};
          var fd = new FormData(formRef.current);
          fd.forEach((value, key) => (obj[key] = value));

          runFetch(mailURL, "POST", obj, function (data) {
               if (data.status.toLowerCase().indexOf("success") !== -1) {
                    setIsSentMail(true);
                    setInputValue(obj);
               }
          });
     };

     const createAccount = (e) => {
          e.preventDefault();
          console.log(e.target.token.value);

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
                    //add this user
                    runFetch(usersURL, "POST", inputValue);
                    setIsSignUpSuccess(true);
                    console.log("add user");
               },
               e.target.token.value
          );
     };

     const changeInput = (e) => {
          console.log(e.target.value);
          setAlert([]);
          if (e.target.name === "token") return setToken(e.target.value);
          btnRef.current.disabled = false;
     };

     return (
          <>
               {!isSentMail ? (
                    <form onSubmit={sendMail} ref={formRef}>
                         <input type="text" name="name" placeholder="name" required />
                         <input type="email" name="email" placeholder="email" required onChange={changeInput} />
                         <input type="password" name="password" placeholder="password" required onChange={changeInput} />
                         <input type="password" name="password2" placeholder="confirm password" required onChange={changeInput} />
                         <input type="submit" value={props.t("next")} ref={btnRef} />
                         {alert.map((alert, i) => (
                              <h1 className="alert-text" key={`singup-alert-${i}}`}>
                                   {alert}
                              </h1>
                         ))}
                    </form>
               ) : !isSignUpSuccess ? (
                    <form onSubmit={createAccount}>
                         <textarea type="text" name="token" placeholder={props.t("verify token")} required onChange={changeInput} className={alert.length > 0 ? "red-border" : ""} rows="5" />
                         {token.length < 1 && (
                              <>
                                   <h1 className="success-text">{props.t("verify token has been sent to your email, please check youre email and verify")}</h1>
                                   <h1 className="success-text">{props.t("please enter token to verify your account")}</h1>
                                   <h1 className="success-text">{props.t("the token will be expired within 10mins")}</h1>
                              </>
                         )}
                         {alert.length > 0 && <h1 className="alert-text">{props.t(`${alert}`)}!</h1>}

                         <input type="submit" value={props.t("verify")} />
                    </form>
               ) : (
                    <div className="congratulations-div" style={{ backgroundImage: `URL(${congratulations})` }}>
                         <div>
                              <h1>Success!</h1>
                              <p>Great! your account has been created. </p>
                         </div>
                         <div className="check-circle"></div>
                         <button
                              onClick={() => {
                                   props.setIsLogin(true);
                              }}
                         >
                              {props.t("login")}
                         </button>
                    </div>
               )}
          </>
     );
}

export default SignUp;
