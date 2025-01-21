"use client"; // This is an interactive component

import { useWishlist } from "../context/WishlistContext";

interface Product {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  slug: string;
}

export default function WishlistButton({ product }: { product: Product }) {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isInWishlist = wishlist.some((item) => item._id === product._id);

  return (
    <button
      className={`mt-2 py-2 px-4 rounded ${
        isInWishlist ? "bg-red-500 text-white" : "bg-blue-500 text-white"
      }`}
      onClick={() => (isInWishlist ? removeFromWishlist(product._id) : addToWishlist(product))}
    >
      {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
    </button>
  );
}
