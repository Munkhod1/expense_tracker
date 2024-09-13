"use client";

import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "@/utils/util";
import { toast } from "react-toastify";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [chartData, setChartData] = useState(null);
  const getChartData = async () => {
    try {
      const res = await axios.get(`${apiUrl}/record/chart`);
      console.log("ST", res.data.donut, res.data.bar);
      setChartData({ bar: chartData.bar, donut: chartData.donut });
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch transactions");
    }
  };

  useEffect(() => {
    getChartData();
  }, []);

  return (
    <DashboardContext.Provider
      // Энд алдаа гарав. ? temdeg taviad zassan
      value={{ bar: chartData?.bar, donut: chartData?.donut }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
