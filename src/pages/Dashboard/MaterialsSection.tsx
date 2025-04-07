"use client";

import type React from "react";

import { useState } from "react";
import MaterialTable from "../../components/MaterialTable/MaterialTable";
import { Card } from "../../components/UI/Card";
import Dropdown from "../../components/Dropdown/Dropdown";

const MaterialsSection: React.FC = () => {
  const [materialsOption, setMaterialsOption] = useState("Tuần này");
  const weekOptions = ["Tuần này", "Tuần trước", "2 tuần trước"];

  return (
    <Card>
      <div className="flex justify-between items-center p-3 mb-2 w-full">
        <h3 className="font-bold">Nguyên Vật Liệu Cần Mua</h3>
        <Dropdown
          label={materialsOption}
          options={weekOptions}
          onSelect={setMaterialsOption}
          className="w-40"
        />
      </div>
      <MaterialTable />
    </Card>
  );
};

export default MaterialsSection;
