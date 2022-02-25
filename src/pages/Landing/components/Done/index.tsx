import React, { useContext } from "react";
import ModalContext from "../../../../context/modal";
import "./index.less";

export default function Done() {
  const { hideModal } = useContext(ModalContext);

  return (
    <div className="done-page">
      <header className="header">All Done!</header>
      <div className="content">
        <p>
          You will be one of the first to experience Broccoli & Co. when we
          launch.
        </p>
      </div>
      <div className="bottom">
        <button className="ok-btn" onClick={hideModal}>
          OK
        </button>
      </div>
    </div>
  );
}
