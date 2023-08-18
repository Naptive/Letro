'use client'
import { auth } from '@/config/FireBase';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';


function Cart() {
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        // Get the cart data from localStorage and parse it into an array
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartData(storedCart);
    }, []);

  return (
    <main className=' p-2 pt-[54px] space-y-2 bg-[#f4f4f4] h-screen w-full'>
        <h1 className='text-[28px] font-bold px-4'>Cart</h1>

        <section className='w-full h-min grid grid-cols-1'>
        {cartData.map((cart) => (
            <div key={cart.id} className='h-[128px] flex bg-white shadow-lg rounded-lg m-2'>
                <Image src={cart.imageOne} alt={cart.title} width={40} height={40} className='h-full w-auto object-contain p-4'/>
                <div className='py-5'>
                    <h1 className='text-xl min-h-[56px] line-clamp-2 font-semibold tracking-tight text-gray-900 dark:text-white'>{cart.title}</h1>
                    <h5 className='text-2xl font-bold text-gray-900 dark:text-white'>{cart.price}</h5>
                </div>
            </div>
        ))}   
        </section>
    </main>
  )
}

export default Cart