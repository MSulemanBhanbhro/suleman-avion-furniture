"use client"; // This is an interactive component

import { useWishlist } from "../context/WishlistContext";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();

  // Memoize the wishlist to avoid unnecessary re-renders
  const memoizedWishlist = useMemo(() => wishlist, [wishlist]);

  const handleRemove = (id: string) => {
    removeFromWishlist(id);
  };

  return (
    <section className="px-4 md:px-8 py-12 text-[#2A254B] mt-12">
      <h1 className="text-2xl font-semibold">My Wishlist</h1>
      {memoizedWishlist.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
          {memoizedWishlist.map((product) => (
            <div key={product._id} className="w-full h-auto bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
              <Link href={`/products/${product.slug}`} className="block">
                <Image
                  src={product.imageUrl}
                  height={700}
                  width={700}
                  alt={product.name}
                  className="w-full h-[250px] object-cover transition-transform duration-300 ease-in-out"
                  loading="lazy" // Lazy load images
                />
              </Link>
              <div className="mt-4 text-[#2A254B] p-4">
                <p className="text-lg font-semibold">{product.name}</p>
                <p className="text-sm text-gray-600">${product.price}</p>
                <button
                  className="mt-4 bg-red-500 text-white py-2 px-4 rounded-full w-full transition-colors hover:bg-red-600"
                  onClick={() => handleRemove(product._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-12">Your wishlist is empty</p>
      )}
    </section>
  );
}
