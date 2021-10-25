import { useState, createContext } from "react";

export const DataContext = createContext();

export function DataProvider(props) {
     const [thisUser, setThisUser] = useState(null);
     const [thisEmployee, setThisEmployee] = useState({
          name: "",
          image: "",
          id: "",
          password: "",
          tel: "",
          position: "",
          remark: "",
          date: new Date().toISOString().slice(0, 10),
     });

     return (
          <DataContext.Provider
               value={{
                    thisEmployee,
                    setThisEmployee,
                    thisUser,
                    setThisUser,
               }}
          >
               {props.children}
          </DataContext.Provider>
     );
}
