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

interface ProductionPlan {
  labels: string[];
  planData: number[];
  actualData: number[];
}

const options: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      left: 10,
      right: 10,
      top: 30,
      bottom: 10,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
      ticks: {
        font: {
          size: 14,
          weight: "bold",
        },
        color: "#6B7280",
        padding: 8,
        display: true, 
      },
      title: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      max: 100,
      position: "left",
      ticks: {
        stepSize: 20,
        font: {
          size: 14,
        },
        color: "#6B7280",
        padding: 10,
        display: true, 
      },
      grid: {
        color: "rgba(0,0,0,0.05)",
        drawTicks: false,
      },
      border: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: true, 
      position: "top",
      align: "end",
      maxHeight: 100,
      labels: {
        usePointStyle: true,
        pointStyle: "rect",
        boxWidth: 30, 
        boxHeight: 16,
        borderRadius: 8, 
        padding: 20,
        font: {
          size: 14,
        },
        color: "#6B7280",
      },
    },
    tooltip: {
      enabled: true, 
      position: "nearest",
      backgroundColor: "#000",
      titleFont: {
        size: 12,
      },
      bodyFont: {
        size: 12,
      },
      bodyColor: "#fff",
      padding: 8,
      cornerRadius: 4,
      displayColors: false,
      callbacks: {
        label: (context) => {
          const value = context.raw as number;
          return `${value} cái`;
        },
        title: () => "",
      },
    },
    title: {
      display: false,
    },
  },
};

const BarChart: React.FC = () => {
  const {
    data: productionPlan,
    loading,
    error,
  } = useApi<ProductionPlan>(
    () => apiService.getProductionPlan(),
    []
  );

  const hasData =
    productionPlan &&
    productionPlan.labels.length > 0 &&
    productionPlan.planData.length > 0 &&
    productionPlan.actualData.length > 0;

  const data = {
    labels: hasData ? productionPlan!.labels : [""], 
    datasets: [
      {
        label: "Kế hoạch",
        data: hasData ? productionPlan!.planData : [], 
        backgroundColor: "#0375F3", 
        borderRadius: 4,
        barThickness: 20,
        categoryPercentage: 0.8,
        barPercentage: 0.5,
      },
      {
        label: "Thực hiện",
        data: hasData ? productionPlan!.actualData : [], 
        backgroundColor: "#1FC583", 
        borderRadius: 4,
        barThickness: 20,
        categoryPercentage: 0.8,
        barPercentage: 0.5,
      },
    ],
  };

  return (
    <div className="relative h-72">
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <>
          <div className="absolute left-5 top-8 text-gray-600 text-sm">Cái</div>
          <Bar
            options={{
              ...options,
              scales: {
                x: {
                  ...options.scales?.x,
                  ticks: {
                    ...options.scales?.x?.ticks,
                    display: Boolean(hasData),
                  },
                },
                y: {
                  ...options.scales?.y,
                  ticks: {
                    ...options.scales?.y?.ticks,
                    display: true,
                  },
                },
              },
              plugins: {
                ...options.plugins,
                legend: {
                  ...options.plugins?.legend,
                  display: true,
                },
                tooltip: {
                  ...options.plugins?.tooltip,
                  enabled: !!hasData,
                },
              },
            }}
            data={data}
          />

          <div
            className={`absolute ${
              hasData ? "bottom-5" : "bottom-[-10px]"
            } left-0 text-gray-600 text-sm`}
          >
            Mặt hàng
          </div>
        </>
      )}
    </div>
  );
};

export default BarChart;
