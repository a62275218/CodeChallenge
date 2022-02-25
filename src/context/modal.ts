import { createContext, ReactElement } from "react";

const Context = createContext({
  showModal: (el: ReactElement) => {},
  hideModal: () => {},
});

export default Context;
