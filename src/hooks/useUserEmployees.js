import { useState, useContext, useEffect } from "react";
import { URLContext } from "../contexts/URLContext";
import { FunctionContext } from "../contexts/FunctionContext";

const useUserEmployees = (props) => {
    const { reIssueToken } = useContext(FunctionContext);
    const { usersURL, getUserURL } = useContext(URLContext);
    const [ thisUser, setThisUser ] = useState(null);
    const [ allEmployees, setAllEmployees ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ err, setErr] = useState(null)

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
             .catch((err) => {
                  console.error(err)
                  setErr({error: err})
               });
   };

   const fetchUser = () => {
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
             .catch((err) =>{
                   console.error(err);
                   setErr({error: err})
               });
   };

    useEffect(()=>{
        fetchUser()
    }, [])


    return (
     { thisUser, allEmployees, isLoading , err }
    )
}

export default useUserEmployees;