import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://eagle-backend-v2-staging.up.railway.app/api',
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // To send cookies
});

// Define endpoints that don't require authentication
const PUBLIC_ENDPOINTS = [
  '/auth/login',
  '/leads'
  // Add more public endpoints as needed
];

// Define endpoints that require Basic Auth
const BASIC_AUTH_ENDPOINTS = [

  // Add endpoints that need Basic Auth
];

// Automatically attach appropriate authorization to every request
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const url = config.url || '';
  
  // Check if this is a public endpoint that doesn't need auth
  const isPublicEndpoint = PUBLIC_ENDPOINTS.some(endpoint => 
    url.startsWith(endpoint)
  );
  
  if (isPublicEndpoint) {
    // Don't add any authorization header for public endpoints
    return config;
  }
  
  // Check if this endpoint requires Basic Auth
  const requiresBasicAuth = BASIC_AUTH_ENDPOINTS.some(endpoint => 
    url.startsWith(endpoint)
  );
  
  if (requiresBasicAuth) {
    // Add Basic Auth header (you might want to store these credentials securely)
    const username = process.env.REACT_APP_BASIC_AUTH_USERNAME || 'admin';
    const password = process.env.REACT_APP_BASIC_AUTH_PASSWORD || 'password';
    const credentials = btoa(`${username}:${password}`);
    config.headers["authorization"] = `Basic ${credentials}`;
    return config;
  }
  
  // For all other endpoints, try to add Bearer token
  const token = localStorage.getItem("salon-token");
  if (token) {
    config.headers["authorization"] = `Bearer ${token}`;
  }
  
  return config;
});

// Optional: Add response interceptor to handle auth errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token might be expired or invalid
      localStorage.removeItem("salon-token");
      // Optionally redirect to login page
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);