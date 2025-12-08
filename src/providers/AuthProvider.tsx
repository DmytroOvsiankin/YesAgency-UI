import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { observer } from 'mobx-react-lite';
import React, { ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getProfile } from '@/api/user';
import { NON_AUTHORIZED_USER } from '@/constants/app';
import { setLogAttributes } from '@/utils/logger';
import { getItem, removeItem, setItem } from '@/utils/storage';

type AuthContextValue = {
  exit: () => Promise<void>;
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  authToken: string | null;
  setAuthToken: React.Dispatch<React.SetStateAction<string | null>>;
  appLoading: boolean;
  setAppLoading: React.Dispatch<React.SetStateAction<boolean>>;
  profile: UserProfile | null;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  changeLanguage: (langCode: Languages) => void;
};

const AuthContext = React.createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { i18n } = useTranslation();

  const [isAuth, setIsAuth] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [appLoading, setAppLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    setLogAttributes({
      AUTHORIZED: isAuth,
      USER: profile?.id ?? NON_AUTHORIZED_USER,
      USER_EMAIL: profile?.email ?? NON_AUTHORIZED_USER,
    });
  }, [profile, isAuth]);

  const changeLanguage = (langCode: Languages) => {
    if (i18n.language !== langCode) {
      setItem('LOCALE', langCode);

      i18n.changeLanguage(langCode);
    }
  };

  const getUserProfile = async () => {
    setAppLoading(true);

    // const { data, success } = await getProfile();

    // setAppLoading(false);
    // setIsAuth(!!success);

    // if (success) {
    //   const profile = { ...data, phone: data.phone?.replace('+', '') };

    //   changeLanguage(profile.language || 'sk');

    //   return setProfile(profile);
    // }

    await exit();
  };

  useEffect(() => {
    if (authToken && !profile) {
      setItem('AUTH', authToken);

      // getUserProfile();
    }
  }, [authToken]);

  useEffect(() => {
    (async () => {
      const authToken = await getItem('AUTH');

      setAuthToken(authToken);
      setIsAuth(!!authToken);
      setAppLoading(!!authToken);
    })();
  }, []);

  const exit = async () => {
    await Promise.all([GoogleSignin.signOut(), removeItem('AUTH')]);

    setIsAuth(false);
    setAuthToken(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={
        {
          exit,
          isAuth,
          setIsAuth,
          authToken,
          setAuthToken,
          appLoading,
          profile,
          setProfile,
          changeLanguage,
        } as any
      }
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext<{
    exit: () => void;
    isAuth: boolean;
    setIsAuth: (auth: boolean) => void;
    authToken: string;
    setAuthToken: (token: string) => void;
    authKey: string;
    setAuthKey: (key: string) => void;
    appLoading: boolean;
    setAppLoading: (loading: boolean) => void;
    profile: UserProfile;
    setProfile: (profile: UserProfile) => void;
    changeLanguage: (langCode: Languages) => void;
  }>(AuthContext as any);

  if (auth == null) {
    throw new Error('useAuth() called outside of a AuthProvider?');
  }

  return auth;
};

export default observer(AuthProvider);
