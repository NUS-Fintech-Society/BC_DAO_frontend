import React from "react";

export default function Header() {
  return (
    <div className="w-screen text-center p-8">
      <div href="https://fintechsociety.comp.nus.edu.sg/" className="text-6xl pt-8">
        Fintech Society
      </div>
      <a href="https://fintechsociety.comp.nus.edu.sg/">
        <button className="text-base bg-black rounded-md font-bold text-white pt-2.5 pb-2.5 pl-5 pr-5 mt-4">
          Click here
        </button>
      </a>
    </div>
  );
}
