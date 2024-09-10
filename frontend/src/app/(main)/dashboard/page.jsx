"use client";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user-context";
import axios from "axios";
import { apiUrl } from "../../../utils/util";
import { toast } from "react-toastify";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { TbPointFilled } from "react-icons/tb";
import BarChart from "@/app/components/dashboard/BarChart";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Chart,
  Legend,
} from "chart.js";
import DoughnurChart from "@/app/components/dashboard/Doughnut";

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Legend);

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [transactions, setTransactions] = useState([]);
  const [cardInfo, setCardInfo] = useState(null);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`${apiUrl}/records`);
      console.log("DD", res.data.guilgee);
      setTransactions(res.data.guilgee);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch transactions");
    }
  };

  const getInfoCardData = async () => {
    try {
      const res = await axios.get(`${apiUrl}/records/info`);
      console.log("ST", res.data);
      setCardInfo(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch transactions");
    }
  };

  useEffect(() => {
    fetchTransactions();
    getInfoCardData();
  }, [user]);

  console.log("cardInfo", cardInfo);
  return (
    <div className="container mx-auto mt-6">
      <div className="container grid grid-cols-3 gap-10 ">
        {/* card1 */}
        <div className="flex w-[384px] card  bg-blue-600 text-primary-content">
          <div className="card-body">
            <img className="w-32" src="./logo-01.svg" alt="" />
            <p className=" ">Cash</p>
            <p className="text-3xl">10,000,0</p>
            <img
              className="flex, absolute h-10 top-32 right-10 "
              src="./Union.svg"
              alt=""
            />
            <img
              className="flex, absolute left-40 top-0"
              src="./Shape.svg"
              alt=""
            />
          </div>
        </div>
        {/* INC */}
        <div className="w-full p-0 shadow-xl card bg-base-100">
          <div className="flex flex-col gap-5 card-body ">
            <div className="flex items-center border-b-2 ">
              <TbPointFilled color="green" />
              <h2 className="card-title ">Your Income </h2>
            </div>
            <h1 className="text-3xl font-semibold">{cardInfo?.income?.sum}$</h1>
            <span className="opacity-50">Your Income Account</span>
            <div className="flex items-end ">
              <FaArrowAltCircleUp color="green" size={20} className="mr-2" />
              <span>32&#37; from last month</span>
            </div>
          </div>
        </div>
        {/* INC */}
        {/* EXP */}
        <div className="w-full shadow-xl card bg-base-100 ">
          <div className="flex flex-col gap-5 card-body ">
            <div className="flex items-center border-b-2">
              <TbPointFilled color="blue" />
              <h2 className="mb-2 card-title ">Total expenses </h2>
            </div>
            <h1 className="text-3xl font-semibold">
              -{cardInfo?.expense?.sum}$
            </h1>
            <span className="opacity-50">Your Income Account</span>
            <div className="flex items-end ">
              <FaArrowAltCircleDown color="green" size={20} className="mr-2" />
              <span>32&#37; from last month</span>
            </div>
          </div>
        </div>
        {/* EXP */}
        {/* CHART */}
        <BarChart />
        <DoughnurChart />
        {/* CHART */}
        {/* TRANSACTION LIST*/}
        {transactions?.map((tr) => (
          <div>{tr.name}</div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
