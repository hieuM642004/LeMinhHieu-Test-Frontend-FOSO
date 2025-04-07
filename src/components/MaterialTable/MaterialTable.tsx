import type React from "react"
import MaterialRow from "../MaterialRow/MaterialRow"
import { apiService } from "../../services/api"
import useApi from "../../hooks/useApi"
import empty from "../../assets/ic-content.svg"
import Loading from "../Loading/Loading"

interface Material {
  id: number
  name: string
  quantity: number
  unit: string
  code?: string
}

const MaterialTable: React.FC = () => {
  const { data: materials, loading, error } = useApi<Material[]>(() => apiService.getMaterials(), [])

  const hasData = materials && materials.length > 0

  return (
    <div className="overflow-x-auto">
      {loading ? (
       <Loading />
      ) : error ? (
        <div className="text-center text-red-500 py-8">{error}</div>
      ) : hasData ? (
        <div className="rounded-lg w-full">
          <table className="w-full text-sm">
            <thead >
              <tr className="text-gray-500 bg-[#F3F4F6]">
                <th className="text-left font-medium py-3 px-4">STT</th>
                <th className="text-left font-medium py-3 px-4">Nguyên vật liệu</th>
                <th className="text-left font-medium py-3 px-4">Đơn vị tính</th>
                <th className="text-right font-medium py-3 px-4">Số lượng</th>
              </tr>
            </thead>
            <tbody>
              {materials!.map((material, index) => (
                <MaterialRow
                  key={material.id}
                  id={material.id}
                  index={index + 1}
                  name={material.name}
                  code={material.code || ""}
                  unit={material.unit}
                  quantity={material.quantity}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10">
          <img className="w-52 h-w-52" src={empty || "/placeholder.svg"} alt="empty" />
          <h3 className="text-gray-500 font-semibold mt-4">Chưa có dữ liệu</h3>
        </div>
      )}
    </div>
  )
}

export default MaterialTable

