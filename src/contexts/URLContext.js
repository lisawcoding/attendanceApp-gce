import React, { useState, createContext } from "react";

export const URLContext = createContext()

export function URLProvider (props) {
    const [URL] = useState("http://localhost:9001/employees");
    const [mailURL] = useState("http://localhost:9001/mail") 
    const [usersURL] = useState("http://localhost:9001/users") 
    const [loginURL] = useState("http://localhost:9002/login"); 

    return (
        <URLContext.Provider value={{
            URL,
            mailURL,
            usersURL,
            loginURL,
        }}>
            {props.children}
        </URLContext.Provider>
    )
}