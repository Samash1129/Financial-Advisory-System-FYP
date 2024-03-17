import axios from 'axios';

export default axios.create({
    // URL to be changed after the completion of the backend
    baseURL: 'https://private-61242-elev8aiapis.apiary-mock.com',
    withCredentials: true,
})