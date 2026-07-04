import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Step1() {
  const [loanType, setLoanType] = useState("Personal Loan");
  const [loanAmount, setLoanAmount] = useState("1000");
  const [loanPeriod, setLoanPeriod] = useState("12 Months");
  const [purpose, setPurpose] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
      {/* Top gradient strip */}
      <div
        className="h-3 w-full"
        style={{ background: "linear-gradient(to right, #a3dd3f, #57b129)" }}
      ></div>

      {/* Content */}
      <div className="flex-1 px-4 pt-6 pb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto">
          <h2
            className="text-center text-3xl text-gray-900 mb-1"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Loan Application
          </h2>
          <p className="text-center text-gray-400 text-sm mb-6">Step 1 of 3</p>

          {/* Progress bar */}
          <div className="flex items-center gap-2 mb-8">
            <div className="h-1.5 flex-1 rounded-full bg-gradient-to-r from-lime-400 to-green-600"></div>
            <div className="h-1.5 flex-1 rounded-full bg-gray-200"></div>
            <div className="h-1.5 flex-1 rounded-full bg-gray-200"></div>
          </div>

          {/* Loan Type */}
          <label className="block text-gray-800 mb-2">Loan Type</label>
          <div className="relative mb-6">
            <select
              value={loanType}
              onChange={(e) => setLoanType(e.target.value)}
              className="w-full appearance-none border border-gray-300 rounded-xl px-4 py-3.5 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
            >
              <option>Personal Loan</option>
              <option>Business Loan</option>
              <option>Emergency Loan</option>
              <option>Education Loan</option>
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              ▾
            </span>
          </div>

          {/* Loan Amount */}
          <label className="block text-gray-800 mb-2">Loan Amount ($)</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-gray-800 text-base mb-6 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {/* Loan Period */}
          <label className="block text-gray-800 mb-2">Loan Period</label>
          <div className="relative mb-6">
            <select
              value={loanPeriod}
              onChange={(e) => setLoanPeriod(e.target.value)}
              className="w-full appearance-none border border-gray-300 rounded-xl px-4 py-3.5 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
            >
              <option>6 Months</option>
              <option>12 Months</option>
              <option>24 Months</option>
              <option>36 Months</option>
              <option>60 Months</option>
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              ▾
            </span>
          </div>

          {/* Purpose */}
          <label className="block text-gray-800 mb-2">Purpose of the Loan</label>
          <textarea
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="What will you use the loan for?"
            rows={4}
            className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-gray-800 text-base mb-8 resize-y focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400"
          ></textarea>

          {/* Next Step button */}
          <Link
          to="/step2"
            className="w-full text-white text-lg py-4 rounded-xl tracking-wide"
            style={{
              background: "linear-gradient(to right, #a3dd3f, #57b129)",
              fontFamily: "Arial, sans-serif",
            }}
          >
            NEXT STEP
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-400 text-sm py-5">
        © 2026 Wafi Somalia
      </div>
    </div>
  );
}