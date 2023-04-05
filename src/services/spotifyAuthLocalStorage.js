import axios from 'axios';

export const LS_KEYS = {
    accessToken: 'spotify_access_token',
    refreshToken: 'spotify_refresh_token',
    expireTime: 'spotify_token_expire_time',
    timestamp: 'spotify_token_timestamp',
}

const LS_VALUES = {
    accessToken: localStorage.getItem(LS_KEYS.accessToken),
    refreshToken: localStorage.getItem(LS_KEYS.refreshToken),
    expireTime: localStorage.getItem(LS_KEYS.expireTime),
    timestamp: localStorage.getItem(LS_KEYS.timestamp),
};

const getAccessToken = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const queryParams = {
        [LS_KEYS.accessToken]: urlParams.get('access_token'),
        [LS_KEYS.refreshToken]: urlParams.get('refresh_token'),
        [LS_KEYS.expireTime]: urlParams.get('expires_in'),
    };
    const hasError = urlParams.get('error');

    if (hasError || hasTokenExpired() || LS_VALUES.accessToken === 'undefined') {
        refreshToken();
    }

    if (LS_VALUES.accessToken && LS_VALUES.accessToken !== 'undefined') {
        return LS_VALUES.accessToken;
    }

    if (queryParams[LS_KEYS.accessToken]) {
        for (const property in queryParams) {
            localStorage.setItem(property, queryParams[property]);
        }
        localStorage.setItem(LS_KEYS.timestamp, Date.now());

        return queryParams[LS_KEYS.accessToken];
    }
    return false;
};

const hasTokenExpired = () => {
    const { accessToken, timestamp, expireTime } = LS_VALUES;
    if (!accessToken || !timestamp) {
        return false;
    }
    const millisecondsElapsed = Date.now() - Number(timestamp);
    return (millisecondsElapsed / 1000) > Number(expireTime);
};

const refreshToken = async () => {
    try {
        if (!LS_VALUES.refreshToken ||
            LS_VALUES.refreshToken === 'undefined' ||
            (Date.now() - Number(LS_VALUES.timestamp) / 1000) < 1000
        ) {
            console.error('No refresh token available');
            for (const property in LS_KEYS) {
                localStorage.removeItem(LS_KEYS[property]);
            }
            window.location = window.location.origin;
        }
        const { data } = await axios.get(`/refresh_token?refresh_token=${LS_VALUES.refreshToken}`);

        localStorage.setItem(LS_KEYS.accessToken, data.access_token);
        localStorage.setItem(LS_KEYS.timestamp, Date.now());
        window.location.reload();

    } catch (e) {
        console.error(e);
    }
};

export const accessToken = getAccessToken();
