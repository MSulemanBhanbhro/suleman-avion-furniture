'use client';
import Image from "next/image";
import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { } from 'next/router'; // Import useRouter

import { removeFromCart, incrementQuantity, decrementQuantity } from '../redux/cartSlice';
import { FaMinus, FaPlus, FaTrashAlt } from 'react-icons/fa';  // React Icons for buttons
import { RootState } from "../redux/store";
import { useRouter } from "next/navigation";

const Shopping = () => {
    const cart = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();
    const router = useRouter(); // Use router hook
    const [shippingOption, setShippingOption] = useState<string>("Standard Delivery");
    const [discountCode, setDiscountCode] = useState<string>("");

    // Memoized shipping cost
    const shippingCost = useMemo(() => shippingOption === "Express Delivery" ? 10.00 : 5.00, [shippingOption]);

    // Memoized subtotal calculation
    const subtotal = useMemo(() => cart.items.reduce((total, item) => total + item.price * item.quantity, 0), [cart.items]);

    // Memoized discount amount
    const applyDiscount = useMemo(() => {
        return discountCode === "DISCOUNT10" ? 10 : 0;
    }, [discountCode]);

    // Memoized total amount
    const totalAmount = useMemo(() => (subtotal + shippingCost - applyDiscount).toFixed(2), [subtotal, shippingCost, applyDiscount]);

    return (
        <section className="py-16 bg-gray-100">
            <div className="w-[90%] sm:w-[85%] lg:w-[80%] xl:w-[75%] mx-auto bg-white shadow-lg rounded-lg p-8 sm:p-12 flex flex-col lg:flex-row gap-12">

                {/* Left: Shopping Cart */}
                <div className="w-full lg:w-2/3">
                    <h1 className="text-3xl font-semibold mb-8">Shopping Cart</h1>

                    {cart.items.length === 0 ? (
                        <p className="text-gray-500 text-center py-12 text-lg">Your cart is empty.</p>
                    ) : (
                        <ul className="space-y-8">
                            {cart.items.map((item) => (
                                <li key={item.id} className="flex items-center justify-between p-6 border rounded-lg shadow-sm bg-gray-50">
                                    
                                    {/* Product Image */}
                                    <Image
                                        src={item.image}
                                        width={70}
                                        height={70}
                                        alt={item.name}
                                        className="rounded-lg object-cover"
                                    />
                                    
                                    {/* Product Info */}
                                    <div className="flex-grow px-6">
                                        <h2 className="text-lg font-semibold">{item.name}</h2>
                                        <p className="text-gray-500 text-sm">{item.description}</p>
                                    </div>

                                    {/* Quantity Selector */}
                                    <div className="flex items-center gap-6">
                                        <button className="p-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                                            onClick={() => dispatch(decrementQuantity(item.id))}><FaMinus size={20} /></button>
                                        <span className="text-lg font-semibold">{item.quantity}</span>
                                        <button className="p-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                                            onClick={() => dispatch(incrementQuantity(item.id))}><FaPlus size={20} /></button>
                                    </div>

                                    {/* Price */}
                                    <h3 className="text-xl font-semibold text-gray-800">${(item.price * item.quantity).toFixed(2)}</h3>

                                    {/* Remove Button */}
                                    <button className="text-gray-500 hover:text-red-600 transition text-2xl ml-6"
                                        onClick={() => dispatch(removeFromCart(item.id))}><FaTrashAlt size={22} /></button>
                                </li>
                            ))}
                        </ul>
                    )}

                    <button className="mt-8 text-gray-600 hover:text-gray-800 transition text-lg" onClick={() => router.push("/")}>← Back to Shop</button>
                </div>

                {/* Right: Order Summary */}
                {cart.items.length > 0 && (
                    <div className="w-full lg:w-1/3 bg-gray-100 rounded-lg p-8 shadow-lg">
                        <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

                        <div className="flex justify-between text-lg mb-4">
                            <p className="text-gray-600">Items ({cart.totalQuantity})</p>
                            <p className="font-semibold">${subtotal.toFixed(2)}</p>
                        </div>

                        {/* Shipping Selection */}
                        <div className="mb-6">
                            <label htmlFor="shipping" className="text-gray-600 block mb-2 font-semibold">Shipping</label>
                            <select
                                id="shipping"
                                className="w-full p-3 border rounded-md bg-white"
                                value={shippingOption}
                                onChange={(e) => setShippingOption(e.target.value)}
                            >
                                <option>Standard Delivery - $5.00</option>
                                <option>Express Delivery - $10.00</option>
                            </select>
                        </div>

                        {/* Discount Code */}
                        <div className="mb-6">
                            <label htmlFor="discount" className="text-gray-600 block mb-2 font-semibold">Enter Discount Code</label>
                            <input
                                type="text"
                                id="discount"
                                placeholder="Enter your code"
                                className="w-full p-3 border rounded-md"
                                value={discountCode}
                                onChange={(e) => setDiscountCode(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-between font-semibold text-xl mb-6">
                            <p>Total Price</p>
                            <p>${totalAmount}</p>
                        </div>

                        <button className="w-full bg-black text-white py-4 rounded-lg font-medium text-lg hover:bg-gray-800 transition">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Shopping;
