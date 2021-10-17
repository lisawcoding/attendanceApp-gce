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
    runFetch(
      `${usersURL}/find`,
      "POST",
      { email: e.target.email.value },
      function (data) {
        //check if email already exist
        btnRef.current.disabled = false;
        if (data != null)
          return setAlert([props.t(`the email is taken. Try another.`)]);

        // check if passwords are indentical
        if (e.target.password.value !== e.target.password2.value) {
          return setAlert([props.t("Those passwords didn’t match. Try again")]);
        }
        btnRef.current.disabled = true;
        console.log("after if return");

        //send token email
        emailToken();
      }
    );
  };

  const emailToken = () => {
    setAlert([]);
    var fd = new FormData(formRef.current);
    fd.forEach((value, key) => (fd[key] = value));
    console.log(fd);
    setInputValue(fd);

    runFetch(mailURL, "POST", fd, function (data) {
      data.status.toLowerCase().indexOf("success") !== -1 &&
        setIsSentMail(true);
    });
  };

  const AddUser = () => {
    runFetch(usersURL, "POST", inputValue);
    // fetch(usersURL, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(inputValue),
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data))
    //   .catch((err) => console.error(err));
  };

  const createAccount = (e) => {
    e.preventDefault();

    runFetch(
      `${mailURL}/auth`,
      "POST",
      inputValue,
      function (data) {
        if (data.status.toLowerCase().indexOf("success") !== -1) {
          AddUser();
          setIsSignUpSuccess(true);
        } else {
          setAlert(data.info.message);
        }
      },
      e.target.token.value
    );

    // fetch(`${mailURL}/auth`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${e.target.token.value}`,
    //   },
    //   body: JSON.stringify(inputValue),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     if (data.status.toLowerCase().indexOf("success") !== -1) {
    //       AddUser();
    //       setIsSignUpSuccess(true);
    //     } else {
    //       setAlert(data.info.message);
    //     }
    //   })
    //   .catch((err) => console.error(err));
  };

  const changeInput = (e) => {
    console.log(e.target.value);
    setAlert([]);
    setToken(e.target.value);
  };

  const clickBtn = (e) => {
    console.log("clickBtn");
  };

  return (
    <>
      {!isSentMail ? (
        <form onSubmit={sendMail} ref={formRef}>
          <input type="text" name="name" placeholder="name" required />
          <input type="email" name="email" placeholder="email" required />
          <input
            type="password"
            name="password"
            placeholder="password"
            required
          />
          <input
            type="password"
            name="password2"
            placeholder="confirm password"
            required
          />
          <input
            type="submit"
            value={props.t("next")}
            // disabled={alert.length > 0 && true}
            onClick={clickBtn}
            ref={btnRef}
          />
          {alert.map((alert, i) => (
            <h1 className="alert-text" key={`singup-alert-${i}}`}>
              {alert}
            </h1>
          ))}
        </form>
      ) : !isSignUpSuccess ? (
        <form onSubmit={createAccount}>
          <input
            type="text"
            name="token"
            placeholder={props.t("verify token")}
            defaultValue=""
            required
            onChange={changeInput}
            className={alert.length > 0 ? "red-border" : ""}
          />
          {token.length < 1 && (
            <>
              <h1 className="success-text">
                {props.t(
                  "verify token has been sent to your email, please check youre email and verify"
                )}
              </h1>
              <h1 className="success-text">
                {props.t("please enter token to verify your account")}
              </h1>
              <h1 className="success-text">
                {props.t("the token will be expired within 10mins")}
              </h1>
            </>
          )}
          {alert.length > 0 && (
            <h1 className="alert-text">{props.t(`${alert}`)}!</h1>
          )}

          <input type="submit" value={props.t("verify")} />
        </form>
      ) : (
        <div
          className="congratulations-div"
          style={{ backgroundImage: `URL(${congratulations})` }}
        >
          {/* <img src={congratulations} alt="congratulations" /> */}
          {/* <div className="content-div"> */}
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
          {/* <input onClick={()=>{props.setIsLogin(true)}} value={props.t("login")}/> */}
          {/* </div> */}
        </div>
      )}
    </>
  );
}

export default SignUp;
