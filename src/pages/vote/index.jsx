import React from "react";
import NavBar from "../../components/Layout/NavBar";
import VoteList from "../../components/Vote/VoteList";

export default function vote() {
  return (
    <div className="w-full h-full">
      <NavBar />
      <VoteList />
    </div>
  );
}
