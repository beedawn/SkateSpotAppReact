import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  return <div><div>Logo</div><div>Welcome {user.displayName}</div>
  <div>New spots</div> <div>Updates</div> </div>;
}
