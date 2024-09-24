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

    getCorrectComputerCase(mb, size, power) {
      return axios.get(API_URL + `setcase`, { headers: authHeader(), params: { mb:mb, size:size, power:power } })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error fetching GPU:', error);
        throw error;
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

    getCorrectStorage() {
      return axios.get(API_URL + `setstorage`, { headers: authHeader() })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error fetching GPU:', error);
        throw error;
      });
    }
}

export default new ComponentService;