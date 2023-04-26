export const HostLogin = () => {
    const LOGIN_URI =
        process.env.NODE_ENV !== 'production'
            ? 'http://localhost:8888/login'
            : 'https://queasong.onrender.com/login';
    console.log(LOGIN_URI)
    return (
        <div id="login">
            <button
                onClick={() =>
                    (window.location.href = `${LOGIN_URI}`)
                }
            >
                Log in to Spotify
            </button>
        </div>
    );
};
