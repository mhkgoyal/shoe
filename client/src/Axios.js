import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:5000/api/v1", // Replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default Axios;
