import { useState } from "react";
import StatCard from "../../components/StatCard/StatCard";
import Dropdown from "../../components/Dropdown/Dropdown";
import { apiService } from "../../services/api";
import useApi from "../../hooks/useApi"; // Import the custom hook
import Loading from "../../components/Loading/Loading";

interface TopProduct {
  value: string;
  label: string;
  percentage: string;
  trend: 'up' | 'down';
}

const TopProductsSection: React.FC = () => {
  const [topProductsOption, setTopProductsOption] = useState('Tháng này');
  const dateOptions = ['Hôm nay', 'Hôm qua', 'Tuần này', 'Tháng này'];

  const { data: topProducts, loading, error } = useApi<TopProduct[]>(
    () => apiService.getTopProducts(),
    []
  );

  const hasData = topProducts && topProducts.length > 0;

  return (
    <section className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">Top Sản Phẩm Sản Xuất Nhiều Nhất</h2>
        <Dropdown
          label={topProductsOption}
          options={dateOptions}
          onSelect={setTopProductsOption}
          className="w-40"
        />
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {hasData ? (
            topProducts!.map((product, index) => (
              <StatCard
                key={index}
                value={product.value}
                label={product.label}
                percentage={product.percentage}
                trend={product.trend}
              />
            ))
          ) : (
            <>
              <StatCard value="0" label="Chưa có mặt hàng" percentage="0%" />
              <StatCard value="0" label="Chưa có mặt hàng" percentage="0%" />
              <StatCard value="0" label="Chưa có mặt hàng" percentage="0%" />
              <StatCard value="0" label="Chưa có mặt hàng" percentage="0%" />
              <StatCard value="0" label="Chưa có mặt hàng" percentage="0%" />
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default TopProductsSection;