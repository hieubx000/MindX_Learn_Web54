import React from "react";

export default function NavBar() {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <div>
          <a className="navbar-brand" href="https://studio.youtube.com/video/XpywLtQP1Xs/edit">MindX Images</a>
          <button className="btn btn-link">Login</button>
          <button className="btn btn-link">Signup</button>
        </div>
      </div>
    </nav>
  );
}