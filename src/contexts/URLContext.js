import React, { useState, createContext } from "react";

export const URLContext = createContext();

export function URLProvider(props) {
     // const authOrigin = `http://localhost:9002`;
     const authOrigin = `http://localhost:9001/auth`;
     const origin = "http://localhost:9001"

     const registerURL = `${authOrigin}/register`;
     const emailTokenURL = `${authOrigin}/register/mail`
     const loginURL =`${authOrigin}/login`
     const updatdPasswordURL = `${authOrigin}/update_password`
     const logoutURL = `${authOrigin}/logout`
     const reIssueTokenURL = `${authOrigin}/reIssueToken`
     const assignTokenURL = `${authOrigin}/register/assignToken`;

     const googleLoginURL = `${authOrigin}/googleLogin`;

     const usersURL = `${origin}/users`
     const createUsersURL = `${origin}/users/create`
     const findUserURL = `${origin}/users/find`
     const getUserURL= `${origin}/users/get`

     // const getEmployeesURL = `${usersURL}/${id}/employees`

     const options = (method, bodyData) => {
          return {
                    method: method ,
                    headers: {
                         "Content-Type": "application/json",
                         "Authorization": `Bearer ${sessionStorage.getItem(`accessToken`)}`,
                    },
                    body: JSON.stringify(bodyData),
               }               
          }


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
                    logoutURL,
                    createUsersURL,
                    emailTokenURL,
                    assignTokenURL,
                    googleLoginURL,
                    options
                    // getEmployeesURL
               }}
          >
               {props.children}
          </URLContext.Provider>
     );
}
