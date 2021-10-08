import React, { useState } from "react";
import { Link, useRouteMatch, Switch, Route } from "react-router-dom";
import NavBar from "../components/Layout/NavBar";
import VoteList from "../components/Vote/VoteList";
import VoteDetail from "../components/Vote/VoteDetail";
import NewProposal from "../components/Vote/NewProposal";
import "react-datepicker/dist/react-datepicker.css";

export default function Vote() {
  let { path, url } = useRouteMatch();
  const [page, setPage] = useState("Proposals");

  function PanelLeft() {
    return (
      <div className="relative flex flex-col border border-gray-200 shadow-lg text-center rounded-lg">
        <div className="text-xl z-10 my-3">ABCDao</div>
        <img
          className="rounded-full mx-auto w-1/2 h-1/2 z-10"
          src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          alt=""
        />
        <div className="absolute bg-gray-100 inset-x-0 bottom-0 h-3/5 rounded-b-lg"></div>
        <div className="flex flex-col space-y-3 z-10 text-left py-4 px-6 w-full text-lg font-medium">
          <div
            className={
              page === "Proposals"
                ? "border-r-4 border-indigo-500 cursor-pointer hover:text-gray-400"
                : "cursor-pointer hover:text-gray-400"
            }
            onClick={() => setPage("Proposals")}
          >
            Proposals
          </div>
          <div className="cursor-pointer hover:text-gray-400">
            <Link to={`${url}/new-proposal`}>New Proposal</Link>
          </div>
          <div
            className={
              page === "About"
                ? "border-r-4 border-indigo-500 cursor-pointer hover:text-gray-400"
                : "cursor-pointer hover:text-gray-400"
            }
            onClick={() => setPage("About")}
          >
            About
          </div>
        </div>
      </div>
    );
  }

  function AboutTab() {
    return (
      <div className="flex flex-col border border-gray-100 shadow-lg rounded-lg w-full">
        <div className="p-8">ABOUT</div>
      </div>
    );
  }

  function PanelRight() {
    if (page === "Proposals") {
      return (
        <div className="w-full">
          <VoteList />
        </div>
      );
    }
    if (page === "About") {
      return <AboutTab />;
    }
  }

  return (
    <div className="w-full h-full">
      <NavBar />
      <div className="flex flex-col max-w-7xl mx-auto p-2 mb-10">
        <Switch>
          <Route exact path={path}>
            <div className="w-full">
              <div className="flex flex-row items-center justify-between px-4 ">
                <div className="text-4xl text-gray-700 my-4">Proposals</div>
                <div className="flex lg:hidden">
                  <Link to={`${url}/new-proposal`}>
                    <div className="bg-gray-200 text-gray-600 px-3 py-2 rounded-md text-sm font-medium cursor-pointer hover:bg-indigo-100">
                      New Proposal
                    </div>
                  </Link>
                </div>
              </div>
              <div className="hidden lg:flex flex-row space-x-6 w-full">
                <div className="w-1/3">
                  <PanelLeft />
                </div>
                <PanelRight />
              </div>
              <div className="flex flex-col w-full lg:hidden space-y-4">
                <VoteList />
              </div>
            </div>
          </Route>
          <Route path={`${path}/new-proposal`}>
            <NewProposal />
          </Route>
          <Route path={`${path}/:id`}>
            <VoteDetail />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
