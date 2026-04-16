import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider, db } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import type { User } from 'firebase/auth';

export interface UserProfile {
  name: string;
  phone: string;
  address: string;
  city: string;
  cp: string;
  notes?: string;
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  showLoginPrompt: boolean;
  showProfilePrompt: boolean;
  setShowLoginPrompt: (show: boolean) => void;
  setShowProfilePrompt: (show: boolean) => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showProfilePrompt, setShowProfilePrompt] = useState(false);

  const fetchProfile = async (uid: string) => {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data() as UserProfile;
        setUserProfile(data);
        if (!data.address || !data.phone) {
          setShowProfilePrompt(true);
        } else {
          setShowProfilePrompt(false);
        }
      } else {
        setUserProfile(null);
        setShowProfilePrompt(true);
      }
    } catch (err) {
      console.error("Error fetching profile", err);
    }
  };

  const refreshProfile = async () => {
    if (currentUser) {
      await fetchProfile(currentUser.uid);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        fetchProfile(user.uid).catch(err => console.error("Firestore offline o error:", err));
      } else {
        setUserProfile(null);
        setShowProfilePrompt(false);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in", error);
      alert("Hubo un error al iniciar sesión. Asegúrate de que el login de Google está habilitado en tu consola Firebase.");
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      userProfile, 
      loginWithGoogle, 
      logout, 
      loading, 
      showLoginPrompt, 
      setShowLoginPrompt,
      showProfilePrompt,
      setShowProfilePrompt,
      refreshProfile
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
