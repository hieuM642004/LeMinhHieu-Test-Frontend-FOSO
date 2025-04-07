import { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

type ApiFunction<T> = () => Promise<AxiosResponse<T>>;

const useApi = <T>(apiFunction: ApiFunction<T>, dependencies: any[] = []): ApiResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiFunction();
        setData(response.data);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies); 

  return { data, loading, error };
};

export default useApi;