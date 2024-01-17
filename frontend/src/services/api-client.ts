import axios, { CanceledError } from "axios";

export default axios.create({
  baseURL: "https://stormy-lowlands-61043-518bd540753b.herokuapp.com/api",
});

export { CanceledError };
