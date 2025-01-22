'use client';
import Image from "next/image";
import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../redux/cartSlice';
import { FaMinus, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { RootState } from "../redux/store";
import { useRouter } from "next/navigation";

const Shopping = () => {
    const cart = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();
    const router = useRouter();
    const [shippingOption, setShippingOption] = useState<string>("Standard Delivery");
    const [discountCode, setDiscountCode] = useState<string>("");

    const shippingCost = useMemo(() => shippingOption === "Express Delivery" ? 10.00 : 5.00, [shippingOption]);
    const subtotal = useMemo(() => cart.items.reduce((total, item) => total + item.price * item.quantity, 0), [cart.items]);
    const applyDiscount = useMemo(() => discountCode === "DISCOUNT10" ? 10 : 0, [discountCode]);
    const totalAmount = useMemo(() => (subtotal + shippingCost - applyDiscount).toFixed(2), [subtotal, shippingCost, applyDiscount]);

    return (
        <section className="py-10 px-4 sm:px-8 bg-gray-100">
            <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6 sm:p-10 flex flex-col lg:flex-row gap-8">

                {/* Shopping Cart */}
                <div className="w-full lg:w-2/3">
                    <h1 className="text-2xl sm:text-3xl font-semibold mb-6">Shopping Cart</h1>
                    {cart.items.length === 0 ? (
                        <p className="text-gray-500 text-center py-10 text-lg">Your cart is empty.</p>
                    ) : (
                        <ul className="space-y-6">
                            {cart.items.map((item) => (
                                <li key={item.id} className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 border rounded-lg shadow-sm bg-gray-50">
                                    
                                    <Image
                                        src={item.image}
                                        width={60}
                                        height={60}
                                        alt={item.name}
                                        className="rounded-lg object-cover"
                                    />
                                    
                                    <div className="flex-grow px-4 text-center sm:text-left">
                                        <h2 className="text-lg font-semibold">{item.name}</h2>
                                        <p className="text-gray-500 text-sm">{item.description}</p>
                                    </div>

                                    <div className="flex items-center gap-4 sm:gap-6">
                                        <button className="p-2 bg-gray-200 rounded-md hover:bg-gray-300" onClick={() => dispatch(decrementQuantity(item.id))}><FaMinus size={16} /></button>
                                        <span className="text-lg font-semibold">{item.quantity}</span>
                                        <button className="p-2 bg-gray-200 rounded-md hover:bg-gray-300" onClick={() => dispatch(incrementQuantity(item.id))}><FaPlus size={16} /></button>
                                    </div>

                                    <h3 className="text-lg font-semibold text-gray-800">${(item.price * item.quantity).toFixed(2)}</h3>

                                    <button className="text-gray-500 hover:text-red-600 text-xl sm:ml-4" onClick={() => dispatch(removeFromCart(item.id))}><FaTrashAlt size={20} /></button>
                                </li>
                            ))}
                        </ul>
                    )}
                    <button className="mt-6 text-gray-600 hover:text-gray-800 transition text-lg" onClick={() => router.push("/")}>← Back to Shop</button>
                </div>

                {/* Order Summary */}
                {cart.items.length > 0 && (
                    <div className="w-full lg:w-1/3 bg-gray-100 rounded-lg p-6 shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

                        <div className="flex justify-between text-lg mb-3">
                            <p className="text-gray-600">Items ({cart.totalQuantity})</p>
                            <p className="font-semibold">${subtotal.toFixed(2)}</p>
                        </div>

                        <div className="mb-4">
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

                        <div className="mb-4">
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

                        <div className="flex justify-between font-semibold text-xl mb-4">
                            <p>Total Price</p>
                            <p>${totalAmount}</p>
                        </div>

                        <button className="w-full bg-black text-white py-3 rounded-lg font-medium text-lg hover:bg-gray-800 transition">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Shopping;
