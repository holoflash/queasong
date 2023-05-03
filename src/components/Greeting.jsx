export const Greeting = ({ profile }) => {
    return (
        <div className="greeting">
            {profile && <h1>Hello {profile.display_name}!</h1>}
        </div>
    );
};