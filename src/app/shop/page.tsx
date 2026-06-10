'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navigation/Navbar';
import Footer from '@/components/Layout/Footer';
import ProductCard from '@/components/Products/ProductCard';
import { IProduct, ICategory } from '@/types';

export default function ShopPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100000]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch(`/api/products?category=${selectedCategory}&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`),
          fetch('/api/categories'),
        ]);

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        if (productsData.success) setProducts(productsData.data);
        if (categoriesData.success) setCategories(categoriesData.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory, priceRange]);

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-serif text-deep-espresso mb-12">Shop</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              {/* Category Filter */}
              <div>
                <h3 className="font-serif font-bold text-deep-espresso mb-4">Categories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`block text-sm font-sans ${
                      selectedCategory === '' ? 'text-merlot font-bold' : 'text-deep-espresso'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`block text-sm font-sans ${
                        selectedCategory === cat.id ? 'text-merlot font-bold' : 'text-deep-espresso'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="font-serif font-bold text-deep-espresso mb-4">Price Range</h3>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
                <p className="text-sm font-sans mt-2">₹0 - ₹{priceRange[1]}</p>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="text-center py-20">Loading products...</div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">No products found</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
