export const HostLogin = () => {
    return (
        <button onClick={() => window.location.href = "http://localhost:8888/login"}>
            Log in to Spotify
        </button>
    )
}