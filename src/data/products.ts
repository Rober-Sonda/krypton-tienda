export interface Product {
  id: number;
  title: string;
  image: string;
  price: string;
  category: 'anime' | 'retro' | 'gym' | 'simpsons' | 'argentina';
}

export const productsData: Product[] = [
  // Anime
  { id: 1, title: 'Attack on Titan Elite', image: '/anime-aot.png', price: '$15.99', category: 'anime' },
  { id: 2, title: 'Demon Slayer Spirit', image: '/anime-demon.png', price: '$18.50', category: 'anime' },
  { id: 3, title: 'Naruto Shippuden', image: '/anime-naruto.png', price: '$14.00', category: 'anime' },
  { id: 4, title: 'Jujutsu Kaisen', image: '/anime-jjk.png', price: '$22.00', category: 'anime' },
  
  // Retro
  { id: 5, title: 'Zelda Master Sword', image: '/retro-zelda.png', price: '$22.00', category: 'retro' },
  { id: 6, title: 'Mario 8-bit', image: '/retro-mario.png', price: '$14.99', category: 'retro' },
  { id: 7, title: 'Sonic Retro', image: '/retro-sonic.png', price: '$13.50', category: 'retro' },
  { id: 8, title: 'Pac-Man Arcade', image: '/retro-pacman.png', price: '$15.00', category: 'retro' },
  
  // Gym
  { id: 9, title: 'Zoro Big or Home', image: '/gym-zoro-v2.jpg', price: '$22.00', category: 'gym' },
  { id: 10, title: 'Luffy Beast Mode', image: '/gym-luffy-v2.jpg', price: '$22.00', category: 'gym' },
  { id: 11, title: 'Gohan One More Rep', image: '/gym-gohan-v2.jpg', price: '$22.00', category: 'gym' },
  { id: 12, title: 'Goku Gym Fitness', image: '/gym-goku-v2.jpg', price: '$22.00', category: 'gym' },
  
  // Simpsons / 90s
  { id: 13, title: 'Homero No Beer No TV', image: '/simpsons-homero.jpg', price: '$22.00', category: 'simpsons' },
  { id: 14, title: 'He-Man Power', image: '/heman-shirt.png', price: '$19.99', category: 'simpsons' },
  { id: 15, title: 'Dragon Ball Z', image: '/dbz-goku-classic.jpg', price: '$21.00', category: 'simpsons' },
  { id: 16, title: 'Seiya Cosmos', image: '/caballeros-shirt.png', price: '$23.50', category: 'simpsons' },

  // Argentina (La Escaloneta)
  { id: 17, title: 'Messi Campeón', image: '/arg-messi.png', price: '$25.00', category: 'argentina' },
  { id: 18, title: 'Las 3 Estrellas', image: '/arg-stars.png', price: '$24.00', category: 'argentina' },
  { id: 19, title: 'Dibu Bailando', image: '/arg-dibu.png', price: '$22.50', category: 'argentina' },
  { id: 20, title: 'Escudo Dorado', image: '/arg-shield.png', price: '$23.00', category: 'argentina' }
];

export const getProductsByCategory = (category: Product['category']) => {
  return productsData.filter(p => p.category === category);
};
