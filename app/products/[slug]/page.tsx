'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';


import { useWishlist } from '@/app/context/WishlistContext';
import Link from 'next/link';
import { Loader } from 'lucide-react';
import clsx from 'clsx';
import { addToCart } from '@/app/redux/cartSlice';
import { client } from '@/sanity/lib/client';

type Product = {
  _id: number;
  name: string;
  slug: string;
  imageUrl: string;
  categoryName: string;
  description: string;
  price: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  tags: string[];
  features: string[];
};

async function getData(slug: string) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0]{
    _id,
    name,
    "slug": slug.current,
    "imageUrl": image.asset->url,
    "categoryName": category->name,
    description,
    price,
    "dimensions": dimensions {
      width,
      height,
      depth
    },
    tags,
    features,
    "categorySlug": category->slug.current
  }`;

  const product = await client.fetch(query);
  if (!product) return null;

  const relatedQuery = `*[_type == "product" && category->slug.current == "${product.categorySlug}" && slug.current != "${slug}"]{
    _id,
    name,
    "slug": slug.current,
    "imageUrl": image.asset->url,
    price
  }`;

  const relatedProducts = await client.fetch(relatedQuery);
  return { product, relatedProducts };
}

const ProductListing = ({ params }: { params: { slug: string } }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const { addToWishlist } = useWishlist();

  const fetchData = useCallback(async () => {
    const data = await getData(params.slug);
    if (data) {
      setProduct(data.product);
      setRelatedProducts(data.relatedProducts);
    }
  }, [params.slug]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.imageUrl,
      description: product.description,
    }));
    showPopup("Item added to cart!");
  };

  const handleAddToWishlist = () => {
    if (!product) return;
    addToWishlist({ ...product, _id: product._id.toString() });
    showPopup("Item added to wishlist!");
  };

  const showPopup = (message: string) => {
    setPopupMessage(message);
    setTimeout(() => setPopupMessage(null), 3000);
  };

  if (!product) {
    return <div className="flex justify-center items-center h-screen">
      <Loader className="animate-spin text-[#2A254B]" size={48} />
    </div>;
  }

  return (
    <section className="px-6 md:px-12 py-10 bg-gray-50">
      <div className="flex flex-col md:flex-row gap-8 items-center bg-white shadow-lg p-6 rounded-lg">
        <div className="w-full md:w-1/2">
          <Image
            src={product.imageUrl}
            width={600}
            height={600}
            alt={product.name}
            className="w-full h-[540px] object-cover rounded-md hover:scale-105 transition-all"
            priority
          />
        </div>
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-3xl font-semibold text-gray-900">{product.name}</h1>
          <p className="text-xl text-gray-700">${product.price}</p>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {product.features && product.features.length > 0 && (
            <div className="mt-4 p-4 border border-gray-300 rounded-md">
              <h3 className="text-lg font-semibold mb-3">Key Features</h3>
              <ul className="list-disc list-inside text-gray-700">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="p-4 border rounded-md">
            <h3 className="text-lg font-semibold mb-2">Product Dimensions</h3>
            <div className="text-gray-700">
              <p>Width: {product.dimensions.width} </p>
              <p>Height: {product.dimensions.height} </p>
              <p>Depth: {product.dimensions.depth} </p>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              className={clsx(
                "px-6 py-3 bg-[#2A254B] text-white rounded-md hover:bg-[#1d1b38] focus:outline-none focus:ring-2 focus:ring-[#2A254B]",
                { "opacity-50 cursor-not-allowed": !product }
              )}
              onClick={handleAddToCart}
              disabled={!product}
            >
              Add to Cart
            </button>
            <button
              className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={handleAddToWishlist}
            >
              Wishlist ❤️
            </button>
          </div>
        </div>
      </div>

      {popupMessage && (
        <div className="fixed bottom-6 right-6 bg-[#2A254B] text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
          <p>{popupMessage}</p>
        </div>
      )}

      {relatedProducts.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <div key={item._id} className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition-all">
                <Image
                  src={item.imageUrl}
                  width={200}
                  height={200}
                  alt={item.name}
                  className="w-full h-[200px] object-cover rounded-md hover:scale-105 transition-all"
                  loading="lazy"
                />
                <h3 className="mt-2 text-lg font-medium">{item.name}</h3>
                <p className="text-sm text-gray-600">${item.price}</p>
                <Link href={`/product/${item.slug}`} className="text-blue-600 mt-2 block">View Product</Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </section>
  );
};

export default ProductListing;
