import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { getUser, getReadableDate } from "./voteUtils";

export default function VoteListItem({ content }) {
  let { url } = useRouteMatch();

  return (
    <div className="border border-gray-500 rounded-md w-full hover:bg-indigo-50">
      <Link to={`${url}/${content.id}`}>
        <div className="py-4 px-4 flex flex-col text-gray-400 hover:text-gray-800 cursor-pointer">
          <div className="flex flex-row justify-between">
            <div className="text-base font-light">
              Post by {getUser(content.userId)}
            </div>
            <div className="flex bg-green-500 text-white px-4 p-1 rounded-full text-sm font-medium w-min text-center">
              Active
            </div>
          </div>
          <div className="text-gray-800 text-3xl mb-1 font-semibold">
            {content.title}
          </div>
          <div className="text-lg font-normal mb-1">{content.description}</div>
          <div className="text-base font-light">
            {getReadableDate(content.date)}
          </div>
        </div>
      </Link>
    </div>
  );
}
