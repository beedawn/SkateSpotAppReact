import React from "react";
import NavBar from "./navigation/NavBar";
import { Routes, Route } from "react-router-dom";
import Spots from "./Spots/Spots";
import Dashboard from "./routes/Dashboard";

import AddSpot from "./Spots/AddSpot";
import Account from "./User/Account";
import SingleSpot from "./Spots/SingleSpot";
import AddComment from "./comments/AddComment";
import Comment from "./comments/Comment";
import EditSpot from "./Spots/EditSpot";
import EditComment from "./comments/EditComment";
import DeleteComment from "./comments/DeleteComment";
import DeleteSpot from "./Spots/DeleteSpot";
import DisplayNameSetup from "./login/DisplayNameSetup";
import ImageUpload from "./Spots/ImageUpload";
import ImageUploadConfirm from "./Spots/ImageUploadConfirm";
import DeleteImage from "./Spots/DeleteImage";
export default function Home() {
  return (
    <div>
      <NavBar />{" "}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/spots" element={<Spots />} />
        <Route path="/addspot" element={<AddSpot />} />
        <Route path="/account" element={<Account />} />
        <Route path="/spot/:spot" element={<SingleSpot />} />
        <Route path="spot/:spot/addComment" element={<AddComment />} />
        <Route path="edit" element={<DisplayNameSetup />} />

        <Route path="spot/:spot/edit" element={<EditSpot />} />
        <Route path="spot/:spot/Comments" element={<Comment />} />
        <Route path="spot/:spot/Comments/:id" element={<EditComment />} />

        <Route
          path="spot/:spot/Comments/:id/delete"
          element={<DeleteComment />}
        />

        <Route path="spot/:spot/delete" element={<DeleteSpot />} />
        <Route path="spot/:spot/upload" element={<ImageUpload />} />
        <Route
          path="spot/:spot/uploadConfirm/:id"
          element={<ImageUploadConfirm />}
        />
        <Route path="spot/:spot/deleteImage/:id" element={<DeleteImage />} />
      </Routes>
    </div>
  );
}
