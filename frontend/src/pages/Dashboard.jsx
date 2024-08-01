import React from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Users from "../components/Users";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Dashboard = () => {
  const [balance, setBalance] = useState(null);
  const navigate = useNavigate();

  const getBalance = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You are not logged in. Please sign in.");
        navigate("/signin");
        return;
      }
      const res = await axios.get(`${API_BASE_URL}/api/v1/account/balance`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.balance;
    } catch (error) {
      console.error("Error during fetching balance:", error);

      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Response error data:", error.response.data);
        toast.error(
          `Error: ${error.response.status} - ${
            error.response.data.message || "Failed to fetch balance."
          }`
        );
      } else if (error.request) {
        // Request was made but no response received
        console.error("Request error:", error.request);
        toast.error(
          "No response received from server. Please check your network."
        );
      } else {
        // Something went wrong setting up the request
        console.error("General error:", error.message);
        toast.error(`An error occurred: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    const fetchBalance = async () => {
      const balance = await getBalance();
      setBalance(balance);
    };

    fetchBalance();
  }, []);

  return (
    <>
      <Appbar />
      <div className="mt-8">
        <Balance value={balance} />
        <Users />
      </div>
    </>
  );
};

export default Dashboard;
