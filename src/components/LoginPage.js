import React, { useState } from "react";
import "./LoginPage.css";
import PoemList from "./PoemList";
import "./LoginPage.css";

function LoginPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    // Here you can do your validation of the form fields and authentication logic
    // If authentication is successful, set the loggedIn state to true
    setLoggedIn(true);
  }

  function handleLogout() {
    setLoggedIn(false);
    setUsername("");
    setEmail("");
    setPassword("");
  }

  if (loggedIn) {
    return <PoemList onLogout={handleLogout} />;
  }

  return (
    <div className="login-page-container">
      <div className="login-form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;