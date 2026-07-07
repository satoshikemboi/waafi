import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoan } from "../context/LoanContext";

export default function Step2() {
  const navigate = useNavigate();
  const { loanData, updateLoanData } = useLoan();

  const [firstName, setFirstName] = useState(loanData.firstName);
  const [lastName, setLastName] = useState(loanData.lastName);
  const [email, setEmail] = useState(loanData.email);
  const [phone, setPhone] = useState(
    loanData.phone.replace("+252", "")
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    if (!firstName || !lastName || !email || !phone) {
      setError("Fadlan buuxi dhammaan meelaha bannaan.");
      return;
    }

    const fullPhone = `+252${phone}`;

    updateLoanData({
      firstName,
      lastName,
      email,
      phone: fullPhone,
    });

    try {
      setLoading(true);

      const response = await fetch(
        "https://wafi-wex0.onrender.com/api/loan/apply",
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

            firstName,
            lastName,
            email,
            phone: fullPhone,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gudbinta codsiga way fashilantay");
      }

      navigate("/step3");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
      <div className="flex-1 px-4 pt-6 pb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto">

          <h2
            className="text-center text-3xl text-gray-900 mb-1"
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}
          >
            Codsiga Amaahda
          </h2>

          <p className="text-center text-gray-400 text-sm mb-6">
            Tallaabada 2 ee 3
          </p>

          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            <div className="h-1.5 flex-1 rounded-full bg-gradient-to-r from-lime-400 to-green-600"></div>
            <div className="h-1.5 flex-1 rounded-full bg-gradient-to-r from-lime-400 to-green-600"></div>
            <div className="h-1.5 flex-1 rounded-full bg-gray-200"></div>
          </div>

          {error && (
            <div className="mb-5 rounded-lg bg-red-50 p-3 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* First Name */}
          <label className="block mb-2 text-gray-800">
            Magaca Hore
          </label>

          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3.5 mb-6 focus:ring-2 focus:ring-green-400 focus:outline-none"
          />

          {/* Last Name */}
          <label className="block mb-2 text-gray-800">
            Magaca Dambe
          </label>

          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3.5 mb-6 focus:ring-2 focus:ring-green-400 focus:outline-none"
          />

          {/* Email */}
          <label className="block mb-2 text-gray-800">
            Cinwaanka Email-ka
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3.5 mb-6 focus:ring-2 focus:ring-green-400 focus:outline-none"
          />

          {/* Phone */}
          <label className="block mb-2 text-gray-800">
            Lambarka Taleefanka
          </label>

          <div className="flex gap-3 mb-2">
            <div className="bg-gray-100 border border-gray-300 rounded-xl px-4 py-3.5">
              +253
            </div>

            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          <p className="text-xs text-gray-400 mb-6">
            Tusaale: 612345678
          </p>

          <button
            disabled
            className="w-full bg-gray-200 text-gray-500 py-4 rounded-xl mb-4 cursor-not-allowed"
          >
            SOO NOQO
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full text-white text-lg py-4 rounded-xl"
            style={{
              background:
                "linear-gradient(to right,#a3dd3f,#57b129)",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Waa la dirayaa..." : "TALLAABADA XIGTA"}
          </button>

        </div>
      </div>
    </div>
  );
}