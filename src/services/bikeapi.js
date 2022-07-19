import axios from "axios";

class BikeService {
  constructor() {
    this.api = axios.create({
      baseURL: "http://api.citybik.es/v2/networks",
    });
  }

  getNetworks = () => {
    return this.api.get();
  };

  getStations = (networkId) => {
    return this.api.get(`/${networkId}`);
  };
}

const bikeService = new BikeService();

export default bikeService;
