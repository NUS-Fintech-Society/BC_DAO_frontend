import React from "react";

export default function IndividualLineFormat({ header, type = "default" }) {
  if (type === "first") {
    return (
      <div className="p-4 px-6 text-lg font-semibold border-b">{header}</div>
    );
  }
  if (type === "default") {
    return (
      <div className="p-4 px-6 text-lg font-semibold border-b">{header}</div>
    );
  }
  if (type === "last") {
    return <div className="p-4 px-6 text-lg font-semibold">{header}</div>;
  }
}
