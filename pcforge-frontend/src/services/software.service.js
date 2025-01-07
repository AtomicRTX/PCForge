import axios from "axios";

const API_URL = 'http://localhost:8080/api/v1/software/'

class SoftwareService {
    getAllGames(){
        return axios.get(API_URL + `games`)
            .then(response => {
                return response.data;
            });
    }
    getAllPrograms(){
        return axios.get(API_URL + `programs`)
            .then(response => {
                return response.data;
            });
    }
}

// eslint-disable-next-line
export default new SoftwareService();