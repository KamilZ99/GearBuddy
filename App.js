import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import GlobalProvider from './src/auth/AuthContext';

const App = () => {
  return (
    <GlobalProvider>
      <AppNavigator />
    </GlobalProvider>
  );
};

export default App;
