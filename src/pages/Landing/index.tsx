import React, { useCallback, useContext } from "react";
import Register from "./components/Register";
import ModalContext from "../../context/modal";
import "./index.less";

export default function Landing() {
  const { showModal } = useContext(ModalContext);
  const handleRegister = useCallback(() => {
    showModal(<Register />);
  }, []);

  return (
    <div className="landing-page">
      <section className="landing-page-center">
        <h1 className="title">
          A better way
          <br />
          to enjoy every day.
        </h1>
        <p className="center">Be the first to know when we launch.</p>
        <button onClick={handleRegister} className="enter-btn">
          Request an invite
        </button>
      </section>
    </div>
  );
}
