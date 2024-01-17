import axios, { CanceledError } from "axios";

export default axios.create({
  baseURL: "http://104.199.117.235:8000/api",
});

export { CanceledError };
