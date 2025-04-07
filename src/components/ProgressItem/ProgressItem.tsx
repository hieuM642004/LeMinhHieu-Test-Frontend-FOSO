import type React from "react";

interface ProgressItemProps {
  label: string;
  value: number;
  total: number;
  percentage: string;
}

const ProgressItem: React.FC<ProgressItemProps> = ({
  label,
  value,
  percentage,
}) => {
  const hasData = value > 0;

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        {hasData ? (
          <span>
            {value} cái ({percentage})
          </span>
        ) : (
          <span>-</span>
        )}
      </div>
      <div className="w-full bg-gray-200 h-2 rounded-full">
        {hasData && (
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: percentage }}
          />
        )}
      </div>
    </div>
  );
};

export default ProgressItem;
