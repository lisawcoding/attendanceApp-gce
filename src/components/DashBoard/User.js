import { useLayoutEffect, useContext, useState } from "react";
import { NavLink, withRouter } from "react-router-dom";

import logo from "../../images/logo.png";
// import "../Home/Home.scss";
import dashboard from "../../images/dashboard.png";
import clockIn from "../../images/clockIn.png";
import "./User.scss";
import { FunctionContext } from "../../contexts/FunctionContext";
import { URLContext } from "../../contexts/URLContext";
import { DataContext } from "../../contexts/DataContext";

function User(props) {
     const { usersURL } = useContext(URLContext);
     const { thisUser, setThisUser } = useContext(DataContext);
     const { reIssueToken } = useContext(FunctionContext);
     const [isEdit, setIsEdit] = useState(false);
     const [setting, setSetting] = useState(thisUser.setting);

     const clickTimeInput = (e) => {
          console.log({ [e.target.name]: e.target.value });
          setSetting({ ...setting, [e.target.name]: e.target.value });
          // setThisUser({ ...thisUser, setting: { ...thisUser.setting, [e.target.name]: e.target.value } });
     };

     const updateUserSetting = (e) => {
          e.preventDefault();

          const fetchUser = () => {
               console.log("fetchUser");
               fetch(usersURL, {
                    method: "PUT",
                    headers: {
                         "Content-Type": "application/json",
                         Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
                    },
                    body: JSON.stringify({ setting: setting }),
                    // body: JSON.stringify({ setting: thisUser.setting }),
               })
                    .then((res) => res.json())
                    .then(async (data) => {
                         console.log(data);
                         if (data.error) {
                              await reIssueToken(props);
                              fetchUser();
                              return;
                         }
                         window.location.reload();
                    })
                    .catch((err) => console.error(err));
          };
          fetchUser();
     };

     const clickEditBtn = () => {
          setSetting(thisUser.setting);
          setIsEdit(!isEdit);
     };

     return (
          <main id="User">
               {thisUser.name && (
                    <>
                         <section>
                              <h1>Basic Information: </h1>
                              <p>user name: {thisUser.name}</p>
                              <p>email: {thisUser.email}</p>
                              <p>change password</p>
                         </section>
                         <hr />
                         <section>
                              <h1>Setting: </h1>
                              <p>
                                   Office hours are {thisUser.setting.timeIn} to {thisUser.setting.timeOut}
                                   <button onClick={clickEditBtn}>edit</button>
                              </p>
                              {isEdit && (
                                   <form onSubmit={updateUserSetting}>
                                        <label htmlFor="timeIn">
                                             Choose a time for time in:
                                             <input type="time" name="timeIn" onChange={clickTimeInput} value={setting.timeIn} max={setting.timeOut} />
                                             {/* <input type="time" name="timeIn" onChange={clickTimeInput} value={thisUser.setting.timeIn} max={thisUser.setting.timeOut} /> */}
                                        </label>
                                        <label htmlFor="timeOut">
                                             Choose a time for time out:
                                             {/* <input type="time" name="timeOut" onChange={clickTimeInput} value={thisUser.setting.timeOut} min={thisUser.setting.timeIn} /> */}
                                             <input type="time" name="timeOut" onChange={clickTimeInput} value={setting.timeOut} min={setting.timeIn} />
                                        </label>
                                        {/* {setting !== thisUser.setting && <button onClick={updateUserSetting}>confirm</button>} */}
                                        <button className="confirm-btn" disabled={setting == thisUser.setting && true}>
                                             confirm
                                        </button>
                                   </form>
                              )}
                         </section>
                    </>
               )}
          </main>
     );
}

export default User;
