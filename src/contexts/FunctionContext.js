import React, { useState, createContext } from "react";

export const FunctionContext = createContext();

export function FunctionProvider(props) {
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

  return (
    <FunctionContext.Provider
      value={{
        runFetch,
      }}
    >
      {props.children}
    </FunctionContext.Provider>
  );
}
