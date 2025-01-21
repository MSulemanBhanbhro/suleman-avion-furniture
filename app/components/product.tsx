'use client'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation';

const Product = () => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push('/productlisting'); // Navigates to the product listing page
  };

  return (
    <section className="px-8 py-12 text-[#2A254B] mt-12">
      <h1 className="text-2xl font-semibold">Our popular products</h1>

      {/* Flexbox layout: stack on small screens, side by side on medium and large screens */}
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        
        {/* Product 1 */}
        <div className="w-full md:w-[650px] h-auto">
          <Image
            src="/images/large.png"
            height={800}
            width={800}
            alt="Suede Sofa"
            className="w-full h-[80%] object-cover"
            loading="lazy" // Lazy load images for better performance
          />
          <div className="mt-4">
            <p className="py-2 text-lg font-medium">The popular suede sofa</p>
            <p className="text-xl font-semibold">$980</p>
          </div>
        </div>

        {/* Product 2 */}
        <div className="w-full md:w-[350px] h-auto">
          <Image
            src="/images/chair.png"
            height={800}
            width={800}
            alt="Chair"
            className="w-full h-[80%] object-cover"
            loading="lazy" // Lazy load images for better performance
          />
          <div className="mt-4">
            <p className="py-2 text-lg font-medium">The Dandy chair</p>
            <p className="text-xl font-semibold">$250</p>
          </div>
        </div>

        {/* Product 3 */}
        <div className="w-full md:w-[350px] h-auto">
          <Image
            src="/images/chair1.png"
            height={900}
            width={900}
            alt="Chair"
            className="w-full h-[80%] object-cover"
            loading="lazy" // Lazy load images for better performance
          />
          <div className="mt-4">
            <p className="py-2 text-lg font-medium">The Dandy chair</p>
            <p className="text-xl font-semibold">$250</p>
          </div>
        </div>

      </div>

      {/* View Collection Button */}
      <div className="my-10 flex justify-center items-center">
        <button
          className="bg-[#F9F9F9] py-4 px-6 rounded-[5px] text-[#2A254B] font-medium transition duration-300 ease-in-out hover:bg-[#2A254B] hover:text-white"
          onClick={handleNavigation}
        >
          View products
        </button>
      </div>
    </section>
  );
}

export default Product;
