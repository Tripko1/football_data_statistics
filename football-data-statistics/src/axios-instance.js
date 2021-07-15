import axios from "axios";

const API_TOKEN = "e3d2c11f54a3444aaf5a373d766010b5";

const instance = axios.create({
  baseURL: "http://api.football-data.org/v2",
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "X-Auth-Token": API_TOKEN,
  },
});

export default instance;
