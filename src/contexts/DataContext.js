import { useState, createContext } from "react";

export const DataContext = createContext();

export function DataProvider(props) {
     const InitEmployeeInputs = {
          name: "",
          image: "",
          email: "",
          tel: "",
          title: "",
          remark: "",
          date: new Date().toISOString().slice(0, 10),
     };
     const [thisUser, setThisUser] = useState({});
     const [allEmployees, setAllEmployees] = useState(null);
     const [isLoading, setIsLoading] = useState(true);
     const [alert, setAlert] = useState([])

     return (
          <DataContext.Provider
               value={{
                    thisUser, setThisUser,
                    allEmployees, setAllEmployees,
                    isLoading, setIsLoading,
                    alert, setAlert,
                    InitEmployeeInputs
               }}
          >
               {props.children}
          </DataContext.Provider>
     );
}