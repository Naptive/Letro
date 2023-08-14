import Image from "next/image";
import React from "react";

function Review({ ProductData }) {
  const current = new Date();

  const date = {
    month: current.getMonth(),
    year: current.getFullYear(),
    day: current.getDay(),
  };
  return (
    <>
      {!ProductData ? (
        <div
          role="status"
          class="max-w-sm w-full min-h-2.5 p-4 border border-gray-300 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
        >
          <div>
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
            <div class="w-48 h-2 bg-gray-300 rounded-full dark:bg-gray-700"></div>
          </div>
          <div class="flex items-center justify-center h-48 mb-4 bg-gray-400 rounded dark:bg-gray-700">
            <svg
              class="w-10 h-10 text-gray-300 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 20"
            >
              <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
            </svg>
          </div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div class="h-2 bg-gray-300 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div class="h-2 bg-gray-300 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div class="h-2 bg-gray-300 rounded-full dark:bg-gray-700"></div>
          <div class="flex items-center mt-4 space-x-3">
            <svg
              class="w-10 h-10 text-gray-300 dark:text-gray-700"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
          </div>
          <span class="sr-only">Loading...</span>
        </div>
      ) : (
        <>
          {console.log(ProductData)}

          {ProductData?.reviews?.map((review, index) => (
            <div key={index} className="text-gray-900">
              <article className="p-4 bg-white rounded-lg">
                <div class="flex items-center mb-4 space-x-4 mt-4">
                  <Image
                    class="w-10 h-10 rounded-full object-contain"
                    src="/Testing/userPic.webp"
                    alt=""
                    width={40}
                    height={40}
                  />

                  <div class="space-y-1 font-medium dark:text-white">
                    <p>
                      {review.name}
                      <time
                        datetime="2014-08-16 19:00"
                        class="block text-sm text-gray-500 dark:text-gray-400"
                      >
                        {`Joined on ${date.day}/${date.month}/${date.year}`}
                      </time>
                    </p>
                  </div>
                </div>
                <div class="flex items-center mb-1">
                  <svg
                    class="w-4 h-4 text-yellow-300 mr-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    class="w-4 h-4 text-yellow-300 mr-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    class="w-4 h-4 text-yellow-300 mr-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    class="w-4 h-4 text-yellow-300 mr-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    class="w-4 h-4 text-gray-300 dark:text-gray-500 mr-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <h3 class="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
                    Thinking to buy another one!
                  </h3>
                </div>
                <footer class="mb-5 text-sm text-gray-500 dark:text-gray-400">
                  <p>
                    Reviewed in the United Kingdom on{" "}
                    <time datetime="2017-03-03 19:00">March 3, 2017</time>
                  </p>
                </footer>
                <p class="mb-2 text-gray-500 line-clamp-6 dark:text-gray-400">
                  {review.description}
                </p>
                <a
                  href="#"
                  class="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Read more
                </a>
                <aside>
                  <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    19 people found this helpful
                  </p>
                  <div class="flex items-center mt-3 space-x-3 divide-x divide-gray-200 dark:divide-gray-600">
                    <a
                      href="#"
                      class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-2 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    >
                      Helpful
                    </a>
                    <a
                      href="#"
                      class="pl-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      Report abuse
                    </a>
                  </div>
                </aside>
              </article>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default Review;
