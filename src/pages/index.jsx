import React from "react";
import NavBar from "../components/Layout/NavBar";

export default function index() {
  return (
    <>
      <head>
        <title>Home</title>
        <meta name="description" content="home" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <div>
        <NavBar />
        <div>home page</div>
      </div>
    </>
  );
}
