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
    <div className="flex flex-col p-2 space-y-4">
      {vote_list.map((vote) => (
        <VoteListItem content={vote} key={vote.id} />
      ))}
    </div>
  );
}
