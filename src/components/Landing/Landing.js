import { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { GoogleLogin, GoogleLogout } from "react-google-login";

import "./Landing.scss";
import SignUp from "./SingUp/SignUp";
import LogIn from "./LogIn";
import ChangePW from "./ChangePW/ChangePW";
import { AuthContext } from "../../contexts/AuthContext";
import { URLContext } from "../../contexts/URLContext";

function Landing(props) {
     const { t } = useTranslation();
     const { googleLoginURL } = useContext( URLContext);
     const { userLogin } = useContext( AuthContext );
     const [isLoginTab, setIsLoginTab] = useState(true);
     const [isForgotPW, setIsForgotPW] = useState(false);
     const [ alert, setAlert ] = useState([]);

     const googleSuccess = async (res) => {
          const result = res.profileObj;
          try {
             console.log(res)  
             userLogin(props, googleLoginURL, result)
          } catch (err) {
               console.log("err: ", err)
          }
     }

     const googleFailure = (err) => {
          console.log("google failure: ", err)
          err.details && setAlert([...alert, err.details])
     }

     return (
          <main id="Landing">
               <section className="left-div">
                    <h1 className="hero-text">{t("attendance app")}</h1>
                    <GoogleLogin
                         clientId = {process.env.REACT_APP_GOOGLE_CLIENT_ID}
                         onSuccess={googleSuccess}
                         onFailure={googleFailure}
                         cookiePolicy="single_host_origin"
                         buttonText="Login 1"
                    />
                    {alert.length > 0 && <h1 className="alert-text">{t(`${alert}`)}!</h1>}
               </section>
               <section className="right-div">
                    <div className="tab-div">
                         <h1 className={!isLoginTab ? "selected-tab" : undefined} onClick={() => setIsLoginTab(false)}>
                              {t("create an account")}
                         </h1>
                         <h1 className={isLoginTab ? "selected-tab" : undefined} onClick={() => setIsLoginTab(true)}>
                              {isForgotPW ? t("change password") : t("login")}
                         </h1>
                    </div>
                    <div className="form-div">
                         {isLoginTab ? (
                              isForgotPW ? (
                                   <ChangePW t={t} setIsForgotPW={setIsForgotPW} />
                              ) : (
                                   <LogIn t={t} setIsForgotPW={setIsForgotPW} props={props} />
                              )
                         ) : (
                              <SignUp t={t} setIsLoginTab={setIsLoginTab} />
                         )}
                    </div>
               </section>
          </main>
     );
}

export default Landing;
