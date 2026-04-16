import { useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import HomeView from './views/HomeView.tsx';
import StoreView from './views/StoreView.tsx';
import CustomDesignView from './views/CustomDesignView.tsx';
import AboutView from './views/AboutView.tsx';
import CartSidebar from './components/CartSidebar.tsx';
import AuthModal from './components/AuthModal.tsx';
import { useNavigation } from './context/NavigationContext.tsx';
import './App.css';

function App() {
  const { currentView } = useNavigation();

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'img' || target.closest('.protected-media')) {
        e.preventDefault();
      }
    };
    
    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      <CartSidebar />
      
      <main>
        {currentView === 'home' && <HomeView />}
        {currentView === 'store' && <StoreView />}
        {currentView === 'custom' && <CustomDesignView />}
        {currentView === 'about' && <AboutView />}
      </main>

      <Footer />
      <AuthModal />
    </div>
  );
}

export default App;
