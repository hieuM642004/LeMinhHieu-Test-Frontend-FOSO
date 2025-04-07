import { useState } from "react";
import DonutChart from "../../components/Charts/DonutChart";
import { Card } from "../../components/UI/Card";
import Dropdown from "../../components/Dropdown/Dropdown";
import useApi from "../../hooks/useApi";
import { apiService } from "../../services/api";

interface ProductionStatus {
  incomplete: number;
  inProgress: number;
  completed: number;
}



const ProductionStatusSection: React.FC = (

) => {
  const [productionStatusOption, setProductionStatusOption] = useState("Hôm nay");
  const statusOptions = ["Hôm nay", "Hôm qua", "Đang xử lý", "Hoàn thành"];

  // Fetch production status data using useApi hook
  const { data: productionStatus, loading, error } = useApi<ProductionStatus>(
    () => apiService.getProductionStatus(),
    [] 
  );


  return (
    <Card>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-800">Tình Hình Sản Xuất</h3>
          <Dropdown
            label={productionStatusOption}
            options={statusOptions}
            onSelect={setProductionStatusOption}
            className="w-40"
          />
        </div>
        <div className="flex justify-center mb-4">
          <DonutChart  />
        </div>
        {!loading && !error  && (
       
          <div className="grid grid-cols-3 gap-2">
          <div className="border border-gray-300 rounded-md p-1">
            <div className="text-xl font-bold text-yellow-500"> {productionStatus?.incomplete || 0}</div>
            <div className="text-sm text-gray-600">Chưa hoàn thành</div>
          </div>
          <div className="border border-gray-300 rounded-md p-1">
            <div className="text-xl font-bold text-blue-500">  {productionStatus?.inProgress || 0}</div>
            <div className="text-sm text-gray-600">Đang sản xuất</div>
          </div>
          <div className="border border-gray-300 rounded-md p-1">
            <div className="text-xl font-bold text-green-500">{productionStatus?.completed || 0}</div>
            <div className="text-sm text-gray-600">Hoàn thành</div>
          </div>
        </div>
        )}
      </div>
    </Card>
  );
};

export default ProductionStatusSection;