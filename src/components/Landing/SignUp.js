import { useRef, useContext, useState } from "react";
import { URLContext } from "../../contexts/URLContext";
import { FunctionContext } from "../../contexts/FunctionContext";
import congratulations from "../../images/congratulations.jpg";

function SignUp(props) {
     const formRef = useRef();
     const { registerURL, usersURL } = useContext(URLContext);
     const { runFetch } = useContext(FunctionContext);
     const [isSentMail, setIsSentMail] = useState(false);
     const [alert, setAlert] = useState([]);
     const [token, setToken] = useState("");
     const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
     const btnRef = useRef();
     const [inputValue, setInputValue] = useState({
          name: "",
          email: "",
          password: "",
          password2: "",
     });

     const sendMail = (e) => {
          e.preventDefault();

          // check if passwords are indentical
          if (e.target.password.value !== e.target.password2.value) return setAlert([props.t("Those passwords didn’t match")]);

          runFetch(`${usersURL}/find`, "POST", { email: inputValue.email }, function (data) {
               //if email already exist
               if (data) return setAlert([props.t(`the email is taken. Try another.`)]);
               //send token email
               runFetch(`${registerURL}/mail`, "POST", inputValue, function (data) {
                    if (data.status.toLowerCase().indexOf("success") !== -1) {
                         setIsSentMail(true);
                    }
               });
               setAlert([]);
          });
     };

     const createAccount = (e) => {
          e.preventDefault();

          fetch(`${usersURL}`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${e.target.token.value}`,
               },
               body: JSON.stringify(inputValue),
          })
               .then((res) => res.json())
               .then((data) => {
                    console.log(data);
                    if (data.error) {
                         if (data.error.message && data.error.message.toLowerCase().indexOf("expire") !== -1) {
                              return setAlert("token expired");
                         } else {
                              return setAlert("invalid token");
                         }
                    }
                    setIsSignUpSuccess(true);
               })
               .catch((err) => console.error(err));
     };

     const changeInput = (e) => {
          setInputValue({ ...inputValue, [e.target.name]: e.target.value });
          setAlert([]);
          if (e.target.name === "token") return setToken(e.target.value);
          btnRef.current.disabled = false;
     };

     const create = (e) => {
          fetch(`${usersURL}`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify({ name: "bb1", email: "bb1@bb.com", password: "12", password2: "12" }),
          })
               .then((res) => res.json())
               .then((data) => {
                    console.log(data);
                    // setIsEdit(false);
               })
               .catch((err) => console.error(err));
     };

     return (
          <>
               <button onClick={create}>create account</button>
               {!isSentMail ? (
                    <form onSubmit={sendMail} ref={formRef}>
                         <input type="text" name="name" placeholder="name" required onChange={changeInput} value={inputValue.name} />
                         <input type="email" name="email" placeholder="email" required onChange={changeInput} value={inputValue.email} />
                         <input type="text" name="companyName" placeholder="company name" required onChange={changeInput} value={inputValue.email} />
                         <input type="password" name="password" placeholder="password" required onChange={changeInput} value={inputValue.password} />
                         <input type="password" name="password2" placeholder="confirm password" required onChange={changeInput} value={inputValue.password2} />
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
