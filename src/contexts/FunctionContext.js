import React, { useState, createContext, useContext } from "react";
import { Redirect } from "react-router";
import { URLContext } from "./URLContext";

export const FunctionContext = createContext();

export function FunctionProvider(props) {
     const { tokenURL, loginURL, usersURL, reIssueTokenURL } = useContext(URLContext);

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

     function jwtPayload() {
          var tokens = sessionStorage.getItem("refreshToken").split(".");
          const payload = JSON.parse(atob(tokens[1]));
          return payload.user;
     }

     const reIssueToken = (props) => {
          fetch(`${reIssueTokenURL}`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("refreshToken")}`,
               },
          })
               .then((res) => res.json())
               .then((data) => {
                    console.log(data);
                    if (data.error) return props.history.push("/");
                    if (data.accessToken) sessionStorage.setItem("accessToken", data.accessToken);
               })
               .catch((err) => console.error(err));
     };

     return (
          <FunctionContext.Provider
               value={{
                    verifiedToken,
                    runFetch,
                    jwtPayload,
                    reIssueToken,
               }}
          >
               {props.children}
          </FunctionContext.Provider>
     );
}
