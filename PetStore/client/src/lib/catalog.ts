export interface Product {
  id: string;
  name: string;
  price: number;
  old?: number;
  off?: number;
  badges?: string[];
  category: 'sales' | 'sheckles' | 'limited' | 'regular';
  type: 'pet' | 'sheckles';
}

export const CATALOG = {
  sales: [
    { name: "French Fry Ferret", old: 4, price: 2, badges: ["24H SALE"] },
    { name: "Corrupt Kitsune", old: 4, price: 2, badges: ["24H SALE"] },
    { name: "Age 75 Pets", old: 4.5, price: 2, badges: ["24H SALE"] },
    { name: "Butterfly", old: 7, price: 5, badges: ["24H SALE"] },
    { name: "Disco Bee", old: 10, price: 8, badges: ["24H SALE"] },
  ],
  shecklesDealsNote: "Rate: 1sx / $0.15",
  sheckles: [
    { name: "13Sx Sheckles", price: 2, off: 20 },
    { name: "33Sx Sheckles", price: 5, off: 33 },
    { name: "67Sx Sheckles", price: 10, off: 43 },
    { name: "133Sx Sheckles", price: 20, off: 50 },
    { name: "333Sx Sheckles", price: 50, off: 55 },
    { name: "667Sx Sheckles", price: 100, off: 60 },
    { name: "1333Sx Sheckles", price: 200, off: 67 },
  ],
  pets: {
    limited: [
      { name: "7x Huge RB Tabby", old: 600, price: 300, badges: ["Limited Deal"] },
      { name: "Titan Mimic Octopus", old: 450, price: 350, badges: ["Limited Deal"] },
      { name: "1x Huge Rainbow Tabby", old: 100, price: 50, badges: ["Limited Deal"] },
    ],
    regular: [
      { name: "Kitsune", old: 40, price: 20 },
      { name: "Ascended Pets", old: 21, price: 15 },
      { name: "Raccoon", old: 14, price: 10 },
      { name: "Disco Bee", old: 18, price: 10 },
      { name: "Fennec Fox", old: 14, price: 8.5 },
      { name: "Spino", old: 13, price: 7 },
      { name: "Butterfly", old: 13, price: 7 },
      { name: "Dragonfly", old: 12, price: 6 },
      { name: "T-Rex", old: 12, price: 5 },
      { name: "Mimic", old: 12, price: 5 },
      { name: "Queen Bee", old: 10, price: 5 },
      { name: "Chicken Zombie", old: 10, price: 5 },
      { name: "Corrupt Kitsune", old: 15, price: 4 },
      { name: "Age 75 Pet", old: 9, price: 4.5 },
      { name: "Age 60 Pet", old: 8, price: 3.5 },
    ]
  }
};

export function normalizeProducts(): Product[] {
  const products: Product[] = [];

  // Add sales items
  CATALOG.sales.forEach(product => {
    products.push({
      ...product,
      category: 'sales',
      type: 'pet',
      id: generateId(product.name, 'sales')
    });
  });

  // Add sheckles packages
  CATALOG.sheckles.forEach(product => {
    products.push({
      ...product,
      category: 'sheckles',
      type: 'sheckles',
      id: generateId(product.name, 'sheckles'),
      badges: [`−${product.off}%`]
    });
  });

  // Add limited pets
  CATALOG.pets.limited.forEach(product => {
    products.push({
      ...product,
      category: 'limited',
      type: 'pet',
      id: generateId(product.name, 'limited')
    });
  });

  // Add regular pets
  CATALOG.pets.regular.forEach(product => {
    products.push({
      ...product,
      category: 'regular',
      type: 'pet',
      id: generateId(product.name, 'regular')
    });
  });

  return products;
}

export function generateId(name: string, category: string): string {
  return `${category}-${name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
}

export function calculateSavings(product: Product): number {
  if (!product.old || product.old <= product.price) return 0;
  return Math.round(((product.old - product.price) / product.old) * 100);
}

export function getProductIcon(product: Product): string {
  if (product.type === 'sheckles') return '💰';
  if (product.category === 'limited') return '💎';
  
  // Pet-specific icons
  const name = product.name.toLowerCase();
  if (name.includes('bee')) return '🐝';
  if (name.includes('butterfly')) return '🦋';
  if (name.includes('fox') || name.includes('fennec')) return '🦊';
  if (name.includes('ferret')) return '🐹';
  if (name.includes('kitsune')) return '🦊';
  if (name.includes('raccoon')) return '🦝';
  if (name.includes('dragon')) return '🐉';
  if (name.includes('dino') || name.includes('rex')) return '🦖';
  if (name.includes('chicken')) return '🐔';
  if (name.includes('octopus')) return '🐙';
  if (name.includes('tabby')) return '🐱';
  return '🐾';
}

export function filterProducts(products: Product[], filter: string, search: string): Product[] {
  let filtered = products;

  // Apply category filter
  if (filter !== 'all') {
    filtered = filtered.filter(product => {
      switch (filter) {
        case 'sales': return product.category === 'sales';
        case 'sheckles': return product.category === 'sheckles';
        case 'pets': return product.type === 'pet';
        case 'limited': return product.category === 'limited';
        case 'regular': return product.category === 'regular';
        default: return true;
      }
    });
  }

  // Apply search filter
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(searchLower)
    );
  }

  return filtered;
}

export function sortProducts(products: Product[], sortBy: string): Product[] {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'savings-desc':
      return sorted.sort((a, b) => {
        const savingsA = calculateSavings(a);
        const savingsB = calculateSavings(b);
        return savingsB - savingsA;
      });
    default:
      return sorted;
  }
}
