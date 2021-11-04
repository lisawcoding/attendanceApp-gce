import { useState, createContext } from "react";

export const DataContext = createContext();

export function DataProvider(props) {
     const inputs = {
          name: "",
          image: "",
          password: "",
          tel: "",
          position: "",
          remark: "",
          date: new Date().toISOString().slice(0, 10),
     };
     const [thisUser, setThisUser] = useState({});
     const [thisEmployee, setThisEmployee] = useState(inputs);
     const [editedEmployee, setEditedEmployee] = useState(inputs);
     // const [thisEmployee, setThisEmployee] = useState({
     //      name: "",
     //      image: "",
     //      password: "",
     //      tel: "",
     //      position: "",
     //      remark: "",
     //      date: new Date().toISOString().slice(0, 10),
     // });
     // const [editedEmployee, setEditedEmployee] = useState(null);

     return (
          <DataContext.Provider
               value={{
                    thisEmployee,
                    setThisEmployee,
                    thisUser,
                    setThisUser,
                    editedEmployee,
                    setEditedEmployee,
               }}
          >
               {props.children}
          </DataContext.Provider>
     );
}
