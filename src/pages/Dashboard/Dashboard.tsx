import Header from "../../components/Header/Header";
import TopProductsSection from "./TopProductsSection";
import ProductionPlanChart from "./ProductionPlanChart";
import TopCustomersChart from "./TopCustomersChart";
import ProductionStatusSection from "./ProductionStatusSection";
import ProductionProgressSection from "./ProductionProgressSection";
import MaterialsSection from "./MaterialsSection";

export default function Dashboard() {

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="p-4">
        <TopProductsSection />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ProductionPlanChart />
          <TopCustomersChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ProductionStatusSection />
          <ProductionProgressSection />
          <MaterialsSection />
        </div>
      </main>
    </div>
  );
}