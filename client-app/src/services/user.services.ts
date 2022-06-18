
import {axios} from "../lib/axios.lib";



class UserService{

    async getUser(username: string) {
        const response = await axios.get(`/users/${username}`);
        return response.data;
    }
}

export default new UserService();