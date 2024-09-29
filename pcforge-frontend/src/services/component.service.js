import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/v1/component/'

class ComponentService {
    getCorrectCPU(tdp, socket) {
      return axios.get(API_URL + `setcpu`, { headers: authHeader(), params: { tdp:tdp, socket:socket } })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error fetching CPU:', error);
        throw error;
      });
    }

    getCPU(cpuID){
      return axios.get(API_URL + `cpu/${cpuID}`)
      .then(response => {
        return response.data;
      });
    }

    getCorrectGPU(tdp, gpuSize) {
      return axios.get(API_URL + `setgpu`, { headers: authHeader(), params: { tdp:tdp, gpuSize:gpuSize } })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error fetching GPU:', error);
        throw error;
      });
    }

    getGPU(gpuID){
      return axios.get(API_URL + `gpu/${gpuID}`)
      .then(response => {
        return response.data;
      });
    }

    getCorrectMotherboard(socket, capacity, slots, type, form) {
      return axios.get(API_URL + `setmb`, { headers: authHeader(), params: { socket:socket, capacity:capacity, slots:slots, type:type, form:form } })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error fetching user:', error);
        throw error;
      });
    }

    getMotherboard(mbID){
      return axios.get(API_URL + `mb/${mbID}`)
      .then(response => {
        return response.data;
      });
    }

    getCorrectRAM(size, sticks, type) {
      return axios.get(API_URL + `setram`, { headers: authHeader(), params: { size:size, sticks:sticks, type:type } })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error fetching GPU:', error);
        throw error;
      });
    }

    getRAM(ramID){
      return axios.get(API_URL + `ram/${ramID}`)
      .then(response => {
        return response.data;
      });
    }

    getCorrectComputerCase(mb, size, power) {
      return axios.get(API_URL + `setcase`, { params: { mb:mb, size:size, power:power } })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error fetching GPU:', error);
        throw error;
      });
    }

    getComputerCase(ccID){
      return axios.get(API_URL + `cc/${ccID}`)
      .then(response => {
        return response.data;
      });
    }

    getCorrectPower(watt, size) {
      return axios.get(API_URL + `setpower`, { headers: authHeader(), params: { watt:watt, size:size } })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error fetching GPU:', error);
        throw error;
      });
    }
    
    getPower(powerID){
      return axios.get(API_URL + `power/${powerID}`)
      .then(response => {
        return response.data;
      });
    }

    getCorrectStorage() {
      return axios.get(API_URL + `setstorage`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error fetching GPU:', error);
        throw error;
      });
    }

    getStorage(stID){
      return axios.get(API_URL + `st/${stID}`)
      .then(response => {
        return response.data;
      });
    }
}

export default new ComponentService;