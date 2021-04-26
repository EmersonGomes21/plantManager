import axios from "axios";
const api = axios.create({
 // http://192.168.1.4:3000
  baseURL: "https://lgmf-plant-manager-server.herokuapp.com/",
});

export default api;
