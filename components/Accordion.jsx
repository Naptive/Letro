import React, { useState } from "react";
import Image from "next/image";

function Accordion({ ProductData }) {
  const [openOne, setOpenOne] = useState(false);
  const [openTwo, setOpenTwo] = useState(false);

  const handleToggleOne = () => {
    setOpenOne(!openOne);
    setOpenTwo(false);
    setTimeout(() => {
      setOpenOne(false);
      setOpenTwo(false);
    }, 10000);
  };

  const handleToggleTwo = () => {
    setOpenTwo(!openTwo);
    setOpenOne(false);
  };

  useState(() => {
    setTimeout(() => {
      setOpenOne(false);
    }, 20000);
  }, [openOne])

  useState(() => {
    setTimeout(() => {
      setOpenTwo(false);
    }, 20000);
  }, [openTwo])

  return (
    <section className="w-full my-4 relative text-gray-900 flex flex-col">
      <div
        onClick={handleToggleOne}
        className={`${
          openOne ? "h-min pt-[60px]" : "min-h-[70px] p-0"
        } bg-gray-200 px-5 pb-5 rounded-t-lg relative animate-all duration-300`}
      >
        <h1 className="absolute top-6 left-5 font-medium text-gray-600">
          Product Details
        </h1>
        <div
          className={`${
            openOne ? "rotate-180" : "rotate-[360deg]"
          } absolute top-6 right-5 overflow-hidden animate-all duration-300`}
        >
          <Image
            src="/Icons/openMore.svg"
            height={16}
            width={16}
            alt="Image That indicates that more options are visible"
          />
        </div>
        <p className={`${!openOne ? "hidden" : "block text-gray-500"}`}>
          {ProductData.description}
        </p>
      </div>

      <div
        onClick={handleToggleTwo}
        className={`${
          openTwo ? "h-min pt-[60px]" : "min-h-[70px] p-0"
        } bg-gray-200 px-5 pb-5 rounded-b-lg relative mt-2`}
      >
        <h1 className="absolute top-6 left-5 font-medium text-gray-600">
          How long will Shiping be
        </h1>
        <div
          className={`${
            openTwo ? " rotate-180" : "rotate-[360deg]"
          } absolute top-6 right-5 overflow-hidden animate-all duration-300`}
        >
          <Image
            src="/Icons/openMore.svg"
            height={16}
            width={16}
            alt="Image That indicates that more options are visible"
          />
        </div>
        <p className={`${!openTwo ? "hidden" : "block text-gray-500"}`}>
          Standard Shipping: Typically takes 3 to 7 business days within the
          same country. International shipping might take longer, around 1 to 3
          weeks depending on the destination. Expedited Shipping: This option
          usually arrives within 1 to 3 business days within the same country,
          and around 3 to 7 business days internationally. Overnight or Next-Day
          Shipping: This is the fastest option, often guaranteeing delivery the
          next business day within the same country. International overnight
          shipping might take a couple of days.
        </p>
      </div>
    </section>
  );
}

export default Accordion;
