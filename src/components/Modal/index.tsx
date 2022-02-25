import React, { useRef, PropsWithChildren, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.less";

const handlePrevent = (e: React.MouseEvent) => {
  e.stopPropagation();
};

const Modal = (
  props: PropsWithChildren<{
    visible?: boolean;
    zIndex?: number;
    onClose: () => void;
  }>
) => {
  const { visible = true, children, zIndex = 999, onClose } = props;

  const isDown = useRef<boolean>(false)

  const handleMouseDown = ()=>{
    isDown.current = true
  }

  const handleMouseUp = ()=>{
    if(isDown.current){
      onClose();
    }
    isDown.current = false;
  }

  useEffect(()=>{
    const upHandle = ()=>{
      isDown.current = false;
    }
    window.addEventListener('mouseup',upHandle)
    return ()=>{
      window.removeEventListener('mouseup',upHandle)
    }
  },[])

  const renderModal = () => {
    return (
      <div
        className="global-mask"
        style={visible ? { zIndex } : { display: "none" }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div className="global-mask-center" onMouseDown={handlePrevent}>
          {children}
        </div>
      </div>
    );
  };
  return ReactDOM.createPortal(renderModal(), document.getElementById("root")!);
};

export default Modal;
