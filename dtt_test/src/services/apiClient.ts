import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
const apiKey = import.meta.env.VITE_API_KEY;
const apiClient: AxiosInstance = axios.create({
  baseURL: "https://api.intern.d-tt.nl/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "X-Api-Key": apiKey,
  },
});

// i will use it if there is a login to store token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
