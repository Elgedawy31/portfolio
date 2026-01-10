import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface IntroContextType {
  isIntroFinished: boolean;
  setIntroFinished: (finished: boolean) => void;
  isHeroAnimationFinished: boolean;
  setHeroAnimationFinished: (finished: boolean) => void;
}

const IntroContext = createContext<IntroContextType>({
  isIntroFinished: false,
  setIntroFinished: () => {},
  isHeroAnimationFinished: false,
  setHeroAnimationFinished: () => {},
});

export const IntroProvider = ({ 
  children 
}: { 
  children: ReactNode; 
}) => {
  const [isIntroFinished, setIntroFinished] = useState(false);
  const [isHeroAnimationFinished, setHeroAnimationFinished] = useState(false);

  return (
    <IntroContext.Provider value={{ 
      isIntroFinished, 
      setIntroFinished,
      isHeroAnimationFinished,
      setHeroAnimationFinished
    }}>
      {children}
    </IntroContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useIntro = () => {
  return useContext(IntroContext);
};

