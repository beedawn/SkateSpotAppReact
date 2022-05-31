import "./App.css";
import React from "react";
import Main from "./Main";
import AuthState from "./context/AuthState";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <div className="App">
         <AuthState>
        <Main />
      </AuthState>
    </div>
   
  );
}

export default App;
