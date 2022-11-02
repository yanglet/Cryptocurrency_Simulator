import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { BALANCE, CRYPTOCURRENCY } from "../../pages/config";
import authHeader from "../../services/auth-header";
import useSWR from "swr";

export const BalanceContext = createContext({
  content: () => {},
  data: () => {}
});

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const BalanceProvider = ({ children }) => {
  const [content, setContent] = useState([]);
  const { data, error } = useSWR(`${CRYPTOCURRENCY.CRYPTOCURRENCY}`, fetcher);

  useEffect(() => {
    axios
      .get(`${BALANCE.BALANCE}`, {
        headers: authHeader(),
      })
      .then((result) => {
        setContent(result.data);
      });
  }, [setContent]);

  return (
    <BalanceContext.Provider value={[content, data]}>
      {children}
    </BalanceContext.Provider>
  );
};
