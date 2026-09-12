import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  occupation: string;
  initials: string;
  firstName: string;
}

const DEFAULT_PROFILE: UserProfile = {
  fullName: 'Varun Sharma',
  email: 'varun.sharma@rupai.com',
  phone: '9876543210',
  city: 'Mumbai, Maharashtra',
  occupation: 'Software Engineer',
  initials: 'VS',
  firstName: 'Varun',
};

const STORAGE_KEY = 'rupai_profile';

interface ProfileContextType {
  profile: UserProfile;
  updateProfile: (data: Omit<UserProfile, 'initials' | 'firstName'>) => void;
  resetProfile: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

function deriveMeta(fullName: string) {
  const trimmed = fullName.trim();
  const parts = trimmed.split(' ').filter(Boolean);
  const firstName = parts[0] || 'User';
  let initials = 'U';

  if (parts.length >= 2) {
    initials = (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  } else if (parts.length === 1 && parts[0].length > 0) {
    initials = parts[0].substring(0, 2).toUpperCase();
  }

  return { firstName, initials };
}

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfileState] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const { firstName, initials } = deriveMeta(parsed.fullName || DEFAULT_PROFILE.fullName);
        return {
          fullName: parsed.fullName || DEFAULT_PROFILE.fullName,
          email: parsed.email || DEFAULT_PROFILE.email,
          phone: parsed.phone || DEFAULT_PROFILE.phone,
          city: parsed.city || DEFAULT_PROFILE.city,
          occupation: parsed.occupation || DEFAULT_PROFILE.occupation,
          firstName,
          initials,
        };
      } catch (e) {
        console.error('Failed to parse rupai_profile from localStorage', e);
      }
    }
    return DEFAULT_PROFILE;
  });

  const updateProfile = (data: Omit<UserProfile, 'initials' | 'firstName'>) => {
    const { firstName, initials } = deriveMeta(data.fullName);
    const newProfile: UserProfile = {
      ...data,
      firstName,
      initials,
    };
    setProfileState(newProfile);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      city: data.city,
      occupation: data.occupation,
    }));

    // Sync localStorage 'user' for legacy callers
    const existingUser = localStorage.getItem('user');
    let userObj: any = {};
    if (existingUser) {
      try { userObj = JSON.parse(existingUser); } catch (e) {}
    }
    localStorage.setItem('user', JSON.stringify({
      ...userObj,
      name: data.fullName,
      email: data.email,
    }));
  };

  const resetProfile = () => {
    setProfileState(DEFAULT_PROFILE);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem('user', JSON.stringify({
      id: "demo-user",
      name: DEFAULT_PROFILE.fullName,
      email: DEFAULT_PROFILE.email,
      isDemo: true
    }));
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, resetProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
