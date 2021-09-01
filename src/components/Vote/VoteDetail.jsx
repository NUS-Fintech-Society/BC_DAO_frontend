import React from "react";
import { useRouteMatch } from "react-router-dom";

export default function VoteDetail() {
  let { params } = useRouteMatch();
  const voteId = params.id;

  return (
    <div>
      <div>proposal item {voteId}</div>
    </div>
  );
}
