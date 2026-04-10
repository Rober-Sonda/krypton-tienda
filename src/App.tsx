import { useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import CategorySection from './components/CategorySection.tsx';
import CustomDesigns from './components/CustomDesigns.tsx';
import Footer from './components/Footer.tsx';
import './App.css';

function App() {
  // Prevenir click derecho a nivel global en caso de que logren hacer focus en imágenes
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      // Si el elemento es o está dentro de un contenedor protegido, evitar
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
      
      <main>
        <Hero />
        
        <CustomDesigns />
        
        <div className="container sections-wrapper">
          <CategorySection 
            id="anime"
            title="Anime Clásico & Actual" 
            items={[
              { id: 1, title: 'Attack on Titan Elite', image: '/anime-aot.png', price: '$15.99' },
              { id: 2, title: 'Demon Slayer Spirit', image: '/anime-demon.png', price: '$18.50' },
              { id: 3, title: 'Naruto Shippuden', image: '/anime-naruto.png', price: '$14.00' },
              { id: 4, title: 'Jujutsu Kaisen', image: '/anime-jjk.png', price: '$22.00' },
            ]}
          />

          <CategorySection 
            id="retro"
            title="Videojuegos Clásicos" 
            items={[
              { id: 5, title: 'Zelda Master Sword', image: '/retro-zelda.png', price: '$22.00' },
              { id: 6, title: 'Mario 8-bit', image: '/retro-mario.png', price: '$14.99' },
              { id: 7, title: 'Sonic Retro', image: '/retro-sonic.png', price: '$13.50' },
              { id: 8, title: 'Pac-Man Arcade', image: '/retro-pacman.png', price: '$15.00' }
            ]}
          />

          <CategorySection 
            id="gym"
            title="Anime Gym & Fitness"
            shortTitle="Gym"
            items={[
              { id: 9, title: 'Zoro Big or Home', image: '/gym-zoro-v2.jpg', price: '$22.00' },
              { id: 10, title: 'Luffy Beast Mode', image: '/gym-luffy-v2.jpg', price: '$22.00' },
              { id: 11, title: 'Gohan One More Rep', image: '/gym-gohan-v2.jpg', price: '$22.00' },
              { id: 12, title: 'Goku Gym Fitness', image: '/gym-goku-v2.jpg', price: '$22.00' }
            ]}
          />
          
          <CategorySection 
            id="simpsons"
            title="Los Simpsons & Clásicos 90s"
            shortTitle="Los Simpsons"
            items={[
              { id: 13, title: 'Homero No Beer No TV', image: '/simpsons-homero.jpg', price: '$22.00' },
              { id: 14, title: 'He-Man Power', image: '/heman-shirt.png', price: '$19.99' },
              { id: 15, title: 'Dragon Ball Z', image: '/dbz-goku-classic.jpg', price: '$21.00' },
              { id: 16, title: 'Seiya Cosmos', image: '/caballeros-shirt.png', price: '$23.50' }
            ]}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
