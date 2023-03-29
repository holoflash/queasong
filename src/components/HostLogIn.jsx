export const HostLogin = () => {
    return (
        <div id="login">
            <button
                onClick={() =>
                    (window.location.href = 'http://localhost:8888/login')
                }
            >
                Log in to Spotify
            </button>
        </div>
    );
};
