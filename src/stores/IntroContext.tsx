import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface IntroContextType {
  isIntroFinished: boolean;
  setIntroFinished: (finished: boolean) => void;
}

const IntroContext = createContext<IntroContextType>({
  isIntroFinished: false,
  setIntroFinished: () => {},
});

export const IntroProvider = ({ 
  children 
}: { 
  children: ReactNode; 
}) => {
  const [isIntroFinished, setIntroFinished] = useState(false);

  return (
    <IntroContext.Provider value={{ isIntroFinished, setIntroFinished }}>
      {children}
    </IntroContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useIntro = () => {
  return useContext(IntroContext);
};

