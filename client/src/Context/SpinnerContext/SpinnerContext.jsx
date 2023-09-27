import React, { createContext, useState } from 'react';

const SpinnerContext = createContext();


export function SpinnerProvider({ children }) {
  const [showSpinner, setShowSpinner] = useState(false);
  const [logUser, setLogUser] = useState("");

  return (
    <SpinnerContext.Provider value={{ showSpinner, setShowSpinner,logUser, setLogUser }}>
      {children}
    </SpinnerContext.Provider>
  );
}

export default SpinnerContext;
