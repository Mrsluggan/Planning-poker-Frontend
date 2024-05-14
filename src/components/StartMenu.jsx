function StartMenu({ setPage }) {
    return (
        <div>
            <button onClick={() => setPage("start")}>Start</button>
            <button onClick={() => setPage("register")}>Skapa ny användare</button>
            <button onClick={() => setPage("login")}>Logga in</button>
            <button onClick={() => setPage("projects")}>Projects</button>
        </div>
    );
}

export default StartMenu;