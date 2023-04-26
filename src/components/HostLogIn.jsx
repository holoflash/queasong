export const HostLogin = () => {
    const LOGIN = process.env.LOGIN_URI
    return (
        <div id="login">
            <button
                onClick={() =>
                    (window.location.href = `${LOGIN}`)
                }
            >
                Log in to Spotify
            </button>
        </div>
    );
};
