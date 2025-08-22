import { useState, useEffect, useMemo } from 'react';
import { ProductCard } from '@/components/product-card';
import { normalizeProducts, filterProducts, sortProducts, type Product } from '@/lib/catalog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ShopProps {
  searchQuery: string;
  initialFilter?: string;
}

export default function Shop({ searchQuery, initialFilter = 'all' }: ShopProps) {
  const [currentFilter, setCurrentFilter] = useState(initialFilter);
  const [currentSort, setCurrentSort] = useState('name-asc');
  const allProducts = useMemo(() => normalizeProducts(), []);

  useEffect(() => {
    setCurrentFilter(initialFilter);
  }, [initialFilter]);

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = filterProducts(allProducts, currentFilter, searchQuery);
    return sortProducts(filtered, currentSort);
  }, [allProducts, currentFilter, searchQuery, currentSort]);

  const filters = [
    { value: 'all', label: 'All Items' },
    { value: 'sales', label: '24H Sales' },
    { value: 'sheckles', label: 'Sheckles' },
    { value: 'pets', label: 'All Pets' },
    { value: 'limited', label: 'Limited Deals' },
    { value: 'regular', label: 'Regular Pets' },
  ];

  const sortOptions = [
    { value: 'name-asc', label: 'A → Z' },
    { value: 'name-desc', label: 'Z → A' },
    { value: 'price-asc', label: 'Price: Low → High' },
    { value: 'price-desc', label: 'Price: High → Low' },
    { value: 'savings-desc', label: 'Savings: High → Low' },
  ];

  return (
    <main className="bg-gray-50 min-h-screen">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-8 text-3xl font-bold text-gray-900" data-testid="shop-title">
            🛍️ Shop
          </h2>
          
          {/* Filters & Sort */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex flex-wrap gap-3">
              {filters.map(filter => (
                <Button
                  key={filter.value}
                  variant={currentFilter === filter.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentFilter(filter.value)}
                  className={`filter-chip ${currentFilter === filter.value ? 'active' : ''}`}
                  data-testid={`filter-${filter.value}`}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
            <Select value={currentSort} onValueChange={setCurrentSort}>
              <SelectTrigger className="w-48" data-testid="sort-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="products-grid">
            {filteredAndSortedProducts.length > 0 ? (
              filteredAndSortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2" data-testid="no-results-title">
                  No items found
                </h3>
                <p className="text-gray-500" data-testid="no-results-message">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
