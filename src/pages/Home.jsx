import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [loanAmount, setLoanAmount] = useState(1000);
  const [loanPeriod, setLoanPeriod] = useState(12);

  const ANNUAL_RATE = 0.18;
  const monthlyPayment =
    (loanAmount * (1 + ANNUAL_RATE * (loanPeriod / 12))) / loanPeriod;

  const amountPct = ((loanAmount - 100) / (5000 - 100)) * 100;
  const periodPct = ((loanPeriod - 6) / (60 - 6)) * 100;

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <style>{`
        input[type="range"].slider-green {
          -webkit-appearance: none;
          appearance: none;
          height: 4px;
          border-radius: 2px;
          outline: none;
          background: transparent;
        }
        input[type="range"].slider-green::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #63b330;
          cursor: pointer;
          border: none;
          box-shadow: 0 1px 4px rgba(0,0,0,0.35);
          margin-top: -1px;
        }
        input[type="range"].slider-green::-moz-range-thumb {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #63b330;
          cursor: pointer;
          border: none;
          box-shadow: 0 1px 4px rgba(0,0,0,0.35);
        }
        input[type="range"].slider-green::-moz-range-track {
          height: 4px;
          border-radius: 2px;
          background: #d9dbdd;
        }
      `}</style>

      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-7"
        style={{ background: "linear-gradient(to right, #a3dd3f, #57b129)" }}
      >
        <h1
          className="text-white text-3xl"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          Enough
        </h1>
        <div className="flex flex-col gap-1.5">
          <span className="block w-7 h-0.5 bg-gray-800 rounded"></span>
          <span className="block w-7 h-0.5 bg-gray-800 rounded"></span>
          <span className="block w-7 h-0.5 bg-gray-800 rounded"></span>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-6 pb-10">
        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto">
          <h2
            className="text-center text-3xl text-gray-900 mb-2"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Hel Deg Deg Ah
          </h2>

          <p className="text-center text-gray-500 text-sm mb-6">
            Ansixin Deg Deg ah &bull; Qiime Macquul ah &bull; Shuruudo Fudud
          </p>

          <div className="bg-gray-50 rounded-xl p-5">
            <h3
              className="text-xl text-gray-900 mb-5"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Xisaabinta Amaahda
            </h3>

            {/* Loan Amount */}
            <div className="flex justify-between items-baseline mb-3">
              <span className="text-gray-700">Lacagta Amaahda</span>
              <span className="text-green-600 font-semibold text-xl">
                ${loanAmount.toLocaleString()}
              </span>
            </div>

            <input
              type="range"
              min="100"
              max="5000"
              step="10"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="slider-green w-full"
            />

            <div className="flex justify-between text-sm text-gray-500 mt-2 mb-6">
              <span>$100</span>
              <span>$5,000</span>
            </div>

            {/* Loan Period */}
            <div className="flex justify-between items-baseline mb-3">
              <span className="text-gray-700">Muddada Amaahda</span>
              <span className="text-green-600 font-semibold text-xl">
                {loanPeriod} bilood
              </span>
            </div>

            <input
              type="range"
              min="6"
              max="60"
              step="1"
              value={loanPeriod}
              onChange={(e) => setLoanPeriod(Number(e.target.value))}
              className="slider-green w-full"
            />

            <div className="flex justify-between text-sm text-gray-500 mt-2 mb-6">
              <span>6 bilood</span>
              <span>60 bilood</span>
            </div>

            {/* Monthly Payment */}
            <div className="bg-white border border-gray-200 rounded-xl px-5 py-5 flex justify-between items-center">
              <span className="text-gray-700 text-lg">
                Lacagta Bishii La Bixinayo
              </span>

              <span
                className="text-green-600 font-bold text-3xl"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                ${monthlyPayment.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Apply button */}
          <Link
            to="/step1"
            className="w-full text-white text-lg py-4 rounded-xl mt-6 tracking-wide"
            style={{
              background: "linear-gradient(to right, #a3dd3f, #57b129)",
              fontFamily: "Arial, sans-serif",
              display: "block",
              textAlign: "center",
              textDecoration: "none",
              padding: "16px",
            }}
          >
            CODSO AMA AH
          </Link>

          {/* Features */}
          <div className="mt-7 space-y-5">
            <div className="flex items-center gap-4">
              <span className="text-3xl leading-none">⚡</span>
              <div className="flex items-baseline gap-2">
                <span
                  className="text-gray-900 text-lg"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  Ansixin Deg Deg ah
                </span>
                <span className="text-gray-400 text-sm">
                  24 saac gudahood
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl leading-none">💰</span>
              <div className="flex items-baseline gap-2">
                <span
                  className="text-gray-900 text-lg"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  Qiimo Hoose
                </span>

                <span className="text-gray-400 text-sm">
                  Laga bilaabo 18%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}