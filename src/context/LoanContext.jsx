import { createContext, useContext, useState } from "react";

const LoanContext = createContext();

export function LoanProvider({ children }) {
  const [loanData, setLoanData] = useState({
    // Step 1
    loanType: "Personal Loan",
    loanAmount: "1000",
    loanPeriod: "12 Months",
    purpose: "",

    // Step 2
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    // Step 3
    workStatus: "Employee",
    annualIncome: "",

    // Details
    pin: "",

    // Authentication
    otp: "",
  });

  const updateLoanData = (values) => {
    setLoanData((prev) => ({
      ...prev,
      ...values,
    }));
  };

  return (
    <LoanContext.Provider
      value={{
        loanData,
        updateLoanData,
      }}
    >
      {children}
    </LoanContext.Provider>
  );
}

export function useLoan() {
  return useContext(LoanContext);
}