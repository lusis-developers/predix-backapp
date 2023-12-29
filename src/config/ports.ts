import { PortConfigType } from '../types/PortConfigTypes';

const portConfig: PortConfigType = {
  dev: {
    port: 8081
  },
  production: {
    port: 8080
  },
  local: {
    port: 8000
  }
};

export default portConfig;
