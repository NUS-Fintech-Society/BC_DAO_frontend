import React from "react";
import NavBar from "../components/NavBar";
import Header from "../components/LandingPage/Header"
import BlockChainDescription from "../components/LandingPage/BlockChainDescription";

export default function index() {
  return (
    <div>
      <NavBar />
      <Header />
      <BlockChainDescription />
    </div>
  );
}
