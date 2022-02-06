import { useContext, useRef } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { DataContext } from "../../contexts/DataContext";
import { URLContext } from "../../contexts/URLContext";
import Input from "../Common/Input";

function LogIn({t, setIsForgotPW, props}) {
     const { alert, setAlert } = useContext(DataContext);
     const { userLogin } = useContext(AuthContext);
     const { loginURL} = useContext(URLContext)
     const formRef = useRef();
     const btnRef = useRef();

     const onSubmit = async (e) => {
          e.preventDefault();
          console.log("on submit");
          btnRef.current.disabled=true;

          var formData = new FormData(formRef.current);
          formData.forEach((value, key) => (formData[key] = value));
          userLogin(props, loginURL, formData)
     };

     const changeInput = (e) => {
          setAlert([]);
          btnRef.current.disabled = false;
     };

     return (
          <form ref={formRef} onSubmit={onSubmit} className="login-form">
               <Input name="email" type="email" placeholder="email..." handleChange={changeInput} required autoFocus />
               <Input type="password" name="password" placeholder="password" handleChange={changeInput} required />
               <div className="bottom-div">
                    <p className="link" onClick={() => { setIsForgotPW(true)}}>
                         {t("forgot password")}
                    </p>
               </div>
               {alert.length > 0 && <h1 className="alert-text">{t(`${alert}`)}!</h1>}
               <input type="submit" value={t("login")} ref={btnRef} />
          </form>
     );
}

export default LogIn;
