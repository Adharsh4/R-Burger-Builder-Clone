import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-8c1da.firebaseio.com/'
});

export default instance;