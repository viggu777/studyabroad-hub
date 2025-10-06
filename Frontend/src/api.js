import axios from "axios";
import { auth } from "./firebase/config.js";

const apiClient = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5001/api"
      : "https://studyabroad-hub.onrender.com/api",
});

apiClient.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.error("Error fetching Firebase token:", error);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;

