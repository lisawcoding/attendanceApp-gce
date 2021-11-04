import React, { useState, createContext, useContext } from "react";
import { Redirect } from "react-router";
import { URLContext } from "./URLContext";

export const FunctionContext = createContext();

export function FunctionProvider(props) {
     const { tokenURL, loginURL, usersURL, reIssueTokenURL, logoutURL } = useContext(URLContext);

     const runFetch = (url, method, body, action, auth) => {
          fetch(url, {
               method: method,
               headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth}`,
               },
               body: JSON.stringify(body),
          })
               .then((res) => res.json())
               .then((data) => {
                    console.log(`fetch data (${url}): `, data);
                    action(data);
               })
               .catch((err) => console.error(err));
     };

     const verifiedToken = (action) => {
          fetch(tokenURL, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("refreshToken")}`,
               },
          })
               .then((res) => res.json())
               .then((data) => {
                    console.log(data);
                    if (data.status.indexOf("success") === -1) {
                         // props.history.push("/");
                    } else {
                         action();
                    }
               })
               .catch((err) => console.error(err));
     };

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
                    if (data.accessToken) {
                         sessionStorage.setItem("accessToken", data.accessToken);
                         console.log(data.accessToken);
                    }
               })
               .catch((err) => console.error({ "reIssueToken error": err }));
          // window.location.reload();
     };

     return (
          <FunctionContext.Provider
               value={{
                    verifiedToken,
                    runFetch,
                    reIssueToken,
                    logout,
               }}
          >
               {props.children}
          </FunctionContext.Provider>
     );
}
