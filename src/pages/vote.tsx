import React, { useState } from "react";
import { Link, useRouteMatch, Switch, Route } from "react-router-dom";
import NavBar from "../components/Layout/NavBar";
import VoteList from "../components/Vote/VoteList";
import VoteDetail from "../components/Vote/VoteDetail";
import NewProposal from "../components/Vote/NewProposal";
import HeaderTextFormat from "../components/TextFormats/HeaderTextFormat";
import IndividualLineFormat from "../components/TextFormats/IndividualLineFormat";
import "react-datepicker/dist/react-datepicker.css";

export default function Vote() {
  let { path, url } = useRouteMatch();
  const [page, setPage] = useState("Proposals");

  function PanelItem({ label }: { label: string }) {
    return (
      <div
        className={
          page === label
            ? "border-r-4 border-indigo-500 cursor-pointer hover:text-gray-400 hover:border-indigo-300"
            : "cursor-pointer hover:text-gray-400"
        }
        onClick={() => setPage(label)}
      >
        {label}
      </div>
    );
  }

  function PanelLeft() {
    return (
      <div className="relative flex flex-col border border-gray-200 shadow-lg text-center rounded-lg">
        <div className="text-xl z-10 my-3">ABCDao</div>
        {/* placeholder image */}
        <img
          className="rounded-full mx-auto w-1/2 h-1/2 z-10"
          src="https://rehabconceptspt.com/wp-content/uploads/2016/06/placeholder-640-square.jpg"
          alt=""
          placeholder="placeholder"
        />
        <div className="absolute bg-gray-100 inset-x-0 bottom-0 h-3/5 rounded-b-lg"></div>
        <div className="flex flex-col space-y-3 z-10 text-left py-4 px-6 w-full text-lg font-medium">
          <PanelItem label="Proposals" />
          <div className="cursor-pointer hover:text-gray-400">
            <Link to={`${url}/new-proposal`}>New Proposal</Link>
          </div>
          <PanelItem label="About" />
        </div>
      </div>
    );
  }

  function AboutTab() {
    return (
      <>
        <div className="flex flex-col w-full space-y-10">
          <div className="flex flex-col border border-gray-100 shadow-lg rounded-lg w-full">
            <div className="p-8">
              <HeaderTextFormat header="About" info="ABCDao" />
              <HeaderTextFormat header="NetWork" info="Ethereum Mainnet" />
              <HeaderTextFormat header="Proposal Validation" info="basic" />
              <HeaderTextFormat header="Proposal Threshold" info="infinite" />
              <HeaderTextFormat header="Strategie(s)" info="erc20-balance-of" />
            </div>
          </div>
          <div className="flex flex-col border border-gray-100 shadow-lg rounded-lg w-full">
            <IndividualLineFormat header="Admins" />
            <IndividualLineFormat header="John" />
            <IndividualLineFormat header="Mark" />
            <IndividualLineFormat header="Sally" />
            <IndividualLineFormat header="Tim" type="last" />
          </div>

          <div className="flex flex-col border border-gray-100 shadow-lg rounded-lg w-full">
            <IndividualLineFormat header="Developers" />
            <IndividualLineFormat header="Jun Xiong" />
            <IndividualLineFormat header="Adithya Narayan" />
            <IndividualLineFormat header="Bryan Woo" type="last" />
          </div>
        </div>
      </>
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
    return null;
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
