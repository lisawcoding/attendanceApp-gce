import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { DataContext } from "../../contexts/DataContext";
import { URLContext } from "../../contexts/URLContext";
import Input from "../Common/Input";

function LogIn(props) {
     const { loginURL} = useContext(URLContext);
     const { setThisUser, alert, setAlert } = useContext(DataContext);
     const { userLogin } = useContext(AuthContext);
     const formRef = useRef();
     const btnRef = useRef();
     // const [alert, setAlert] = useState([]);

     // const fetchUserLogin = (fd) => {
     //      fetch(loginURL, {
     //           method: "POST",
     //           headers: {
     //                "Content-Type": "application/json",
     //           },
     //           body: JSON.stringify(fd),
     //      })
     //      .then(res =>{ 
     //           if(!res.ok) throw Error("could not fetch the data for that resource")
     //           return res.json()
     //      })
     //      .then(data => {
     //           console.log(data);
     //           if (data.error != undefined) return setAlert(data.error);
     //           if (data.success) {
     //                sessionStorage.setItem("accessToken", data.accessToken);
     //                sessionStorage.setItem("refreshToken", data.refreshToken);
     //                setThisUser(data.user);
     //                props.props.history.push("/home");
     //                return;
     //           }
     //           window.location.reload();
     //      })
     //      .catch((err) =>{ 
     //           console.log(err);
     //           console.log(err.message)
     //           if(!navigator.onLine) return setAlert("network error, please check your nework connection.");
     //           setAlert(err.message)
     //           // if(err) window.location.reload()
     //           // window.location.reload();
     //           // detect if network aceesss faluire
     //      });
     // }

     const onSubmit = async (e) => {
          e.preventDefault();
          btnRef.current.disabled=true;

          console.log("on submit");

          var formData = new FormData(formRef.current);
          formData.forEach((value, key) => (formData[key] = value));
          // fetchUserLogin(formData)
          userLogin(props, formData)
          // console.log(data)
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
                    <p className="link" onClick={() => { props.setIsForgotPW(true);}}>
                         {props.t("forgot password")}
                    </p>
               </div>
               {alert.length > 0 && <h1 className="alert-text">{props.t(`${alert}`)}!</h1>}
               <input type="submit" value={props.t("login")} ref={btnRef} />
          </form>
     );
}

export default LogIn;
