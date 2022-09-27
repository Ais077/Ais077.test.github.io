import axios from "axios";
import apiURL from "./config";

export default axios.create({
    baseURL: apiURL
});
