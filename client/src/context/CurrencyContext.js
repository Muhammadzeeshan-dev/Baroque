import React, { createContext, useState, useContext } from "react";

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState({
    name: "PAKISTAN",
    code: "PKR",
    symbol: "Rs",
    rate: 1,
    flag: "🇵🇰",
  });

  const changeCurrency = (newCurrency) => setCurrency(newCurrency);

  const convertPrice = (price) => {
    if (!price) return 0;
    const numericPrice =
      typeof price === "number" ? price : parseFloat(price) || 0;
    return (numericPrice * currency.rate).toFixed(2);
  };

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, changeCurrency, convertPrice }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context)
    throw new Error("useCurrency must be used within a CurrencyProvider");
  return context;
};

export default CurrencyContext;
