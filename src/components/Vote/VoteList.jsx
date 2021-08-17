import React from "react";
import VoteListItem from "./VoteListItem";

const sample_content = {
  id: 1,
  title: "Content header",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci impedit quia nobis illum consequuntur excepturi, repellat atque, eveniet aliquid expedita, aut illo inventore ipsum? Incidunt omnis vitae pariatur facere facilis non ea, minima aperiam, amet nisi culpa sit distinctio? Facilis voluptas iusto sint sapiente deserunt sunt rem animi at id!",
  link: "Content link",
  userId: 2,
  date: 1629138256120,
};

const vote_list = [sample_content, sample_content];

export default function VoteList() {
  return (
    <div className="flex flex-col max-w-7xl mx-auto p-2">
      <div className="flex flex-row items-center justify-between px-4 ">
        <div className="text-4xl text-gray-700 my-4">Proposals</div>
        <a href="/vote/new-proposal">
          <div className="bg-gray-200 text-gray-600 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
            New Proposal
          </div>
        </a>
      </div>
      <div className="flex flex-col p-2 space-y-4">
        {vote_list.map((vote) => (
          <VoteListItem content={vote} key={vote.id} />
        ))}
      </div>
    </div>
  );
}
