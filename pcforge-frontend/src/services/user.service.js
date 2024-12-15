import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/v1/user/';

class UserService {
    getUser() {
        return axios.get(API_URL + 'current', {headers: authHeader()})
            .then(response => {
                return response.data;
            });
    }

    getUserById(userID) {
        return axios.get(API_URL + `${userID}`, {headers: authHeader()})
            .then(response => {
                return response.data;
            });
    }
    getAllUsers() {
        return axios.get(API_URL + 'all', { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }
    isAdmin(){
        return axios.get(API_URL + 'admin', { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }
    deleteUser(user_id){
        return axios.delete(API_URL + 'delete', { data: {user_id: user_id}, headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }
}

export default new UserService;