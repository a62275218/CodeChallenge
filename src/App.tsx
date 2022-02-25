import React, { ReactElement, useReducer, useState } from "react";
import Landing from "./pages/Landing";
import Modal from "./components/Modal";
import ModalContext from "./context/modal";
import "./style/index.less";

export default () => {
  const [modalEl, setModalEl] = useState<ReactElement | null>(null);
  const [modalShow, dispatch] = useReducer(
    (state: boolean, action: { type: string; el?: ReactElement }) => {
      const { type, el } = action;
      switch (type) {
        case "on":
          setModalEl(el ?? null);
          return true;
        case "off":
          setModalEl(null);
          return false;
        default:
          return !state;
      }
    },
    false
  );
  const showModal = (el: ReactElement) => dispatch({ type: "on", el });
  const hideModal = () => dispatch({ type: "off" });

  return (
    <div className="demo-app">
      <ModalContext.Provider
        value={{ showModal, hideModal }}
      >
        <Modal visible={modalShow} onClose={hideModal}>
          {modalEl}
        </Modal>
        <header className="demo-app-header">
          <h1>Brocoli & CO.</h1>
        </header>
        <div style={{ flex: 1 }}>
          <Landing />
        </div>
        <footer className="demo-app-footer">
          Made with &hearts; in Melbourne <br />
          &copy; 2016 Broccoli & Co. All rights reserved.
        </footer>
      </ModalContext.Provider>
    </div>
  );
};
