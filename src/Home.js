import React, { useContext } from "react";

import AuthContext from "./context/AuthContext";

export default function Home() {
  const { user } = useContext(AuthContext);

  return (<div>Welcome {user.displayName} </div>);
}
