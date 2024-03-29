import { useWeb3 } from '@openzeppelin/network/lib/react';
import { Proposal } from '../components/api/types';
import React, { useEffect, useState } from 'react';
import { getProposalHashes, retrieveProposal } from '../api/api';
import VoteListItem from './VoteListItem';

export default function VoteList() {
  const web3Context = useWeb3(
    `wss://mainnet.infura.io/ws/v3/${process.env.PROJECT_ID}`
  );
  const { lib: web3 } = web3Context;

  const [proposalList, setProposalList] = useState<Proposal[]>([]);
  const [proposalToShow, setProposalToShow] = useState(0);

  useEffect(() => {
    async function getAllProposals() {
      await getProposalHashes(web3).then((proposalData) => {
        setProposalToShow(proposalData.length);
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
    <div className="flex flex-col space-y-4">
      {proposalList.length === proposalToShow ? (
        proposalList
          .sort((a, b) => b.create_date - a.create_date)
          .map((vote) => <VoteListItem content={vote} key={vote.ipfs} />)
      ) : (
        <VoteListItem skeleton />
      )}
    </div>
  );
}
