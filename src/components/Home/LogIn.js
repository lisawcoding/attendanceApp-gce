import { useContext, useRef } from "react";
import { URLContext } from "../../contexts/URLContext";

function LogIn(props) {
  const { loginUR, usersURL } = useContext(URLContext);
  const formRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();

    var fd = new FormData(formRef.current);
    fd.forEach((value, key) => (fd[key] = value));
    console.log(fd);

    // fetch(usersURL, {
    //     method:"POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(fd)
    // })
    // .then(res=>res.json())
    // .then(data=>{
    //     console.log(data)
    // })
    // .catch(err=>console.error(err))

    // fetch(loginURL, {
    //     method:"POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         // "Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`
    //     },
    //     body: JSON.stringify()
    // })
    // .then(res=>res.json())
    // .then(data=>{
    //     console.log(data)
    // })
    // .catch(err=>console.error(err))
  };

  return (
    <form ref={formRef} onSubmit={onSubmit}>
      <input type="text" name="email" placeholder="email" />
      <input type="password" name="password" placeholder="password" />
      <div className="bottom-div">
        <label>
          <input type="checkbox" name="remeber" value="true" />
          <p>{props.t("remember me")}</p>
        </label>
        <a href="#">{props.t("forgot password")}?</a>
      </div>
      <input type="submit" value={props.t("login")} />
    </form>
  );
}

export default LogIn;
