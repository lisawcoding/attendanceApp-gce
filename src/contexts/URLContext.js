import React, { useState, createContext } from "react";

export const URLContext = createContext();

export function URLProvider(props) {
     const authOrigin = `http://localhost:9002`;
     const origin = "http://localhost:9001"

     const registerURL = `${authOrigin}/register`
     const loginURL =`${authOrigin}/login`
     const updatdPasswordURL = `${authOrigin}/update_password`
     const logoutURL = `${authOrigin}/logout`
     const reIssueTokenURL = `${authOrigin}/reIssueToken`

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
                    options
                    // getEmployeesURL
               }}
          >
               {props.children}
          </URLContext.Provider>
     );
}
