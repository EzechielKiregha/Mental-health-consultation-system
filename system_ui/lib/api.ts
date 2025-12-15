import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Ensure this environment variable is set
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add JWT token from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 errors
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       console.error("Unauthorized. Logging out...");
//       // Add logout logic here, e.g., clearing localStorage or redirecting
//       localStorage.removeItem("jwtToken");
//       window.location.href = "/login"; // Redirect to login page
//     }
//     return Promise.reject(error);
//   }
// );

export default api;
