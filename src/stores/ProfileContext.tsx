import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { EmployeeProfile } from '@/api/Api';

interface ProfileContextType {
  profile: EmployeeProfile | null;
}

const ProfileContext = createContext<ProfileContextType>({
  profile: null,
});

export const ProfileProvider = ({ 
  children, 
  profile 
}: { 
  children: ReactNode; 
  profile: EmployeeProfile | null;
}) => {
  return (
    <ProfileContext.Provider value={{ profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProfile = () => {
  return useContext(ProfileContext);
};

