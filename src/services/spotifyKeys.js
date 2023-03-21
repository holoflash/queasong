import axios from 'axios';

//Retrieve the keys stored in Atlas
export const getKeys = async () => {
    try {
        const response = await axios.get('/api/keys/')
        return response.data
    } catch (error) {
        return error
    }
};

export const hasTokenExpired = async () => {
    const { accessToken, timestamp, expireTime } = await getKeys();
    if (!accessToken || !timestamp) {
        return false;
    }
    const millisecondsElapsed = Date.now() - Number(timestamp);
    return (millisecondsElapsed / 1000) > Number(expireTime);
};

export const accessToken = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const queryParams = {
        accessToken: urlParams.get('access_token'),
        refreshToken: urlParams.get('refresh_token'),
        expireTime: urlParams.get('expires_in'),
    };

    return queryParams.accessToken
};

export const updateKeys = async (KEYS) => {
    try {
        const response = await axios.put('/api/keys/', { KEYS })
        return response.data
    } catch (error) {
        return error
    }
};

export const logout = () => console.log("bruh")