import type React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import type { ChartOptions } from "chart.js";
import { apiService } from "../../services/api";
import useApi from "../../hooks/useApi";
import Loading from "../Loading/Loading";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface TopCustomer {
  label: string;
  value: number;
}

const HorizontalBarChart: React.FC = () => {
  const {
    data: topCustomers,
    loading,
    error,
  } = useApi<TopCustomer[]>(() => apiService.getTopCustomers(), []);

  const hasData = topCustomers && topCustomers.length > 0;

  const emptyLabels = Array(5).fill("-");

  const options: ChartOptions<"bar"> = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 30,
        bottom: 30,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 3200,
        ticks: {
          stepSize: 800,
          font: {
            size: 12,
          },
          color: "#6B7280",
        },
        grid: {
          color: "rgba(0,0,0,0.05)",
        },
        border: {
          display: false,
        },
        title: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          color: "#6B7280",
          callback: (value: any, index: number) => {
            if (!hasData) {
              return emptyLabels[index];
            }
            return value;
          },
        },
        title: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: !!hasData,
        callbacks: {
          label: (context: any) => `Sản lượng: ${context.raw}`,
        },
      },
    },
  };

  const data = {
    labels: hasData ? topCustomers!.map((c) => c.label) : emptyLabels,
    datasets: [
      {
        data: hasData ? topCustomers!.map((c) => c.value) : Array(5).fill(null),
        backgroundColor: hasData ? "#0375F3" : "#E5E7EB",
        borderRadius: 4,
        barThickness: 8,
      },
    ],
  };

  return (
    <div className="relative h-64">
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-red-500">{error}</div>
        </div>
      ) : (
        <>
          <div className="absolute top-0 left-0 text-gray-600 text-sm">
            Khách hàng
          </div>
          <Bar options={options} data={data} />
          <div className="absolute bottom-0 left-0 text-gray-600 text-sm">
            Sản lượng
          </div>
        </>
      )}
    </div>
  );
};

export default HorizontalBarChart;
