import { Product, calculateSavings, getProductIcon } from '@/lib/catalog';
import { cartStore } from '@/lib/cart-store';
import { toastManager } from './toast-manager';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const savings = calculateSavings(product);
  const icon = getProductIcon(product);

  const handleAddToCart = () => {
    cartStore.addToCart(product);
    toastManager.show(`Added ${product.name} to cart!`, 'success');
  };

  return (
    <div 
      className="product-card-brick brick-texture"
      data-testid={`product-card-${product.id}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="text-lg font-bold text-gray-900 mb-2">
            {icon} {product.name}
          </div>
          <div className="flex flex-wrap gap-2">
            {product.badges?.map((badge, index) => (
              <Badge 
                key={index}
                className={`text-xs font-bold uppercase tracking-wide ${
                  badge.includes('SALE') ? 'badge-sale' : 
                  badge.includes('Limited') ? 'badge-limited' : 
                  badge.includes('−') ? 'badge-discount' : 
                  'badge-savings'
                }`}
                data-testid={`product-badge-${index}`}
              >
                {badge}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <div>
          <span className="text-2xl font-bold text-leaf-green" data-testid="product-price">
            ${product.price.toFixed(2)}
          </span>
          {product.old && (
            <span className="text-base text-gray-500 line-through ml-2" data-testid="product-old-price">
              was ${product.old.toFixed(2)}
            </span>
          )}
        </div>
        {savings > 0 && (
          <div className="mt-2">
            <Badge className="badge-savings" data-testid="savings-badge">
              Save {savings}%
            </Badge>
          </div>
        )}
      </div>
      
      <div className="flex flex-col gap-3">
        <Button 
          className="btn-primary-brick w-full" 
          onClick={handleAddToCart}
          data-testid="add-to-cart-button"
        >
          🛒 Add to Cart
        </Button>
        <div className="text-xs text-gray-500 text-center">
          Delivery via in-game trade/Discord
        </div>
      </div>
    </div>
  );
}
