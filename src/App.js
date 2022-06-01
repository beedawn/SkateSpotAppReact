import "./App.css";
import React from "react";
import Main from "./Main";
import AuthState from "./context/AuthState";
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
