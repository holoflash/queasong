export const HostLogin = () => {
    const LOGIN_URI =
        process.env.NODE_ENV !== 'production'
            ? 'http://localhost:8888/login'
            : 'https://queasong.onrender.com/login';
    return (
        <div className='page'>
            <div className='logo'>que-a-song</div>
            <div className="wrapper">
                <div id="login">
                    <p>Log in with spotify to proceed.</p>
                    <button onClick={() => { window.location.href = `${LOGIN_URI}` }}>
                        Log in with Spotify
                    </button>
                </div>
            </div>
        </div>
    );
};
