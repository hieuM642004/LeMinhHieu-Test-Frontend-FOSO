import { AxiosResponse } from "axios";

// const API_BASE_URL = "https://api.example.com";

// interface ApiError {
//   message: string;
// }

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 10000, // 10 seconds timeout
// });

// // Generic API response type
// interface ApiResponse<T> {
//   data: T;
//   status: number;
// }

// Top Products API response type
interface TopProduct {
  value: string;
  label: string;
  percentage: string;
  trend: "up" | "down";
}

// Production Plan API response type
interface ProductionPlan {
  labels: string[];
  planData: number[];
  actualData: number[];
}

// Top Customers API response type
interface TopCustomer {
  label: string;
  value: number;
}

// Production Status API response type
interface ProductionStatus {
  incomplete: number;
  inProgress: number;
  completed: number;
}

// Production Progress API response type
interface ProductionProgress {
  label: string;
  value: number;
  total: number;
  percentage: string;
}

// Materials API response type
interface Material {
  id: number;
  name: string;
  quantity: number;
  unit: string;
}

// Mock data for each section
const mockTopProducts: TopProduct[] = [
  { value: "48", label: "Áo sơ mi dài tay", percentage: "8.2%", trend: "up" },
  { value: "18", label: "Quần tây", percentage: "5%", trend: "down" },
  { value: "40", label: "Áo hoodie", percentage: "12%", trend: "up" },
  { value: "23", label: "Đầm maxi", percentage: "3.5%", trend: "up" },
  { value: "48", label: "Áo thun cổ tròn", percentage: "4.7%", trend: "up" },
];

const mockProductionPlan: ProductionPlan = {
  labels: ["Áo ba lỗ", "Áo sơ mi", "Áo thun polo", "Quần baggy", "Quần jogger"],
  planData: [60, 100, 80, 70, 90],
  actualData: [40, 60, 20, 45, 60],
};

const mockTopCustomers: TopCustomer[] = [
  { label: "Khách hàng 1", value: 3200 },
  { label: "Khách hàng 2", value: 2800 },
  { label: "Khách hàng 3", value: 2400 },
  { label: "Khách hàng 4", value: 2000 },
  { label: "Khách hàng 5", value: 1600 },
];

const mockProductionStatus: ProductionStatus = {
  incomplete: 5,
  inProgress: 6,
  completed: 5,
};

const mockProductionProgress: ProductionProgress[] = [
  { label: "Áo sơ mi dài tay", value: 123, total: 150, percentage: "80%" },
  { label: "Áo sơ mi cụt tay", value: 321, total: 420, percentage: "76%" },
  { label: "Quần baggy", value: 233, total: 520, percentage: "45%" },
  { label: "Quần tây", value: 989, total: 989, percentage: "100%" },
  { label: "Đầm maxi", value: 876, total: 876, percentage: "100%" },
  { label: "Áo hoodie", value: 765, total: 800, percentage: "95%" },
  { label: "Áo khoác bomber", value: 543, total: 2260, percentage: "24%" },
];

const mockMaterials: Material[] = [
  { id: 1, name: "Vải cotton", quantity: 100, unit: "mét" },
  { id: 2, name: "Chỉ may", quantity: 50, unit: "cuộn" },
  { id: 3, name: "Khuy áo", quantity: 200, unit: "cái" },
];

// Mock "no data" responses for testing the "without data" state
const mockNoDataTopProducts: TopProduct[] = [];
const mockNoDataProductionPlan: ProductionPlan = {
  labels: [],
  planData: [],
  actualData: [],
};
const mockNoDataTopCustomers: TopCustomer[] = [];
const mockNoDataProductionStatus: ProductionStatus = {
  incomplete: 0,
  inProgress: 0,
  completed: 0,
};
const mockNoDataProductionProgress: ProductionProgress[] = [];
const mockNoDataMaterials: Material[] = [];

// Simulate network delay
const simulateDelay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Check URL path for '/empty'
const checkEmptyPath = (): boolean => {
  if (typeof window !== "undefined") {
    const path = window.location.pathname;
    return path === "/empty";
  }
  return false;
};

// API service class with mock data
class ApiService {
  // Fetch Top Products
  async getTopProducts(): Promise<AxiosResponse<TopProduct[]>> {
    await simulateDelay(1000); // Simulate 1-second delay
    const simulateNoData = checkEmptyPath();
    return {
      data: simulateNoData ? mockNoDataTopProducts : mockTopProducts,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {} as any,
    };
  }

  // Fetch Production Plan
  async getProductionPlan(): Promise<AxiosResponse<ProductionPlan>> {
    await simulateDelay(1000);
    const simulateNoData = checkEmptyPath();
    return {
      data: simulateNoData ? mockNoDataProductionPlan : mockProductionPlan,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {} as any,
    };
  }

  // Fetch Top Customers
  async getTopCustomers(): Promise<AxiosResponse<TopCustomer[]>> {
    await simulateDelay(1000);
    const simulateNoData = checkEmptyPath();
    return {
      data: simulateNoData ? mockNoDataTopCustomers : mockTopCustomers,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {} as any,
    };
  }

  // Fetch Production Status
  async getProductionStatus(): Promise<AxiosResponse<ProductionStatus>> {
    await simulateDelay(1000);
    const simulateNoData = checkEmptyPath();
    return {
      data: simulateNoData ? mockNoDataProductionStatus : mockProductionStatus,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {} as any,
    };
  }

  // Fetch Production Progress
  async getProductionProgress(): Promise<AxiosResponse<ProductionProgress[]>> {
    await simulateDelay(1000);
    const simulateNoData = checkEmptyPath();
    return {
      data: simulateNoData
        ? mockNoDataProductionProgress
        : mockProductionProgress,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {} as any,
    };
  }

  // Fetch Materials
  async getMaterials(): Promise<AxiosResponse<Material[]>> {
    await simulateDelay(1000);
    const simulateNoData = checkEmptyPath();
    return {
      data: simulateNoData ? mockNoDataMaterials : mockMaterials,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {} as any,
    };
  }
}

export const apiService = new ApiService();
