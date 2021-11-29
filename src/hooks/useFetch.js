import { useState, useEffect, useContext } from "react";
import { FunctionContext } from "../contexts/FunctionContext";


const useFetch = (url, method, bodyData, action  ) => {
    
    // const [data, setData] = useState(null);
    // const [ err, setErr ] = useState(null)

    useEffect(()=>{
        
    })
     // const runFetch = (props) => {
     //     const { reIssueToken } = useContext(FunctionContext);

     //      fetch(url, {
     //           method: method,
     //           headers: {
     //                "Content-Type": "application/json",
     //                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
     //           },
     //           body: JSON.stringify(bodyData),
     //      })
     //      .then((res) => res.json())
     //      .then(async (data) => {
     //           console.log(data);
     //           if (data.error) {
     //                await reIssueToken(props);
     //                runFetch();
     //           } else {
     //                // setIsSuccessPopup(true);
     //                // fetchUser()
     //                action()
     //           }
     //      })
     //      .catch((err) =>{
     //            console.error(err);
     //            // setErr({error: err})
     //        });
     // };  
}

export default useFetch;