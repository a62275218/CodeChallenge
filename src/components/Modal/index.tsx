import React, { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import './index.less';

const Modal = (props: PropsWithChildren<{
  visible?: boolean,
  zIndex?: number
}>) => {
  const {
    visible = true,
    children,
    zIndex = 999,
  } = props;

  const renderModal = () => {
    return (
      <div
        className="global-mask"
        style={visible ? { zIndex } : { display: 'none' }}
      >
        <div className="child-wrapper">{children}</div>
      </div>
    );
  };
  return ReactDOM.createPortal(renderModal(), document.getElementById('root')!);
};

export default Modal;