import React from 'react';

import { StoreProvider } from './src/store/Context';
import AppNavigation from './src/navigation/navigation';


export default function App() {
  return (
    <StoreProvider>
      <AppNavigation />
    </StoreProvider>
  );
}