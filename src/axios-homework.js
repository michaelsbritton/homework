import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://homework-d221e-default-rtdb.asia-southeast1.firebasedatabase.app/',
});

export default instance;