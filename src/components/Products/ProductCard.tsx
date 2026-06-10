'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { IProduct } from '@/types';

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link href={`/products/${product.slug}`}>
        <div className="relative overflow-hidden bg-cream mb-4 aspect-square">
          <Image
            src={product.images[imageIndex] || product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {discount > 0 && (
            <div className="absolute top-4 right-4 bg-merlot text-cream px-3 py-1 text-sm font-sans font-bold">
              -{discount}%
            </div>
          )}

          {/* Image Thumbnails */}
          {product.images.length > 1 && (
            <div className="absolute bottom-4 left-4 flex gap-2">
              {product.images.slice(0, 3).map((_, idx) => (
                <button
                  key={idx}
                  onMouseEnter={() => setImageIndex(idx)}
                  className={`w-2 h-2 rounded-full transition ${
                    idx === imageIndex ? 'bg-merlot' : 'bg-ice-melt'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="space-y-2">
        <p className="text-xs font-sans text-merlot uppercase tracking-widest">{product.category}</p>
        <h3 className="font-serif text-lg text-deep-espresso group-hover:text-merlot transition">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-serif text-deep-espresso">₹{product.price}</span>
          {product.compareAtPrice && (
            <span className="text-sm line-through text-gray-400">₹{product.compareAtPrice}</span>
          )}
        </div>

        {/* Rating */}
        {product.ratings && (
          <div className="flex items-center gap-2">
            <div className="flex text-merlot">★★★★☆</div>
            <span className="text-xs font-sans text-gray-600">({product.reviews})</span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className="mt-4 w-full py-3 bg-ice-melt text-deep-espresso font-sans font-semibold hover:bg-ice-melt-dark transition flex items-center justify-center gap-2"
        >
          {isWishlisted ? <AiFillHeart /> : <AiOutlineHeart />}
          {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
        </button>
      </div>
    </motion.div>
  );
}
