import React, { useState, Fragment } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";

const sample_content = {
  id: 1,
  title: "Content header",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci impedit quia nobis illum consequuntur excepturi, repellat atque, eveniet aliquid expedita, aut illo inventore ipsum? Incidunt omnis vitae pariatur facere facilis non ea, minima aperiam, amet nisi culpa sit distinctio? Facilis voluptas iusto sint sapiente deserunt sunt rem animi at id!",
  userId: 2,
  date: 1629138256120,
  isActive: true,
  type: "single",
  options: [
    { id: "1", label: "Disagree" },
    { id: "2", label: "10% per transaction" },
    { id: "3", label: "20% per transaction" },
    { id: "4", label: "30% per transaction" },
    { id: "5", label: "50% per transaction" },
  ],
};

const collected_votes = [
  { address: "China.eth", choice: "30% per transaction", amount: "10" },
  { address: "0x69AB...6e88", choice: "30% per transaction", amount: "10" },
  { address: "0x42AB...2e81", choice: "Disagree", amount: "10" },
  { address: "0x090C...6e99", choice: "Disagree", amount: "500" },
  { address: "0x67FQ...5e78", choice: "50% per transaction", amount: "69" },
];

const current_results = [
  { choice: "Author", percentage: "50.90" },
  { choice: "IPFS", percentage: "20" },
  { choice: "Voting system", percentage: "10" },
  { choice: "Start date", percentage: "5" },
  { choice: "End date", percentage: "5" },
];

export default function VoteDetail() {
  let { params } = useRouteMatch();
  const voteId = params.id;
  const content = sample_content;

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="flex flex-col space-y-6 max-w-7xl mx-auto p-2 px-4 xl:flex-row xl:justify-between xl:space-x-6 mb-10 cursor-default">
      <div className="flex flex-col space-y-8 w-full">
        <div className="space-y-4">
          <Link
            to="/vote"
            className="flex flex-row text-gray-400 items-center content-center cursor-pointer w-min"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            <div className="">back</div>
          </Link>
          <div className="text-gray-700 font-bold text-3xl">
            {content.title}
          </div>
          {content.isActive ? (
            <div className="flex bg-green-500 text-white px-4 p-1 rounded-full text-sm font-medium w-min text-center">
              Active
            </div>
          ) : (
            <div className="flex bg-purple-500 text-white px-4 p-1 rounded-full text-sm font-medium w-min text-center">
              Closed
            </div>
          )}
          <div className="text-gray-600 font-medium text-xl">
            {content.description}
          </div>
        </div>
        <div className="flex-col bg-white rounded-xl border border-gray-200">
          <div className="border-b border-gray-200 bg-indigo-100 px-8 py-3 rounded-t-lg font-bold text-xl">
            Cast your vote
          </div>
          <div className="p-4">
            {content.options.map((option, index) => (
              <button
                type="submit"
                className="w-full rounded-full items-center px-5 py-3 text-md font-bold text-indigo-600 bg-white outline-none focus:outline-none m-1 hover:m-0 focus:m-0 border border-indigo-600 hover:border-indigo-800 hover:text-black hover:bg-indigo-100 transition-all focus:ring-2 focus:border-transparent focus:ring-blue-500"
              >
                {option.label}
              </button>
            ))}
            <button
              type="submit"
              className="w-full rounded-full items-center px-5 py-3 text-md font-bold text-white outline-none bg-yellow-500 focus:outline-none m-1 hover:m-0 focus:m-0 border border-red-600 hover:border-4 focus:border-4 hover:border-red-800 hover:text-black hover:bg-yellow-200 focus:border-purple-200 transition-all"
              onClick={openModal}
            >
              Vote
            </button>
            <Transition appear show={isOpen} as={Fragment} autoFocus={isOpen}>
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
                        Enter Vote Amount
                      </Dialog.Title>
                      <div className="flex flex-row py-2 items-center space-x-2 ">
                        <input
                          type="text"
                          className="border border-gray-200 rounded-lg p-2 h-10 w-full shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent font-medium"
                          placeholder="amount"
                        />
                        <button className="rounded-lg items-center h-10 px-3 py-2 text-sm font-bold text-red-600 bg-white border border-red-600 hover:border-red-800 hover:text-red-800 hover:bg-red-100 focus:border-red-200 focus:ring-2 focus:border-transparent transition-all">
                          Vote
                        </button>
                      </div>
                    </div>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition>
          </div>
        </div>
        <div className="flex flex-col bg-white rounded-xl border border-gray-200 w-full">
          <div className="border-b border-gray-200 bg-indigo-100 px-8 py-3 rounded-t-lg font-bold text-xl">
            Votes
          </div>
          <div className="flex flex-col">
            {collected_votes.map((vote, index) => (
              <VoteItem
                key={index}
                address={vote.address}
                choice={vote.choice}
                amount={vote.amount}
              />
            ))}
          </div>
          <div className="border-t border-gray-200 bg-indigo-100 px-8 py-3 rounded-b-lg font-bold text-base text-center cursor-pointer">
            See More
          </div>
        </div>
      </div>
      <div className="flex flex-col xl:w-96 space-y-6">
        <div className="flex flex-col bg-white rounded-xl border border-gray-200 w-full">
          <div className="border-b border-gray-200 bg-indigo-100 px-8 py-3 rounded-t-lg font-bold text-xl">
            Information
          </div>
          <div className="p-4 flex flex-col space-y-2">
            <InformationItem title="Author" value="Johnny" />
            <InformationItem title="IPFS" value="#QmcJiUj" />
            <InformationItem title="Voting system" value="Single Choice" />
            <InformationItem title="Start date" value="test" />
            <InformationItem title="End date" value="test" />
          </div>
        </div>
        <div className="flex flex-col bg-white rounded-xl border border-gray-200 w-full">
          <div className="border-b border-gray-200 bg-indigo-100 px-8 py-3 rounded-t-lg font-bold text-xl">
            Current Results
          </div>
          <div className="p-4 flex flex-col space-y-2">
            {current_results.map((result, index) => (
              <ResultItem
                key={index}
                choice={result.choice}
                percentage={result.percentage}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

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

const ResultItem = ({ choice, percentage }) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center text-base font-semibold text-gray-400">
        <div className="class">{choice}</div>
        <div className="text-gray-700">{percentage}%</div>
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
