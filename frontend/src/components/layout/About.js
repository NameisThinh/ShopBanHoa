import React from "react";
import "./Header.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
export default function About() {
  return (
    <section className="about" id="about">
      <h1 className="heading">
        <span>About</span> us
      </h1>
      <div className="row">
        <div className="video-container">
          <h3>Best flower sellers</h3>
        </div>
        <div className="content">
          <h3>Why choose us?</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat
            recusandae impedit excepturi sapiente doloremque iusto aut illo
            provident ipsa quis necessitatibus ullam quia earum, cum porro fuga
            reiciendis suscipit omnis.
          </p>
          <Link to="" className="btnn">
            Learn
          </Link>
        </div>
      </div>
    </section>
  );
}
