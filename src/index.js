import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { InitProvider } from "./contexts/InitContext";
import reportWebVitals from "./reportWebVitals";
import "./i18n";
import { URLProvider } from "./contexts/URLContext";
import { FunctionProvider } from "./contexts/FunctionContext";
import { DataProvider } from "./contexts/DataContext";
import { AuthProvider } from "./contexts/AuthContext";

ReactDOM.render(
     <React.StrictMode>
          <URLProvider>
               <DataProvider>
                    <InitProvider>
                         <FunctionProvider>
                              <AuthProvider>
                                   <App />
                              </AuthProvider>
                         </FunctionProvider>
                    </InitProvider>
               </DataProvider>
          </URLProvider>
     </React.StrictMode>,
     document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();