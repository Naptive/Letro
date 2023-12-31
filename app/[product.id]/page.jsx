"use client";
import Accordion from "@/components/Accordion";
import Crousel from "@/components/Crousel";
import Review from "@/components/Review";
import { db } from "@/config/FireBase";
import { doc, getDoc } from "firebase/firestore";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

function Product() {
  const [ProductData, setProductData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const cleanId = usePathname().split("/").join("");

  const docRef = doc(db, "ProductInformation", cleanId);

  // Fetch the document using the docRef
  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const docSnapshot = await getDoc(docRef); 
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setisLoading(false);
          setProductData(data);
        } else {
          console.log("Document not found");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchDocument();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="h-screen hide-scrollbar relative bg-[#f4f4f4] pb-2 px-2 md:px-[150px] pt-[5.1rem] overflow-y-scroll overflow-x-hidden flex flex-col items-center">
      

      <Crousel ProductData={ProductData} />

      <div class="w-full mt-[3rem] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        {isLoading ? (
          <div role="status" class="max-w-sm animate-pulse p-5 h-[186px] ">
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div class="h-2 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
            <div class="h-2 bg-gray-300 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div class="h-2 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
            <div class="h-2 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
            <div class="h-2 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            <span class="sr-only">Loading...</span>
          </div>
        ) : (
          <div class="p-5">
            <a href="#">
              <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {ProductData.title}
              </h5>
            </a>

            <div class="flex items-center mt-2.5 mb-5">
              {Array.from({ length: 5 }).map((_, index) => (
                <svg
                  key={index}
                  class={`w-4 h-4 ${
                    index < Math.floor(ProductData.rating)
                      ? "text-yellow-300"
                      : "text-gray-200 dark:text-gray-600"
                  } mr-1`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                 <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              ))}
              <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                {ProductData.rating}
              </span>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-3xl font-bold text-gray-900 dark:text-white">
                R{ProductData.price}
              </span>
              <a
                href="#"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add to cart
              </a>
            </div>
          </div>
        )}
      </div>

      <Accordion ProductData={ProductData} />

      <section className="w-full flex flex-col gap-2">
        <Review ProductData={ProductData} />
      </section>
    </main>
  );
}

export default Product; 
