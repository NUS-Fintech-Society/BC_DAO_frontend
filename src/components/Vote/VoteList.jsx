import { useWeb3 } from "@openzeppelin/network/lib/react";
import React, { useEffect, useState } from "react";
import projectId from "../../secrets.json";
import { getProposalHashes, retrieveProposal } from "../api/Api";
import VoteListItem from "./VoteListItem";

const sample_content = {
  ipfs: 1,
  title: "Content header",
  content:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci impedit quia nobis illum consequuntur excepturi, repellat atque, eveniet aliquid expedita, aut illo inventore ipsum? Incidunt omnis vitae pariatur facere facilis non ea, minima aperiam, amet nisi culpa sit distinctio? Facilis voluptas iusto sint sapiente deserunt sunt rem animi at id!",
  userId: 2,
  create_date: 1629138256120,
  end_date: 1629138256120,
};

const sample_content_2 = {
  ipfs: 2,
  title: "Content header 2",
  content:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci impedit quia nobis illum consequuntur excepturi, repellat atque, eveniet aliquid expedita, aut illo inventore ipsum? Incidunt omnis vitae pariatur facere facilis non ea, minima aperiam, amet nisi culpa sit distinctio? Facilis voluptas iusto sint sapiente deserunt sunt rem animi at id!",
  userId: 5,
  create_date: 1629138256120,
  end_date: 1629138256120,
};

const vote_list = [sample_content, sample_content_2];

export default function VoteList() {
  const web3Context = useWeb3(`wss://mainnet.infura.io/ws/v3/${projectId}`);
  const { lib: web3, accounts } = web3Context;

  const [proposalList, setProposalList] = useState([]);

  useEffect(() => {
    async function getAllProposals() {
      await getProposalHashes(web3).then((proposalData) => {
        proposalData.forEach(async (element) => {
          if (element) {
            await retrieveProposal(element).then((data) => {
              const new_data = { ...data, ipfs: element };
              setProposalList((prevState) => [...prevState, new_data]);
            });
          }
        });
      });
    }
    getAllProposals();
  }, []);

  return (
    <div className="flex flex-col p-2 space-y-4">
      {proposalList
        ? proposalList.map((vote) => (
            <VoteListItem content={vote} key={vote.ipfs} />
          ))
        : null}
    </div>
  );
}
