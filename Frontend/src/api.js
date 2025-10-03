import axios from "axios";
import { auth } from "./firebase/config.js";

const apiClient = axios.create({
  baseURL: "http://localhost:5001/api", // Your backend API URL
});

// Add a request interceptor to include the Firebase ID token
apiClient.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
