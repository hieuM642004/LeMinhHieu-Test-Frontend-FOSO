import type React from "react";

interface MaterialRowProps {
  id: number;
  index: number;
  name: string;
  code: string;
  unit: string;
  quantity: number;
}

const MaterialRow: React.FC<MaterialRowProps> = ({
  index,
  name,
  unit,
  quantity,
}) => {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 text-center">
      <td className="py-2 px-2 text-gray-700">{index}</td>
      <td className="py-2 px-2">
        <div className="flex items-start">
          <div className="mr-3 mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <rect width="32" height="32" rx="4" fill="#D0D5DD" />
              <path
                d="M16.2301 4.40502L16.7401 4.91502C17.5051 5.68002 17.9251 6.69502 17.9251 7.77002C17.9251 8.84502 17.5101 9.85502 16.7551 10.615L12.8801 14.49C12.6801 14.69 12.5701 14.955 12.5701 15.24C12.5701 15.525 12.6801 15.795 12.8801 15.995L17.9501 21.065C18.8851 21.96 20.3651 21.945 21.2801 21.03L18.5801 23.73L16.2251 26.08L9.50507 19.36C8.31007 18.165 7.71007 16.575 7.81007 14.88C7.89507 13.46 8.53007 12.1 9.59007 11.035L16.2251 4.40002L16.2301 4.40502Z"
                fill="#52575E"
              />
              <path
                d="M20.0801 8.26L22.9501 11.13C24.0501 12.23 24.6551 13.69 24.6551 15.25C24.6551 16.805 24.0501 18.265 22.9501 19.365L21.2801 21.035C20.3651 21.95 18.8801 21.965 17.9501 21.07L16.2301 19.35L19.5851 15.995C19.7851 15.795 19.8951 15.525 19.8951 15.245C19.8951 14.96 19.7851 14.69 19.5851 14.49C18.8101 13.715 18.3901 12.7 18.3901 11.62C18.3901 10.54 18.8101 9.52501 19.5751 8.76501L20.0851 8.255L20.0801 8.26Z"
                fill="#667085"
              />
              <path
                d="M16.2341 12.8517L18.2034 14.821C18.4368 15.0543 18.4368 15.4362 18.2034 15.6695L16.2341 17.6388L14.2648 15.6695C14.0315 15.4362 14.0315 15.0543 14.2648 14.821L16.2341 12.8517Z"
                fill="#52575E"
              />
            </svg>
          </div>
          <div>
            <div className="font-bold text-gray-800">{name}</div>
            <div className="text-gray-500 text-xs mt-1 text-left">(none)</div>
            <div className="text-blue-500 text-xs mt-1">NVL_000024</div>
          </div>
        </div>
      </td>
      <td className="py-2 px-2 text-gray-700 font-bold">{unit}</td>
      <td className="py-2 px-2 text-gray-700 font-bold">{quantity}</td>
    </tr>
  );
};

export default MaterialRow;
