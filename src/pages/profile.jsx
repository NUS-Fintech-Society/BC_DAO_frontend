import { useWeb3 } from "@openzeppelin/network/lib/react";
import React, { useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { projectId } from "../secrets.json";
import NavBar from "../components/Layout/NavBar";
import { getAccountHash } from "../components/api/utils";
import { ToastContainer, toast } from "react-toastify";

const sample_data = {
  id: 1,
  nickname: "Jon",
  email: "test@hmail.com",
  phone: "987654321",
  dob: "11/2/1982",
  avatar:
    "https://images.unsplash.com/photo-1576245482660-6fcf7492b4e5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  created_at: "test",
  year: 1,
  department: "Blockchain",
};

export default function Profile() {
  let { path, url } = useRouteMatch();
  const web3Context = useWeb3(`wss://mainnet.infura.io/ws/v3/${projectId}`);
  const { networkId, accounts } = web3Context;
  const [page, setPage] = useState("Profile");
  const accountHash = getAccountHash(accounts, networkId);

  const copyNotification = () =>
    toast.info("Copied to clipboard", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  function PanelLeft() {
    return (
      <div className="relative flex flex-col lg:w-1/3 h-1/2 border border-gray-200 shadow-lg text-center rounded-lg">
        <div className="text-xl z-10 my-3">{sample_data.nickname}</div>
        <img
          className="rounded-full mx-auto w-1/2 h-1/2 z-10"
          src={sample_data.avatar}
          alt=""
        />
        <div className="absolute bg-gray-100 inset-x-0 bottom-0 h-3/5 rounded-b-lg"></div>
        <div className="flex flex-col space-y-3 z-10 text-left py-4 px-6 w-full text-lg font-medium">
          <div
            className="cursor-pointer hover:text-gray-400"
            onClick={() => setPage("Profile")}
          >
            Profile
          </div>
          <div
            className="cursor-pointer hover:text-gray-400"
            onClick={() => setPage("Settings")}
          >
            Settings
          </div>
          <div
            className="cursor-pointer hover:text-gray-400"
            onClick={() => setPage("History")}
          >
            History
          </div>
        </div>
      </div>
    );
  }

  function HeaderTextFormat({ header, info }) {
    return (
      <div className="flex flex-col space-y-1 mb-1">
        <div className="text-lg font-medium cursor-default">{header}</div>
        <div
          className="text-md font-medium text-gray-500 cursor-pointer"
          onClick={() => {
            copyNotification();
            navigator.clipboard.writeText(info);
          }}
        >
          {info}
        </div>
      </div>
    );
  }

  function ProfileTab() {
    return (
      <div className="flex flex-col border border-gray-100 shadow-lg rounded-lg w-full">
        <div className="p-8">
          <HeaderTextFormat header={"Hash ID"} info={accountHash} />
          <HeaderTextFormat
            header={"Nickname"}
            info={sample_data["nickname"]}
          />
          <HeaderTextFormat header={"Email"} info={sample_data["email"]} />
          <HeaderTextFormat header={"Phone"} info={sample_data["phone"]} />
          <HeaderTextFormat
            header={"Year"}
            info={"Year " + sample_data["year"]}
          />
          <HeaderTextFormat
            header={"Department"}
            info={sample_data["department"]}
          />
        </div>
      </div>
    );
  }

  function SettingsTab() {
    return (
      <div className="flex flex-col border border-gray-100 shadow-lg rounded-lg w-full">
        <div className="p-8">Settings</div>
      </div>
    );
  }

  function HistoryTab() {
    return (
      <div className="flex flex-col border border-gray-100 shadow-lg rounded-lg w-full">
        <div className="p-8">History</div>
      </div>
    );
  }

  function PanelRight() {
    if (page === "Profile") {
      return <ProfileTab />;
    }
    if (page === "Settings") {
      return <SettingsTab />;
    }
    if (page === "History") {
      return <HistoryTab />;
    }
    return <div className="class">Impossible Div</div>;
  }

  return (
    <div className="w-full h-full">
      <NavBar />
      <div className="flex flex-col max-w-7xl mx-auto p-2 mb-10">
        <div className="flex flex-col px-4">
          <div className="text-4xl text-gray-700 my-4">User Profile</div>
          <div className="flex items-center">
            <div className="hidden lg:flex flex-row space-x-6">
              <PanelLeft />
              <PanelRight />
            </div>
            <div className="flex flex-col w-full lg:hidden space-y-4">
              <ProfileTab />
              <SettingsTab />
              <HistoryTab />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
