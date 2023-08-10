'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
function product() {
    const router = useRouter()
  return (
    <main className='w-screen h-screen'>
    <section className='w-full relative h-[22em] bg-gray-300 flex items-center justify-center'>
        <button onClick={() => router.back()} className='w-[40px] h-[40px] rounded-md bg-white absolute top-10 left-4 flex items-center justify-center'><Image src={'/Icons/LeftArow.svg'} alt='w' height={35} width={35}/></button>
        <Image src={'/Testing/HeadPhonesP.webp'} alt='head' width={100} height={100} className=' object-contain h-[200px] w-auto'/>
    </section>

    <section className='p-4'>
     <h1 className='text-[24px] font-semibold py-2'>HeadPhones X</h1>

     <p className=' line-clamp-3'>
        Lorem ipsum dolor Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus illo tempore officia voluptas iste quis quia nesciunt, adipisci sequi autem consequatur vel sunt hic corrupti totam? Dolor, veritatis. Provident, cumque. sit amet consectetur. Lorem ipsum dolor sit amet consectetur.
     </p>
     <div className='py-4 text-white font-medium flex gap-2'>
        <button className='bg-sky-500 h-[40px] w-[90px] rounded-md'>Black</button>
        <button className='bg-sky-500 h-[40px] w-[90px] rounded-md'>White</button>
     </div>
    </section>
    </main>
  )
}

export default product