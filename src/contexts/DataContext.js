import { useState, createContext } from "react";

export const DataContext = createContext();

export function DataProvider(props) {
     const InitEmployeeInputs = {
          name: "",
          image: "",
          password: "",
          tel: "",
          position: "",
          remark: "",
          date: new Date().toISOString().slice(0, 10),
     };
     const [thisUser, setThisUser] = useState({});
     const [thisEmployee, setThisEmployee] = useState(InitEmployeeInputs);
     const [editedEmployee, setEditedEmployee] = useState(InitEmployeeInputs);
     const [allEmployees, setAllEmployees] = useState(null);
     const [isLoading, setIsLoading] = useState(true);
     const [isReload, setIsReload] = useState(false);
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
                    // thisEmployee, setThisEmployee,
                    thisUser, setThisUser,
                    // editedEmployee, setEditedEmployee,
                    allEmployees, setAllEmployees,
                    isLoading, setIsLoading,
                    isReload, setIsReload,
                    InitEmployeeInputs
               }}
          >
               {props.children}
          </DataContext.Provider>
     );
}