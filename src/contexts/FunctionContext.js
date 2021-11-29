import React, { useState, createContext, useContext } from "react";
import { URLContext } from "./URLContext";
import { DataContext } from "./DataContext";

export const FunctionContext = createContext();

export function FunctionProvider(props) {
     const { tokenURL, loginURL, usersURL, reIssueTokenURL, logoutURL, getUserURL, getEmployeesURL } = useContext(URLContext);
     const { thisUser, setThisUser,setAllEmployees, isLoading, setIsLoading, isReload, setIsReload } = useContext(DataContext);

     const logout = (props) => {
          sessionStorage.removeItem("accessToken");
          sessionStorage.removeItem("refreshToken");

          fetch(logoutURL, {
               method: "DELETE",
          })
          .then((res) => res.json())
          .then((data) => console.log(data))
          .catch((err) => console.error(err));
          props.history.push("/");
     };

     const reIssueToken = async (props) => {
          console.log("reissue action");
          await fetch(`${reIssueTokenURL}`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("refreshToken")}`,
               },
          })
               .then((res) => res.json())
               .then((data) => {
                    console.log(data);
                    if (data.error) return logout(props);
                    if (data.accessToken) sessionStorage.setItem("accessToken", data.accessToken);
               })
               .catch((err) =>{ 
                    console.error({ "reIssueToken error": err });
                    logout(props)
               });
     };

     //get User and Employees
     const getEmployees = (data) => {
          fetch(`${usersURL}/${data._id}/employees`, {})
               .then((res) => res.json())
               .then(async (data) => {
                    console.log(data);
                    if (data.error) {
                         reIssueToken(props);
                    } else {
                         await setAllEmployees(data);
                         setIsLoading(false);
                    }
               })
               .catch((err) => console.error(err));
     };

     const fetchUser = (props) => {
          console.log("run fetchUser")
          fetch(getUserURL, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
               },
          })
               .then((res) => res.json())
               .then(async (data) => {
                    console.log("fetchUser: ", data);
                    if (data.error) {
                         await reIssueToken(props);
                         fetchUser();
                         return;
                    } else {
                         delete data.password;
                         setThisUser(data);
                         getEmployees(data);
                         return data
                    }
               })
               .catch((err) => console.error(err));
     };
     //get User and Employees

     return (
          <FunctionContext.Provider
               value={{
                    reIssueToken,
                    logout,
                    fetchUser
               }}
          >
               {props.children}
          </FunctionContext.Provider>
     );
}