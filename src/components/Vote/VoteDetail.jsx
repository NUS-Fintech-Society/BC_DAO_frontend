import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

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
    { id: "1", label: "1" },
    { id: "2", label: "2" },
    { id: "3", label: "3" },
    { id: "4", label: "4" },
  ],
};

export default function VoteDetail() {
  let { params } = useRouteMatch();
  const voteId = params.id;
  const content = sample_content;

  return (
    <div className="flex flex-col max-w-7xl mx-auto p-2 px-4 ">
      <div className="space-y-8">
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
        <div className="flex-col lg:w-96 bg-white rounded-xl border border-gray-200">
          <div className="border-b border-gray-200 bg-indigo-100 px-8 py-4 rounded-t-lg font-bold text-xl">
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
            >
              Vote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
