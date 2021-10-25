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
     const { thisUser, setThisUser } = useContext(DataContext);

     return (
          <main id="User">
               {thisUser && (
                    <div>
                         <h1>{thisUser.name}</h1>
                         <p>email: {thisUser.email}</p>
                    </div>
               )}
          </main>
     );
}

export default User;
