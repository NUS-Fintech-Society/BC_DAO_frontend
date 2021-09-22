import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { getUser, getReadableDate } from "./voteUtils";
import { getCurrentDateTime } from "./voteUtils";
import { getShortAccountHash } from "../api/utils";

export default function VoteListItem({ content }) {
  let { url } = useRouteMatch();

  function cutParagraph(paragraph) {
    if (paragraph.length > 100) {
      return paragraph.substring(0, 500) + "...";
    }
    return paragraph;
  }

  return (
    <div className="border border-gray-500 rounded-md w-full hover:bg-indigo-50">
      <Link to={`${url}/${content.ipfs}`}>
        <div className="py-4 px-4 flex flex-col text-gray-400 hover:text-gray-800 cursor-pointer">
          <div className="flex flex-row justify-between mb-1">
            <div className="text-base font-light">
              Post by {getShortAccountHash(content.userId)}
            </div>
            {getCurrentDateTime() < content.end_date ? (
              <div className="flex bg-green-500 text-white px-4 p-1 rounded-full text-sm font-medium w-min text-center">
                Active
              </div>
            ) : (
              <div className="flex bg-red-500 text-white px-4 p-1 rounded-full text-sm font-medium w-min text-center">
                Closed
              </div>
            )}
          </div>
          <div className="text-gray-800 text-3xl mb-1 font-semibold truncate">
            {content.title}
          </div>
          <div className="text-lg font-normal mb-1 overflow-ellipsis overflow-hidden">
            {cutParagraph(content.content)}
          </div>
          <div className="text-base font-light">
            {getReadableDate(content.create_date)}
          </div>
        </div>
      </Link>
    </div>
  );
}
