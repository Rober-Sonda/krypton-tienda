import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type ViewState = 'home' | 'store' | 'custom' | 'about';

interface NavigationContextType {
  currentView: ViewState;
  navigateTo: (view: ViewState) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) throw new Error('useNavigation must be used within a NavigationProvider');
  return context;
};

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  const navigateTo = (view: ViewState) => {
    setCurrentView(view);
    // scrollTo con behavior:'instant' no está soportado en iOS Safari < 16
    // ni en Android Chrome < 83. Usamos fallback directo.
    try {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    } catch {
      window.scrollTo(0, 0);
    }
  };

  return (
    <NavigationContext.Provider value={{ currentView, navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
};
