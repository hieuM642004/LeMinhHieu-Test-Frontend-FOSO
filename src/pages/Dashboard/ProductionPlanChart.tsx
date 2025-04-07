import { useState } from "react";
import BarChart from "../../components/Charts/BarChart";
import { Card } from "../../components/UI/Card";
import Dropdown from "../../components/Dropdown/Dropdown";

const ProductionPlanChart: React.FC = () => {
  const [productionPlanOption, setProductionPlanOption] = useState('Quý này');
  const periodOptions = ['Quý này', 'Quý trước', 'Năm nay', 'Năm trước'];

  return (
    <Card>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg text-gray-800">Kế Hoạch Sản Xuất</h3>
          <Dropdown
            label={productionPlanOption}
            options={periodOptions}
            onSelect={setProductionPlanOption}
            className="w-40"
          />
        </div>
        <div className="h-72 relative">
          <BarChart />
        </div>
      </div>
    </Card>
  );
};

export default ProductionPlanChart;