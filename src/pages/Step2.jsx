import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Step2() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    if (!firstName || !lastName || !email || !phone) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/loan/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone: `+252${phone}`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit form");
      }

      console.log("Saved:", data);

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
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Loan Application
          </h2>

          <p className="text-center text-gray-400 text-sm mb-6">
            Step 2 of 3
          </p>

          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            <div className="h-1.5 flex-1 rounded-full bg-gradient-to-r from-lime-400 to-green-600"></div>
            <div className="h-1.5 flex-1 rounded-full bg-gradient-to-r from-lime-400 to-green-600"></div>
            <div className="h-1.5 flex-1 rounded-full bg-gray-200"></div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 text-red-600 text-sm bg-red-50 p-2 rounded-lg">
              {error}
            </div>
          )}

          {/* First Name */}
          <label className="block text-gray-800 mb-2">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Ahmed"
            className="w-full border border-gray-300 rounded-xl px-4 py-3.5 mb-6 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {/* Last Name */}
          <label className="block text-gray-800 mb-2">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Hassan"
            className="w-full border border-gray-300 rounded-xl px-4 py-3.5 mb-6 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {/* Email */}
          <label className="block text-gray-800 mb-2">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ahmed.hassan@example.com"
            className="w-full border border-gray-300 rounded-xl px-4 py-3.5 mb-6 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {/* Phone */}
          <label className="block text-gray-800 mb-2">Phone Number</label>
          <div className="flex gap-3 mb-2">
            <div className="bg-gray-100 border border-gray-300 rounded-xl px-4 py-3.5">
              +252
            </div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="612345678"
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <p className="text-xs text-gray-400 mb-6">
            Enter 9 digits (example: 612345678)
          </p>

          {/* Disabled button */}
          <button
            disabled
            className="w-full bg-gray-200 text-gray-500 text-sm py-4 rounded-xl mb-4 cursor-not-allowed"
          >
            SO THAT
          </button>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full text-white text-lg py-4 rounded-xl tracking-wide"
            style={{
              background: "linear-gradient(to right, #a3dd3f, #57b129)",
              fontFamily: "Arial, sans-serif",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Submitting..." : "NEXT STEP"}
          </button>
        </div>
      </div>
    </div>
  );
}