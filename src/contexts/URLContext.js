import React, { useState, createContext } from "react";

export const URLContext = createContext();

export function URLProvider(props) {
     const [employeesURL] = useState("http://localhost:9001/employees");
     const [mailURL] = useState("http://localhost:9001/mail");
     const [usersURL] = useState("http://localhost:9001/users");
     const [userEditURL] = useState("http://localhost:9001/users/edit");
     const [loginURL] = useState("http://localhost:9002/login");
     const [tokenURL] = useState("http://localhost:9002/token");

     return (
          <URLContext.Provider
               value={{
                    employeesURL,
                    mailURL,
                    usersURL,
                    loginURL,
                    tokenURL,
                    userEditURL,
               }}
          >
               {props.children}
          </URLContext.Provider>
     );
}
