import React, { useState, createContext } from "react";

export const URLContext = createContext();

export function URLProvider(props) {
     const [registerURL] = useState("http://localhost:9002/register");
     const [loginURL] = useState("http://localhost:9002/login");
     const [updatdPasswordURL] = useState("http://localhost:9002/update_password");
     const [logoutURL] = useState("http://localhost:9002/logout");
     const [reIssueTokenURL] = useState("http://localhost:9002/reIssueToken");

     const [usersURL] = useState("http://localhost:9001/users");
     const [findUserURL] = useState("http://localhost:9001/users/find");
     const [getUserURL] = useState("http://localhost:9001/users/get");
     // const [createEmployeeURL] = useState("http://localhost:9001/createEmployee");
     // const [employeesURL] = useState("http://localhost:9001/employees");
     // const [companiesURL] = useState("http://localhost:9001/companies");

     return (
          <URLContext.Provider
               value={{
                    registerURL,
                    usersURL,
                    loginURL,
                    updatdPasswordURL,
                    reIssueTokenURL,
                    getUserURL,
                    findUserURL,

                    // companiesURL,
                    logoutURL,
                    // createEmployeeURL,
               }}
          >
               {props.children}
          </URLContext.Provider>
     );
}
