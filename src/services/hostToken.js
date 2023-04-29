import axios from "axios";

export const hostToken = async () => {
    localStorage.removeItem('token')
    try {
        const response = await axios.post('/api/login');
        const token = response.data.token;
        localStorage.setItem('token', token);
    } catch (err) {
        console.log(err);
    }
};