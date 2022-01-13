import { useContext } from "react";
import { useState } from "react/cjs/react.development";
import { URLContext } from "../../../contexts/URLContext";
import Congratulations from "../Congratulations";
import EmailForm from "./EmailForm";
import VerifyPWForm from "./VerifyPWForm";

function ChangePW({ t, setIsForgotPW}) {
     const { updatdPasswordURL, findUserURL, options, emailTokenURL } = useContext(URLContext);
     const [alert, setAlert] = useState([]);
     const [isSentMail, setIsSentMail] = useState(false);
     const [inputValue, setInputValue] = useState({});
     const [isSuccess, setIsSuccess] = useState(false);
     const [thisUser, setThisUser] = useState(null);
     const [disabled, setDisabled] = useState(false);
     const successText = t('your password has been updated');

     const changeInput = (e) => {
          setAlert([]);
          setDisabled(false);
          e.target.name !== "token" && setInputValue({ ...inputValue, [e.target.name]: e.target.value });
     };

     const sendEmail = (e) => {
          e.preventDefault();
          setDisabled(true);

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
                    if (!data) return setAlert([t("the eamil is invalid")]);
                    if (data.mailLimit > 20) return setAlert([t("request for too many tokens, the limit is 20 per email address")]);

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
          setDisabled(true);
          console.log("submitVerifyToken");

          // check if passwords are indentical
          if (e.target.password.value !== e.target.password2.value) return setAlert([t("Those passwords didn’t match")]);

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
                    <EmailForm sendEmail={sendEmail} changeInput={changeInput} t={t} disabled={disabled} />
               ) : !isSuccess ? (
                    <VerifyPWForm submitVerifyToken={submitVerifyToken} inputValue={inputValue} changeInput={changeInput} alert={alert} t={t} disabled={disabled} />
               ) : (
                    <Congratulations t={t} clickLoginBtn={()=>{setIsForgotPW(false)}} successText={successText}/> 
               )}
               {!isSuccess && <p className="link" onClick={() => { setIsForgotPW(false)}}></p>}
          </>
     );
}

export default ChangePW;
