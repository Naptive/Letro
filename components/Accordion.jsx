import React, { useState } from 'react';
import Image from 'next/image';

function Accordion() {
  const [openOne, setOpenOne] = useState(false);
  const [openTwo, setOpenTwo] = useState(false);

  const handleToggleOne = () => {
    setOpenOne(!openOne);
    setOpenTwo(false);
  };

  const handleToggleTwo = () => {
    setOpenTwo(!openTwo);
    setOpenOne(false);
  };

  return (
    <section className='w-full my-4 relative text-gray-900 flex flex-col'>
      <div
        onClick={handleToggleOne}
        className={`${openOne ? "h-min" : "h-[50px]"} bg-gray-200 px-5 pb-5 pt-[60px] rounded-t-lg relative`}
      >
        <h1 className='absolute top-7 left-5 font-medium text-gray-600'>Product Details</h1>
        <div className={`${openOne ? "rotate-180" : "rotate-[360deg]"} absolute top-7 right-5 overflow-hidden animate-all duration-300`}>
          <Image src='/Icons/openMore.svg' height={16} width={16} alt='Image That indicates that more options are visible'/>
        </div>
        <p className={`${!openOne ? "hidden" : "block text-gray-500"}`}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere, molestias ipsam. Asperiores dolorum eos quod blanditiis, reiciendis, ipsum non explicabo, aut sequi error quasi fugit! Sint distinctio illo alias. Quaerat.
        </p>
      </div>

      <div
        onClick={handleToggleTwo}
        className={`${openTwo ? "h-min" : "h-[60px]"} bg-gray-200 px-5 pb-5 pt-[60px] rounded-b-lg relative mt-2`}
      >
        <h1 className='absolute top-7 left-5 font-medium text-gray-600'>How long will Shiping be</h1>
        <div className={`${openTwo ? " rotate-180" : "rotate-[360deg]"} absolute top-7 right-5 overflow-hidden animate-all duration-300`}>
          <Image src='/Icons/openMore.svg' height={16} width={16} alt='Image That indicates that more options are visible'/>
        </div>
        <p className={`${!openTwo ? "hidden" : "block text-gray-500"}`}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere, molestias ipsam. Asperiores dolorum eos quod blanditiis, reiciendis, ipsum non explicabo, aut sequi error quasi fugit! Sint distinctio illo alias. Quaerat.
        </p>
      </div>
    </section>
  );
}

export default Accordion;
