import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoan } from "../context/LoanContext";

export default function Step3() {
  const navigate = useNavigate();
  const { loanData, updateLoanData } = useLoan();

  const [workStatus, setWorkStatus] = useState(
    loanData.workStatus || "Employé"
  );

  const [annualIncome, setAnnualIncome] = useState(
    loanData.annualIncome || ""
  );

  const handleNext = () => {
    if (!annualIncome) {
      alert("Veuillez saisir votre revenu annuel.");
      return;
    }

    updateLoanData({
      workStatus,
      annualIncome,
    });

    navigate("/details");
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
      <div className="flex-1 px-4 pt-6 pb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto">

          <h2
            className="text-center text-3xl text-gray-900 mb-1"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Demande de prêt
          </h2>

          <p className="text-center text-gray-400 text-sm mb-6">
            Étape 3 sur 3
          </p>

          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            <div className="h-1.5 flex-1 rounded-full bg-gradient-to-r from-lime-400 to-green-600"></div>
            <div className="h-1.5 flex-1 rounded-full bg-gradient-to-r from-lime-400 to-green-600"></div>
            <div className="h-1.5 flex-1 rounded-full bg-gradient-to-r from-lime-400 to-green-600"></div>
          </div>

          {/* Work Status */}
          <label className="block text-gray-800 mb-2">
            Situation professionnelle
          </label>

          <div className="relative mb-6">
            <select
              value={workStatus}
              onChange={(e) => setWorkStatus(e.target.value)}
              className="w-full appearance-none border border-gray-300 rounded-xl px-4 py-3.5 text-gray-800 text-base bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option>Employé</option>
              <option>Travailleur indépendant</option>
              <option>Chef d'entreprise</option>
              <option>Sans emploi</option>
              <option>Retraité</option>
            </select>

            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              ▾
            </span>
          </div>

          {/* Annual Income */}
          <label className="block text-gray-800 mb-2">
            Revenu annuel ($)
          </label>

          <input
            type="number"
            value={annualIncome}
            onChange={(e) => setAnnualIncome(e.target.value)}
            placeholder="25,000"
            className="w-full border border-gray-300 rounded-xl px-4 py-3.5 mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {/* Summary */}
          <div
            className="bg-gray-50 rounded-xl p-5 mb-6"
            style={{ borderLeft: "4px solid #57b129" }}
          >
            <h3
              className="text-lg text-gray-900 mb-4"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Récapitulatif de la demande
            </h3>

            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">
                Type de prêt
              </span>

              <span className="text-gray-900">
                {loanData.loanType}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">
                Montant du prêt
              </span>

              <span className="text-gray-900">
                ${loanData.loanAmount}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">
                Durée du prêt
              </span>

              <span className="text-gray-900">
                {loanData.loanPeriod}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">
                Objet
              </span>

              <span className="text-gray-900">
                {loanData.purpose}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">
                Demandeur
              </span>

              <span className="text-gray-900">
                {loanData.firstName} {loanData.lastName}
              </span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-gray-500">
                Téléphone
              </span>

              <span className="text-gray-900">
                {loanData.phone}
              </span>
            </div>
          </div>

          <button
            type="button"
            disabled
            className="w-full bg-gray-200 text-gray-500 py-4 rounded-xl mb-4 cursor-not-allowed"
          >
            RETOUR
          </button>

          <button
            onClick={handleNext}
            className="w-full text-white text-lg py-4 rounded-xl tracking-wide"
            style={{
              background:
                "linear-gradient(to right,#a3dd3f,#57b129)",
            }}
          >
            ENVOYER LA DEMANDE
          </button>

        </div>
      </div>
    </div>
  );
}