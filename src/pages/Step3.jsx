import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Step3() {
  const [workStatus, setWorkStatus] = useState("Employee");
  const [annualIncome, setAnnualIncome] = useState("");

  // Example values carried over from previous steps
  const summary = {
    loanAmount: "$1,000",
    loanPeriod: "12 Months",
    purpose: "Ghh",
    applicant: "Mathew Mathew",
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
      <div className="flex-1 px-4 pt-6 pb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto">
          <h2
            className="text-center text-3xl text-gray-900 mb-1"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Loan Application
          </h2>
          <p className="text-center text-gray-400 text-sm mb-6">Step 3 of 3</p>

          {/* Progress bar */}
          <div className="flex items-center gap-2 mb-8">
            <div className="h-1.5 flex-1 rounded-full bg-gradient-to-r from-lime-400 to-green-600"></div>
            <div className="h-1.5 flex-1 rounded-full bg-gradient-to-r from-lime-400 to-green-600"></div>
            <div className="h-1.5 flex-1 rounded-full bg-gradient-to-r from-lime-400 to-green-600"></div>
          </div>

          {/* Work Status */}
          <label className="block text-gray-800 mb-2">Work Status</label>
          <div className="relative mb-6">
            <select
              value={workStatus}
              onChange={(e) => setWorkStatus(e.target.value)}
              className="w-full appearance-none border border-gray-300 rounded-xl px-4 py-3.5 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
            >
              <option>Employee</option>
              <option>Self-Employed</option>
              <option>Business Owner</option>
              <option>Unemployed</option>
              <option>Retired</option>
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              ▾
            </span>
          </div>

          {/* Annual Income */}
          <label className="block text-gray-800 mb-2">Annual Income ($)</label>
          <input
            type="number"
            value={annualIncome}
            onChange={(e) => setAnnualIncome(e.target.value)}
            placeholder="25,000"
            className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-gray-800 text-base mb-6 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400"
          />

          {/* Application Summary */}
          <div
            className="bg-gray-50 rounded-xl p-5 mb-6"
            style={{ borderLeft: "4px solid #57b129" }}
          >
            <h3
              className="text-lg text-gray-900 mb-4"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Application Summary
            </h3>

            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-500">Loan Amount:</span>
              <span className="text-gray-900">{summary.loanAmount}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-500">Loan Period:</span>
              <span className="text-gray-900">{summary.loanPeriod}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-500">Purpose:</span>
              <span className="text-gray-900">{summary.purpose}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-500">Applicant:</span>
              <span className="text-gray-900">{summary.applicant}</span>
            </div>
          </div>

          {/* Placeholder secondary button */}
          <button
            type="button"
            disabled
            className="w-full bg-gray-200 text-gray-500 text-sm tracking-wide py-4 rounded-xl mb-4 cursor-not-allowed"
          >
            SO THAT
          </button>

          {/* Send Request button */}
          <Link
          to="/details"
            className="w-full text-white text-lg py-4 rounded-xl tracking-wide"
            style={{
              background: "linear-gradient(to right, #a3dd3f, #57b129)",
              fontFamily: "Arial, sans-serif",
            }}
          >
            SEND REQUEST
          </Link>
        </div>
      </div>
    </div>
  );
}