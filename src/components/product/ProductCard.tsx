import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import type { ProductWithDetails } from '../../types';
import { calculateDiscount } from '../../lib/utils';

import Button from '../ui/Button';

interface ProductCardProps {
  product: ProductWithDetails;
  onAddToCart?: () => void;
  onToggleWishlist?: () => void;
  isWishlisted?: boolean;
}

export default function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
}: ProductCardProps) {
  const primaryImage = product.images?.find((img) => img.is_primary) || product.images?.[0];
  const discount = calculateDiscount(product.base_price, product.sale_price || 0);

  return (
    <div className="group flex flex-col gap-3 h-full">
      {/* Top Image Box */}
      <div className="relative aspect-square overflow-hidden bg-white rounded-[2rem] p-4 flex items-center justify-center transition-transform duration-700 ease-in-out group-hover:scale-[1.02]">
        <Link to={`/product/${product.slug}`} className="w-full h-full flex items-center justify-center">
          {primaryImage ? (
            <img
              src={primaryImage.image_url}
              alt={primaryImage.alt_text || product.name}
              className="w-full h-full object-contain transition-transform duration-700 ease-in-out group-hover:scale-110"
            />
          ) : (
            <img
              src={`https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80&auto=format&fit=crop`}
              alt="Placeholder fashion model"
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 opacity-90 rounded-[1.5rem]"
            />
          )}
        </Link>

        {discount > 0 && (
          <div className="absolute top-4 left-4 bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
            -{discount}%
          </div>
        )}

        {onToggleWishlist && (
          <button
            onClick={onToggleWishlist}
            className="absolute top-4 right-4 bg-white/80 backdrop-blur-md rounded-full p-2.5 shadow-sm hover:scale-110 transition-transform"
          >
            <Heart
              className={`w-5 h-5 ${
                isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-900'
              }`}
              strokeWidth={1.5}
            />
          </button>
        )}

        <div className="absolute bottom-4 left-4 right-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
          <Button
            onClick={onAddToCart}
            className="w-full bg-black text-white hover:bg-gray-800 rounded-full font-bold uppercase tracking-widest text-xs py-3"
          >
            <ShoppingCart className="w-4 h-4 mr-2" strokeWidth={2} />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Bottom Text Box */}
      <div className="bg-white rounded-[2rem] p-6 flex flex-col justify-between flex-1 transition-transform duration-700 ease-in-out group-hover:scale-[1.02]">
        <div>
          <Link to={`/product/${product.slug}`}>
            <h3 className="font-black text-2xl text-gray-900 hover:text-gray-600 transition-colors tracking-tight leading-tight line-clamp-2">
              {product.name}
            </h3>
          </Link>
          
          {product.category && (
            <p className="text-sm font-semibold text-gray-400 mt-2 uppercase tracking-widest">{product.category.name}</p>
          )}
        </div>

        <div className="mt-4 flex items-center gap-3">
          {product.sale_price ? (
            <>
              <span className="text-xl font-black text-black">
                Rs. {product.sale_price?.toLocaleString() || 0}
              </span>
              <span className="text-sm font-bold text-gray-400 line-through">
                Rs. {product.base_price?.toLocaleString() || 0}
              </span>
            </>
          ) : (
            <span className="text-xl font-black text-black">
              Rs. {product.base_price?.toLocaleString() || 0}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
