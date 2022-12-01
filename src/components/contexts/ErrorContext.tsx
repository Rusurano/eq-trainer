import React, { createContext, useState } from 'react';

type TErrorProvider = {
  children?: React.ReactNode
}

type TErrorContext = {
  showError1: boolean;
  showError2: boolean;
  showError3: boolean;
  showError4: boolean;
  showError5: boolean;
  showError6: boolean;
  setShowError1: React.Dispatch<React.SetStateAction<boolean>>;
  setShowError2: React.Dispatch<React.SetStateAction<boolean>>;
  setShowError3: React.Dispatch<React.SetStateAction<boolean>>;
  setShowError4: React.Dispatch<React.SetStateAction<boolean>>;
  setShowError5: React.Dispatch<React.SetStateAction<boolean>>;
  setShowError6: React.Dispatch<React.SetStateAction<boolean>>;
}

const ErrorContext = createContext<TErrorContext>({
  showError1: false,
  showError2: false,
  showError3: false,
  showError4: false,
  showError5: false,
  showError6: false,
  setShowError1: () => {},
  setShowError2: () => {},
  setShowError3: () => {},
  setShowError4: () => {},
  setShowError5: () => {},
  setShowError6: () => {}
});

const ErrorProvider = ({ children }: TErrorProvider) => {
  const [showError1, setShowError1] = useState<boolean>(false),
        [showError2, setShowError2] = useState<boolean>(false),
        [showError3, setShowError3] = useState<boolean>(false),
        [showError4, setShowError4] = useState<boolean>(false),
        [showError5, setShowError5] = useState<boolean>(false),
        [showError6, setShowError6] = useState<boolean>(false);

  const eCtxValue: TErrorContext = { 
    showError1, showError2, showError3, showError4, showError5, showError6, 
    setShowError1, setShowError2, setShowError3, setShowError4, setShowError5, setShowError6 
  }

  return (
    <ErrorContext.Provider value={eCtxValue}>
      { children }
    </ErrorContext.Provider>
  );
}

export { ErrorContext, ErrorProvider };