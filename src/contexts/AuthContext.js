import React, {  createContext, useContext } from 'react'
import { DataContext } from './DataContext';
import { URLContext } from './URLContext';

export const AuthContext = createContext();

export function AuthProvider (props) {
    const { loginURL, findUserURL, createUsersURL} = useContext(URLContext);
    const { setAlert, setThisUser } = useContext(DataContext);

    const findExistUser = (obj) => 
          fetch( findUserURL, {
               method: "POST", 
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify({ email: obj.email }),
          })
          .then( res => res.json())
          .then( data => {
               return data           
          })
          .catch( err => console.error(err))  

     const createUser = (token, sentData) => 
          fetch( createUsersURL , {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
               },
               body: JSON.stringify(sentData),
          })
               .then((res) => res.json())
               .then((data) => {
                    console.log(data);
                    return data
               })
               .catch((err) => {
                    console.error(err);
                    setAlert(["wrong token"])
               });

    const userLogin = (props, url, fd) => {
        fetch(url, {
             method: "POST",
             headers: {
                  "Content-Type": "application/json",
             },
             body: JSON.stringify(fd),
        })
        .then(res =>{ 
             if(!res.ok) throw Error("could not fetch the data for that resource")
             return res.json()
        })
        .then(data => {
             console.log(data);
             if (data.error != undefined) return setAlert(data.error);
                  sessionStorage.setItem("accessToken", data.accessToken);
                  sessionStorage.setItem("refreshToken", data.refreshToken);
                  setThisUser(data.user);
                  console.log(props)
                  props.history.push("/home");
        })
        .catch((err) =>{ 
             console.log(err);
             console.log(err.message)
             if(!navigator.onLine) return setAlert("network error, please check your nework connection.");
             setAlert([err.message])
             // if(err) window.location.reload()
             // window.location.reload();
        });
   }

   return (
       <AuthContext.Provider
            value = {{
                 findExistUser,
                 createUser,
                 userLogin,
            }}
       >
           {props.children}
       </AuthContext.Provider>
   )
}
