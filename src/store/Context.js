import React from 'react'

import UserStore from './UserStore';

export const StoreContext = React.createContext();

export const StoreProvider = ({ children }) => {
  return <StoreContext.Provider value={UserStore}>{children}</StoreContext.Provider>
}
