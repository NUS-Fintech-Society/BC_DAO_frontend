import { Dialog, Transition } from "@headlessui/react";
import { useWeb3 } from "@openzeppelin/network/lib/react";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { toast } from "react-toastify";
import projectId from "../../secrets.json";
import { getProposalInfo, retrieveProposal, sendVote } from "../api/Api";
import { getShortAccountHash } from "../api/utils";
import { getReadableDate } from "./voteUtils";

export default function VoteDetail() {
  //Address routing
  let { params } = useRouteMatch();
  const ipfsHash = params.id;

  //Web3 API Itialization
  const web3Context = useWeb3(`wss://mainnet.infura.io/ws/v3/${projectId}`);
  const { lib: web3, accounts } = web3Context;

  //Getting proposal content
  const [proposalContent, setProposalContent] = useState(null);
  const [proposalInfo, setProposalInfo] = useState(null);

  useEffect(() => {
    async function getProposal() {
      await retrieveProposal(ipfsHash).then((proposal) => {
        setProposalContent(proposal);
      });
      await getProposalInfo(web3, ipfsHash).then((info) => {
        setProposalInfo(info);
      });
    }
    getProposal();
  }, [ipfsHash, web3]);

  //Model Handling
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  //Vote submission
  const [amount, setAmount] = useState(null);

  //Amount Toasts
  const amountError = () =>
    toast.warn("Amount must be greater than min stake value", {
      position: "bottom-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      toastId: "amountError",
    });

  const confirmationMessage = () =>
    toast.success("🦊 Confirm on MetaMask!", {
      position: "bottom-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      toastId: "confirmationMessage",
    });

  const [selected, setSelected] = useState(null);

  async function submitVote() {
    const vote = await sendVote(
      web3,
      accounts[0],
      ipfsHash,
      selected,
      Number(amount)
    );
    return vote;
  }

  function isSelected() {
    if (selected !== undefined && selected !== null) {
      return true;
    }
    return false;
  }

  function isLoggedIn() {
    if (accounts.length > 0) {
      return true;
    }
    return false;
  }

  function getType() {
    if (proposalContent.type === "loss") {
      return "Loss Voting";
    }
    if (proposalContent.type === "allocation") {
      return "Allocation Proposal";
    }
    return "unknown";
  }

  return (
    <>
      {proposalContent ? (
        <div className="flex flex-col space-y-6 max-w-7xl p-2 px-4 xl:flex-row xl:justify-between xl:space-x-6 mb-10 cursor-default">
          <div className="flex flex-col space-y-8 w-full">
            <div className="space-y-4">
              <Link
                to="/vote"
                className="flex flex-row text-gray-400 items-center content-center cursor-pointer w-min"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                  />
                </svg>
                <div className="">back</div>
              </Link>
              <div className="text-gray-700 font-bold text-3xl">
                {proposalContent.title}
              </div>
              <div className="div">
                <IsActiveTag content={proposalContent} />
              </div>
              <div className="text-gray-600 font-medium text-xl">
                {proposalContent.content}
              </div>
            </div>
            <div className="flex-col bg-white rounded-xl border border-gray-200">
              <div className="border-b border-gray-200 bg-blue-100 px-8 py-3 rounded-t-lg font-bold text-xl">
                Cast your vote
              </div>
              <div className="p-4">
                {proposalContent.options.map((option, index) => (
                  <button
                    key={option.id}
                    type="submit"
                    className={`w-full rounded-full items-center px-5 py-3 text-md font-bold text-indigo-600 bg-white outline-none m-1 hover:m-0  border border-indigo-600 hover:border-indigo-800 hover:text-black hover:bg-blue-100 transition-all 
                    ${
                      index === selected
                        ? "ring-2 border-transparent ring-blue-500 outline-none border m-0 bg-indigo-50"
                        : null
                    }`}
                    onClick={() => setSelected(index)}
                  >
                    {option.label}
                  </button>
                ))}
                <button
                  className={`w-full rounded-full items-center px-5 py-3 text-md font-bold text-white outline-none bg-yellow-500 m-1 border border-red-600 transition-all ${
                    isSelected() && isLoggedIn()
                      ? "focus:outline-none hover:m-0 focus:m-0 hover:border-4 focus:border-4 hover:border-red-800 hover:text-black hover:bg-yellow-400 focus:border-purple-200 cursor-pointer"
                      : "cursor-not-allowed"
                  }`}
                  onClick={isSelected() && isLoggedIn() ? openModal : null}
                >
                  Vote
                </button>
                <Transition
                  appear
                  show={isOpen}
                  as={Fragment}
                  autoFocus={isOpen}
                >
                  <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                  >
                    <div className="min-h-screen px-4 text-center">
                      {/* Allow for clicking outside to close modal*/}
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Dialog.Overlay className="fixed inset-0" />
                      </Transition.Child>

                      {/* This element is to trick the browser into centering the modal contents. */}
                      <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                      >
                        &#8203;
                      </span>
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900 cursor-default"
                          >
                            Enter Stake Amount
                          </Dialog.Title>
                          <div className="py-1 font-thin text-sm">
                            {isSelected()
                              ? `You are voting for: ${proposalContent.options[selected].label}`
                              : "Please choose an option!"}
                          </div>
                          <div className="flex flex-row py-2 items-center space-x-2 ">
                            <input
                              type="number"
                              className="border border-gray-200 rounded-lg p-2 h-10 w-full shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent font-medium"
                              placeholder="amount"
                              onChange={(e) => setAmount(e.target.value)}
                            />
                            <button
                              onClick={() => {
                                if (amount >= proposalContent.min_stake) {
                                  submitVote();
                                  confirmationMessage();
                                  setTimeout(() => {
                                    closeModal();
                                  }, 3000);
                                } else {
                                  amountError();
                                }
                              }}
                              className="rounded-lg items-center h-10 px-3 py-2 text-sm font-bold text-red-600 bg-white border border-red-600 hover:border-red-800 hover:text-red-800 hover:bg-red-100 focus:border-red-200 focus:ring-2 focus:border-transparent transition-all"
                            >
                              Vote!
                            </button>
                          </div>
                        </div>
                      </Transition.Child>
                    </div>
                  </Dialog>
                </Transition>
              </div>
            </div>
            <PreviousVotesList
              proposalContent={proposalContent}
              proposalInfo={proposalInfo}
            />
          </div>
          <div className="flex flex-col xl:w-96 space-y-6">
            <div className="flex flex-col bg-white rounded-xl border border-gray-200 w-full">
              <div className="border-b border-gray-200 bg-blue-100 px-8 py-3 rounded-t-lg font-bold text-xl">
                Information
              </div>
              <div className="p-4 flex flex-col space-y-2">
                <InformationItem
                  title="Author"
                  value={getShortAccountHash(proposalContent.userId)}
                />
                <InformationItem
                  title="IPFS"
                  value={getShortAccountHash(ipfsHash)}
                />
                <InformationItem
                  title="Min Stake Value"
                  value={proposalContent.min_stake}
                />
                <InformationItem title="Voting system" value={getType()} />
                <InformationItem
                  title="Created date"
                  value={getReadableDate(proposalContent.create_date)}
                />
                <InformationItem
                  title="Closing date"
                  value={getReadableDate(proposalContent.end_date)}
                />
              </div>
            </div>
            <div className="flex flex-col bg-white rounded-xl border border-gray-200 w-full">
              <div className="border-b border-gray-200 bg-blue-100 px-8 py-3 rounded-t-lg font-bold text-xl">
                Current Results
              </div>
              {proposalContent.type === "loss" ? (
                <CurrentResultsLoss
                  proposalContent={proposalContent}
                  proposalInfo={proposalInfo}
                />
              ) : (
                <CurrentResultsAllocation
                  proposalContent={proposalContent}
                  proposalInfo={proposalInfo}
                />
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

const IsActiveTag = ({ content }) => {
  return content.isActive ? (
    <div className="flex bg-green-500 text-white px-4 p-1 rounded-full text-sm font-medium w-min text-center">
      Active
    </div>
  ) : (
    <div className="flex bg-purple-500 text-white px-4 p-1 rounded-full text-sm font-medium w-min text-center">
      Closed
    </div>
  );
};

const VoteItem = ({ address, choice, amount }) => {
  return (
    <div className="grid grid-cols-3 text-base w-full text-center font-semibold text-gray-800 border-b-2 border-indigo-100 py-4 px-6">
      <div className="mr-auto">{address}</div>
      <div className="">{choice}</div>
      <div className="ml-auto">{amount}</div>
    </div>
  );
};

const InformationItem = ({ title, value }) => {
  return (
    <div className="flex flex-row justify-between items-center text-base font-semibold text-gray-400">
      <div className="class">{title}</div>
      <div className="text-gray-700">{value}</div>
    </div>
  );
};

const ResultItem = ({ choice, percentage, label }) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center text-base font-semibold text-gray-400">
        <div className="class">{choice}</div>
        <div className="text-gray-700">{label} ABCDao</div>
      </div>
      <div className="shadow-lg">
        <div className="w-full h-1 rounded-full bg-gray-200"></div>
        <div
          className="w-full h-1 rounded-full bg-indigo-600"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

function PreviousVotesList({ proposalContent, proposalInfo }) {
  const [currentResults, setCurrentResults] = useState([]);

  useEffect(() => {
    function getCurrentResults() {
      const temp = [];
      proposalInfo.votes.forEach((vote) => {
        temp.push({
          address: getShortAccountHash(vote.voter),
          choice: proposalContent.options[vote.option].label,
          amount: vote.amount / 10 ** 18,
        });
      });
      return temp;
    }
    if (proposalInfo !== null && proposalContent !== null) {
      setCurrentResults(getCurrentResults());
    }
  }, [proposalContent, proposalInfo]);

  return (
    <div className="flex flex-col bg-white rounded-xl border border-gray-200 w-full">
      <div className="border-b border-gray-200 bg-blue-100 px-8 py-3 rounded-t-lg font-bold text-xl">
        Vote History
      </div>
      <div className="flex flex-col">
        {currentResults.length !== 0 ? (
          currentResults.map((result, index) => (
            <VoteItem
              key={index}
              choice={result.choice}
              address={result.address}
              amount={result.amount}
            />
          ))
        ) : (
          <div className="px-8 py-3 text-center font-semibold">
            No history...
          </div>
        )}
      </div>
      <div className="border-t border-gray-200 bg-blue-100 px-8 py-3 rounded-b-lg font-bold text-base text-center cursor-pointer">
        See More
      </div>
    </div>
  );
}

function CurrentResultsLoss({ proposalContent, proposalInfo }) {
  const [currentResults, setCurrentResults] = useState([]);

  useEffect(() => {
    function getCurrentResults() {
      const temp = [];
      const totalStaked = proposalInfo.stakedValuePerOption.reduce(
        (a, b) => a + b / 10 ** 18,
        0
      );
      proposalContent.options.forEach((option, index) => {
        temp.push({
          choice: option.label,
          percentage:
            Math.round(
              proposalInfo.stakedValuePerOption[index] / 10 ** 14 / totalStaked
            ) / 100,
          label: proposalInfo.stakedValuePerOption[index] / 10 ** 18,
        });
      });
      return temp;
    }
    if (proposalInfo !== null && proposalContent !== null) {
      setCurrentResults(getCurrentResults());
    }
  }, [proposalContent, proposalInfo]);

  return (
    <div className="p-4 flex flex-col space-y-2">
      {currentResults.length !== 0 ? (
        currentResults
          .sort((a, b) => b.percentage - a.percentage)
          .map((result, index) => (
            <ResultItem
              key={index}
              choice={result.choice}
              percentage={result.percentage}
              label={result.label}
            />
          ))
      ) : (
        <div className="font-semibold px-4">Be the first to vote!</div>
      )}
    </div>
  );
}

function CurrentResultsAllocation({ proposalContent, proposalInfo }) {
  const [currentResults, setCurrentResults] = useState([]);

  useEffect(() => {
    function getCurrentResults() {
      const temp = [];
      const totalStaked = proposalInfo.stakedValuePerOption.reduce(
        (a, b) => a + b / 10 ** 18,
        0
      );
      const votes = [...proposalInfo.votes];
      const sortedVotes = votes.sort((a, b) => {
        return b.amount - a.amount;
      });
      sortedVotes.forEach((vote) => {
        temp.push({
          choice: proposalContent.options[vote.option].label,
          percentage: Math.round(vote.amount / 10 ** 14 / totalStaked) / 100,
          label: vote.amount / 10 ** 18,
        });
      });
      return temp;
    }
    if (proposalInfo !== null && proposalContent !== null) {
      setCurrentResults(getCurrentResults());
    }
  }, [proposalContent, proposalInfo]);

  return (
    <div className="p-4 flex flex-col space-y-2">
      {currentResults.length !== 0 ? (
        currentResults
          .sort((a, b) => b.percentage - a.percentage)
          .map((result, index) => (
            <ResultItem
              key={index}
              choice={result.choice}
              percentage={result.percentage}
              label={result.label}
            />
          ))
      ) : (
        <div className="font-semibold px-4">Be the first to vote!</div>
      )}
    </div>
  );
}
