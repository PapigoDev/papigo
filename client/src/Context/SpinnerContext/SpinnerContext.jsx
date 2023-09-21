import React, { createContext, useState } from 'react';

const SpinnerContext = createContext();


export function SpinnerProvider({ children }) {
  const [showSpinner, setShowSpinner] = useState(false);

  return (
    <SpinnerContext.Provider value={{ showSpinner, setShowSpinner }}>
      {children}
    </SpinnerContext.Provider>
  );
}

export default SpinnerContext;
