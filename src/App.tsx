import React, { useReducer } from "react"
import Landing from './pages/Landing'
import Modal from './components/Modal'
import ModalContext from './context/modal'
import './style/index.less'

export default () => {
  const [modalShow, dispatch] = useReducer((state: boolean, action: { type: string }) => {
    switch (action.type) {
      case 'on':
        return true
      case 'off':
        return false
      default:
        return !state;
    }
  }, false);
  const showModal = () => dispatch({ type: 'on' })
  const hideModal = () => dispatch({ type: 'off' })

  return <div className="demo-app">
    <ModalContext.Provider value={{ visible: modalShow, showModal, hideModal }}>
      <Modal visible={modalShow} />
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
}