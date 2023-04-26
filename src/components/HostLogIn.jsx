export const HostLogin = () => {
    return (
        <div id="login">
            <button
                onClick={() =>
                    (window.location.href = `${process.env.LOGIN_URI}`)
                }
            >
                Log in to Spotify
            </button>
        </div>
    );
};
