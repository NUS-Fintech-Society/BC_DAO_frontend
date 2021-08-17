import React from "react";
import { Link, useRouteMatch, Switch, Route } from "react-router-dom";
import NavBar from "../../components/Layout/NavBar";
import VoteList from "../../components/Vote/VoteList";

export default function Vote() {
  let { path, url } = useRouteMatch();

  return (
    <div className="w-full h-full">
      <NavBar />
      <div className="flex flex-col max-w-7xl mx-auto p-2">
        <Switch>
          <Route exact path={path}>
            <div className="flex flex-row items-center justify-between px-4 ">
              <div className="text-4xl text-gray-700 my-4">Proposals</div>
              <Link to={`${url}/new-proposal`}>
                <div className="bg-gray-200 text-gray-600 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                  New Proposal
                </div>
              </Link>
            </div>
            <VoteList />
          </Route>
          <Route path={`${path}/:id`}>to the place</Route>
        </Switch>
      </div>
    </div>
  );
}
