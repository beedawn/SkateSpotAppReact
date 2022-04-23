import React from "react";
import NavBar from "./navigation/NavBar";
import { Routes, Route } from "react-router-dom";
import Spots from "./routes/Spots";
import Dashboard from "./routes/Dashboard";

import AddSpot from "./routes/AddSpot";
import Account from "./routes/Account";
import SingleSpot from "./routes/SingleSpot"
import AddComment from "./routes/AddComment";
import Comment from "../src/comments/Comment";
import EditSpot from "./routes/EditSpot";
export default function Home() {

  return (
    <div>
      <NavBar />{" "}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/spots" element={<Spots />} />
        <Route path="/addspot" element={<AddSpot />} />
        <Route path="/account" element={<Account />} />
         <Route
          path="/spot/:spot" element={<SingleSpot
               
            />
        
          }
        />
        <Route path="spot/:spot/addComment" element={<AddComment
               
               />
           
             }
           />
           
           <Route path="spot/:spot/edit" element={<EditSpot
               
               />
           
             }
           />
<Route path="spot/:spot/Comments" element={<Comment
               
               />
           
             }
           />

 </Routes>
    </div>
  );
}
