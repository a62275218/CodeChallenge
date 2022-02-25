import { createContext } from 'react';

const Context = createContext({
  visible: false,
  showModal: () => { },
  hideModal: () => { }
});

export default Context