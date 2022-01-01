import { useRef, useContext, useState } from "react";
import { URLContext } from "../../../contexts/URLContext";
import Input from "../../Common/Input";
import Congratulations from "./Congratulations";

function SignUp({setIsLogin, t}) {
     const formRef = useRef();
     const { emailTokenURL, findUserURL, createUsersURL } = useContext(URLContext);
     const [isSentMail, setIsSentMail] = useState(false);
     const [alert, setAlert] = useState([]);
     const [token, setToken] = useState("");
     const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
     const [inputValue, setInputValue] = useState(null);
     const mailSuccessMsg = [
          "verify token has been sent to your email, please check youre email and verify", 
          "please enter token to verify your account",
          "the token will be expired within 10mins"
     ]
     const btnRef = useRef();

     const changeInput = (e) => {
          setAlert([]);
          btnRef.current.disabled = false;
          
          if (e.target.name === "token") setToken(e.target.value);
     };

     const clickNextBtn = (e) => {
          e.preventDefault();
          if (e.target.password.value !== e.target.password2.value) return setAlert([t("Those passwords didn't match")]);

          let obj={}
          let fd = new FormData(formRef.current);
          fd.forEach((value, key) => obj[key] = value);
          setInputValue(obj)
          findExistUser(obj);
          btnRef.current.disabled = true;
     };

     const findExistUser = (obj) => {
          console.log(obj)
          console.log({ email: obj.email })

          fetch( findUserURL, {
               method: "POST", 
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify({ email: obj.email }),
          })
          .then( res => res.json())
          .then( data => {
               console.log(data)
               if (data) return setAlert([t(`the email is taken. Try another.`)]);//if email already exist
               setIsSentMail(true);
               setAlert([])       
               emailToken(obj)             
          })
          .catch( err => console.error(err))          
     }

     const emailToken = (data) => {
          console.log(data)
          fetch(emailTokenURL, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify(data)
          })
          .then( res => res.json())
          .then( data => {
               console.log(data)//token
               // if(data.error) return window.location.reload()
          })
          .catch( err => console.error(err))          
     }

     const createAccount = (e) => {
          e.preventDefault();
          
          btnRef.current.disabled = true;
          fetch( createUsersURL , {
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
                              return setAlert(["token expired"]);
                         } else {
                              return setAlert(["invalid token"]);
                         }
                    }
                    setIsSignUpSuccess(true);
               })
               .catch((err) => {
                    console.error(err);
                    setAlert(["wrong token"])
               });
     };

     const clickLoginBtn = () => setIsLogin(true);

     return (
          <>
          {!isSentMail ? (
               <form onSubmit={clickNextBtn} ref={formRef}>
                    <Input type="text" name="name" placeholder="name" required handleChange={changeInput} autoFocus />
                    <Input type="email" name="email" placeholder="email" required handleChange={changeInput} />
                    <Input type="text" name="companyName" placeholder="company name" handleChange={changeInput} />
                    <Input type="password" name="password" placeholder="password" required handleChange={changeInput} />
                    <Input type="password" name="password2" placeholder="confirm password" required handleChange={changeInput} />
                    <input type="submit" value={t("next")} ref={btnRef}/>
                    {alert.map((alert, i) => 
                         <h1 className="alert-text" key={`${i}-${alert}`}>{alert}</h1>
                    )}
               </form>
          ) : !isSignUpSuccess ? (
               <form onSubmit={createAccount}>
                    <textarea type="text" name="token" placeholder={t("enter token")} required onChange={changeInput} className={alert.length > 0 ? "red-border" : ""} rows="5" />
                    {token.length < 1 &&  mailSuccessMsg.map((msg, i)=> 
                         <h1 key={`${i}-${msg}`} className="success-text">{t(msg)}</h1>
                    )}
                    {alert.length > 0 && 
                         <h1 className="alert-text">{t(`${alert}`)}!</h1>
                    }
                    <input type="submit" value={t("verify")} ref={btnRef} />
               </form>
          ) : (
               <Congratulations t={t} clickLoginBtn={clickLoginBtn} />
          )}
          </>
     );
}

export default SignUp;
