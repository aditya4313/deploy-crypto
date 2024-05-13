import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { CoinList } from "./config/api";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setcurrency] = useState("INR");
  const [symbol, setsymbol] = useState("₹");

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setuser] = useState(null);

  const [alert, setAlert] = useState({
    open: false,
    message: " ",
    type: "success",
  });

  const [watchlist, setwatchlist] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setuser(user);
      else setuser(null);

      console.log(user);
    });
  });

  const fetchCoins = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
    } catch (error) {
      console.error("Error fetching coins:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (currency === "INR") setsymbol("₹");
    else if (currency === "USD") setsymbol("$");
  }, [currency, setsymbol]);

  return (
    <crypto.Provider
      value={{
        currency,
        symbol,
        setcurrency,
        coins,
        loading,
        fetchCoins,
        user,
        alert,
        setuser,
        setAlert,
        user,
        watchlist,
      }}
    >
      {children}
    </crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(crypto);
};
