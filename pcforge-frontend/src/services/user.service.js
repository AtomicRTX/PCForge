import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/v1/user/';

class UserService {
    getUser() {
      return axios.get(API_URL + 'current', { headers: authHeader() })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error fetching user:', error);
        throw error;
      });
    }
}

export default new UserService;