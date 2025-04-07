import { useState } from "react";
import HorizontalBarChart from "../../components/Charts/HorizontalBarChart";
import { Card } from "../../components/UI/Card";
import Dropdown from "../../components/Dropdown/Dropdown";

const TopCustomersChart: React.FC = () => {
  const [topCustomersOption, setTopCustomersOption] = useState('Năm nay');
  const yearOptions = ['Năm nay', 'Năm trước', '2 năm trước'];

  return (
    <Card>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold">Top 5 Khách Hàng Có Sản Lượng Nhiều Nhất</h3>
          <Dropdown
            label={topCustomersOption}
            options={yearOptions}
            onSelect={setTopCustomersOption}
            className="w-40"
          />
        </div>
        <div className="h-64 relative">
          <HorizontalBarChart />
        </div>
      </div>
    </Card>
  );
};

export default TopCustomersChart;