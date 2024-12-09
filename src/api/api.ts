import axios from "axios";

// Create an Axios instance
export const reqres = axios.create({
  baseURL: "https://reqres.in/api", // Base URL for all API requests
  headers: {
    "Content-Type": "application/json",
  },
});
