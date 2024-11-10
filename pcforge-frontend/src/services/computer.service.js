import axios from "axios";

import authHeader from "./auth-header";

const API_URL = 'http://localhost:8080/api/v1/computer/'

class ComputerService{
    createComputerSetup(user_id, case_id, cpu_id, gpu_id, ram_id, mb_id, power_id, st_id){
        return axios.post(API_URL + 'add', {
            user_id,
            case_id,
            cpu_id,
            gpu_id,
            ram_id,
            mb_id,
            power_id,
            st_id
        }, { headers: authHeader() })
    }
    getAllComputers(){
        return axios.get(API_URL + `all`)
            .then(response => {
                return response.data;
            });
    }
    saveComputer(computerID){
        return axios.post(API_URL + `${computerID}/save`,{}, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }
    isSavedComputer(computerID){
        return axios.get(API_URL + `${computerID}/checkSave`, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }


}
// eslint-disable-next-line
export default new ComputerService();