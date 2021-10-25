import React, { useState, createContext } from "react";

export const URLContext = createContext();

export function URLProvider(props) {
     const [registerURL] = useState("http://localhost:9001/register");
     const [loginURL] = useState("http://localhost:9002/login");
     const [logoutURL] = useState("http://localhost:9002/logout");
     const [reIssueTokenURL] = useState("http://localhost:9002/reIssueToken");

     const [usersURL] = useState("http://localhost:9001/users");
     const [employeesURL] = useState("http://localhost:9001/employees");
     const [companiesURL] = useState("http://localhost:9001/companies");

     return (
          <URLContext.Provider
               value={{
                    registerURL,
                    usersURL,
                    loginURL,
                    reIssueTokenURL,
                    companiesURL,
                    logoutURL,
               }}
          >
               {props.children}
          </URLContext.Provider>
     );
}
