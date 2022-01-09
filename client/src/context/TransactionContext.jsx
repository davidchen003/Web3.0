import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window; // because of MetaMask extension, we have access to window.ethereum object (see it in browser console)

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  console.log({
    provider,
    signer,
    transactionContract,
  });
};

export const TransactionsProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");

  const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });


  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        //getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
  }, []);

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      //get data from input form
      const { addressTo, amount, keyword, message } = formData;

      getEthereumContract()

    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }

  }


  return (
    <TransactionContext.Provider value={{
      connectWallet, currentAccount,
      formData, setformData, handleChange, sendTransaction
    }}>
      {children}
    </TransactionContext.Provider>
  );
};
