import axios from "axios";

import authHeader from "./auth-header";

const API_URL = 'http://localhost:8080/api/v1/software/'

class SoftwareService {
    getAllGames(){
        return axios.get(API_URL + `games`, {headers: authHeader()})
            .then(response => {
                return response.data;
            });
    }
    getAllPrograms(){
        return axios.get(API_URL + `programs`, {headers: authHeader()})
            .then(response => {
                return response.data;
            });
    }
}

// eslint-disable-next-line
export default new SoftwareService();