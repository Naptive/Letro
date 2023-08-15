'use client'
import Image from "next/image";
import { useState } from "react";

function Carousel({ ProductData }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    ProductData.imageOne,
    "/Testing/HeadPhones2.webp",
    "/Testing/HeadPhonesP.webp",
    "/Testing/HeadPhones2.webp",
    "/Testing/HeadPhonesP.webp",
  ];

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };

  return (
    <div className="relative w-full">
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`${
              index === currentSlide ? "block" : "hidden"
            } duration-700 ease-in-out`}
          >
            <Image
              src={slide}
              alt={`Slide ${index + 1}`}
              className="absolute object-contain w-auto block h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              width={220}
              height={220}
              priority
            />
          </div>
        ))}
      </div>

      <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-[-55px] left-1/2">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-2 h-2 rounded-full ${
              index === currentSlide
                ? "bg-gray-900 dark:bg-gray-800"
                : "bg-gray-600 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800"
            }`}
            aria-current={index === currentSlide}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </div>

      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-2 cursor-pointer group focus:outline-none"
        data-carousel-prev
        onClick={handlePrevSlide}
      >
        <Image src={'/Icons/LeftImage.svg'} alt="icon" width={40} height={40} className="shadow rounded"/>
      </button>
      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-2  cursor-pointer group focus:outline-none"
        data-carousel-next
        onClick={handleNextSlide}
      >
       <Image src={'/Icons/RightImage.svg'} alt="icon" width={40} height={40} className="shadow rounded"/>
      </button>
    </div>
  );
}

export default Carousel;