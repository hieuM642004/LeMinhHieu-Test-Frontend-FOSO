"use client";

import type React from "react";
import { useRef } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { apiService } from "../../services/api";
import useApi from "../../hooks/useApi";
import Loading from "../Loading/Loading";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ProductionStatus {
  incomplete: number;
  inProgress: number;
  completed: number;
}

const DonutChart: React.FC = () => {
  const chartRef = useRef<any>(null);

  const {
    data: productionStatus,
    loading,
    error,
  } = useApi<ProductionStatus>(() => apiService.getProductionStatus(), []);

  const hasData =
    productionStatus &&
    (productionStatus.incomplete > 0 ||
      productionStatus.inProgress > 0 ||
      productionStatus.completed > 0);

  const incomplete = hasData ? productionStatus!.incomplete : 0;
  const inProgress = hasData ? productionStatus!.inProgress : 0;
  const completed = hasData ? productionStatus!.completed : 0;
  const total = incomplete + inProgress + completed;

  const incompletePercent =
    total > 0 ? Math.round((incomplete / total) * 100) : 0;
  const inProgressPercent =
    total > 0 ? Math.round((inProgress / total) * 100) : 0;
  const completedPercent =
    total > 0 ? Math.round((completed / total) * 100) : 0;

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",

    animation: {
      animateRotate: true,
      duration: 800,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  const data = {
    labels: ["Chưa hoàn thành", "Đang sản xuất", "Hoàn thành"],
    datasets: [
      {
        data: hasData ? [incomplete, inProgress, completed] : [1, 1, 1],
        backgroundColor: hasData
          ? ["#1FC583", "#0375F3", "#FF8F0D"]
          : ["#E5E7EB", "#E5E7EB", "#E5E7EB"],
        borderWidth: 4,
        borderRadius: 20,
        hoverOffset: 0,
      },
    ],
  };

  return (
    <div className="relativeh h-60 w-60">
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="relative h-full">
          <Doughnut ref={chartRef} options={options} data={data} />

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="text-3xl font-bold text-gray-800">{total}</div>
            <div className="text-sm text-gray-500">Lệnh sản xuất</div>
          </div>

          {/* Percent labels with connector lines */}
          {hasData && (
            <>
              {/* Incomplete - Left */}
              <div className="absolute top-[10%] -left-[72px]">
                <svg width="110" height="30" viewBox="0 0 110 30" fill="none">
                  <path
                    d="M110 28L55 2H0"
                    stroke="#FF8F0D"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute top-[-10px] left-[px] bg-[#FF8F0D] text-white text-xs font-bold px-3 py-1 rounded-full">
                  {incompletePercent}%
                </div>
              </div>

              {/* Completed - Right */}
              <div className="absolute top-[15%] -right-[82px]">
                <svg width="110" height="30" viewBox="0 0 110 30" fill="none">
                  <path
                    d="M0 28L55 2H110"
                    stroke="#1FC583"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute top-[-10px] right-0 bg-[#1FC583] text-white text-xs font-bold px-3 py-1 rounded-full">
                  {completedPercent}%
                </div>
              </div>

              {/* InProgress - Bottom */}
              <div className="absolute bottom-[5%] left-[220px] -translate-x-1/2">
                <svg width="110" height="30" viewBox="0 0 110 30" fill="none">
                  <path
                    d="M0 2L55 28H110"
                    stroke="#0375F3"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute top-[13px] left-[134px] -translate-x-1/2 bg-[#0375F3] text-white text-xs font-bold px-3 py-1 rounded-full">
                  {inProgressPercent}%
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DonutChart;
