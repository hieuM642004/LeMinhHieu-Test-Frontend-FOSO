import type React from "react";
import { Card } from "../UI/Card";
import arrowdown from "../../assets/ic-solar_double-alt-arrow-down-bold-duotone.svg";
import arrowup from "../../assets/ic-solar_double-alt-arrow-up-bold-duotone.svg";

interface StatCardProps {
  value: string;
  label: string;
  percentage: string;
  trend?: "up" | "down" | "neutral"; 
}

const StatCard: React.FC<StatCardProps> = ({ value, label, percentage, trend }) => {
  const showTrend = value !== "0" && (trend === "up" || trend === "down");

  return (
    <Card>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="text-3xl font-bold text-[#0375F3]">{value}</div>
          {showTrend && (
            <div
              className={`flex items-center ${
                trend === "up" ? "text-green-500" : "text-red-500"
              }`}
            >
              {trend === "up" ? (
                <img src={arrowup} alt="Arrow Up" className="mr-1" />
              ) : (
                <img src={arrowdown} alt="Arrow Down" className="mr-1" />
              )}
              <span className="text-sm">{percentage}</span>
            </div>
          )}
        </div>
        <div className="text-sm text-black-500 mt-1">{label}</div>
      </div>
    </Card>
  );
};

export default StatCard;