import { useWeb3 } from "@openzeppelin/network/lib/react";
import React, { useEffect, useState } from "react";
import projectId from "../../secrets.json";
import { getProposalHashes, retrieveProposal } from "../api/Api";
import VoteListItem from "./VoteListItem";

export default function VoteList() {
  const web3Context = useWeb3(`wss://mainnet.infura.io/ws/v3/${projectId}`);
  const { lib: web3 } = web3Context;

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
  }, [web3]);

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
