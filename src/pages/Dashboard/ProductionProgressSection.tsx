import { useState } from "react";
import ProgressItem from "../../components/ProgressItem/ProgressItem";
import { Card } from "../../components/UI/Card";
import Dropdown from "../../components/Dropdown/Dropdown";
import { apiService } from "../../services/api";
import useApi from "../../hooks/useApi";
import Loading from "../../components/Loading/Loading";

interface ProductionProgress {
  label: string;
  value: number;
  total: number;
  percentage: string;
}

const ProductionProgressSection: React.FC = () => {
  const [productionProgressOption, setProductionProgressOption] =
    useState("Hoàn thành");
  const statusOptions = ["Hôm nay", "Hôm qua", "Đang xử lý", "Hoàn thành"];

  const {
    data: productionProgress,
    loading,
    error,
  } = useApi<ProductionProgress[]>(
    () => apiService.getProductionProgress(),
    []
  );

  const hasData = productionProgress && productionProgress.length > 0;

  return (
    <Card>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold">Tiến Độ Sản Xuất Theo Nhóm</h3>
          <Dropdown
            label={productionProgressOption}
            options={statusOptions}
            onSelect={setProductionProgressOption}
            className="w-40"
          />
        </div>
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : hasData ? (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {productionProgress!.map((item, index) => (
              <ProgressItem
                key={index}
                label={item.label}
                value={item.value}
                total={item.total}
                percentage={item.percentage}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {/* Display 6 placeholder items in "no data" state */}
            {Array.from({ length: 6 }).map((_, index) => (
              <ProgressItem
                key={index}
                label="Chưa có mặt hàng"
                value={0}
                total={0}
                percentage="0%"
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProductionProgressSection;
