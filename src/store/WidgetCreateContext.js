import React from 'react'

import WidgetCreateStore from './WidgetCreateStore';

export const StoreContext = React.createContext();

export const StoreProvider = ({ children }) => {
  return <StoreContext.Provider value={WidgetCreateStore}>{children}</StoreContext.Provider>
}