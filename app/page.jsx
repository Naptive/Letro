"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { auth } from "@/config/FireBase";
import { Suspense, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "@/config/FireBase";

export default function Home() {
  const router = useRouter();
  const [authUser, setAuthUser] = useState(auth.currentUser);
  const [modalOpen, setModalOpen] = useState(false);
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setAuthUser(user);
    });

    return () => {
      unsubscribe(); // Cleanup the listener on unmount
    };
  }, []);

  useEffect(() => {
    const cleanUp = onSnapshot(
      collection(db, "ProductInformation"),
      (querySnapshot) => {
        const FilterdInfo = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log(FilterdInfo);
        if (FilterdInfo.length > 0) {
          setProductData(FilterdInfo);
          console.log(FilterdInfo); // Set to the first item in the array
        }
      }
    );
    return () => cleanUp(); // Unsubscribe the listener when the component unmounts
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("logged out");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <main className="flex scroll-smooth hide-scrollbar overflow-y-scroll h-screen relative top-0 left-0 bg-[#f4f4f4] space-y-4 pt-[4em] text-black flex-col items-center justify-start pl-2 font-sans">
      <header className="w-full backdrop-blur-lg  fixed top-0 flex p-2 px-4 shadow-md h-[64px] z-20">
        <nav className="w-1/2 flex items-center text-[34px] font-medium">
          Letro
        </nav>
        <nav className="w-1/2 flex items-center justify-end">
          <div
            onClick={() => {
              if (authUser) {
                setModalOpen(modalOpen === false ? true : false);
              } else {
                router.push("/LogIn");
              }
            }}
            className="bg-gray-300 h-[45px] absolute right-[-6px] rounded-l-full w-[70px] p-1"
          >
            <div className="h-full">
              {authUser === null ? (
                "signIn"
              ) : (
                <Image
                  src={authUser?.photoURL}
                  alt="w"
                  height={40}
                  width={40}
                  className="h-full w-auto object-contain rounded-full"
                />
              )}
            </div>
          </div>
        </nav>
      </header>

      <div
        onClick={() => {
          setModalOpen(false);
        }}
        className={`${
          modalOpen === false ? "hidden" : "block"
        } w-screen h-screen fixed bottom-0 left-0 z-10`}
      >
        <div className="absolute top-[68px] flex flex-col justify-between h-[20em] w-[15em] p-2 right-6 bg-white shadow-2xl">
          <div className="flex items-center gap-2">
            <Image
              src={authUser?.photoURL}
              alt="user image"
              height={35}
              width={35}
              className="rounded-full h-[40px] w-auto object-contain"
            />
            <div>
              <h1 className="font-medium">{authUser?.displayName}</h1>
              <h2 className="text-[15px]">{authUser?.email}</h2>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full h-12 bg-blue-700 rounded-lg text-white"
          >
            Sign Out
          </button>
        </div>
      </div>

      <section className="w-full hide-scrollbar min-h-[50px] flex items-center text-white space-x-2">
        <button className="min-w-[3.8em] h-[2.5em] bg-blue-700 hover:bg-blue-800 rounded-lg ">
          All
        </button>
        <button className="min-w-[5em] min-h-[2.5em] bg-blue-700 hover:bg-blue-800 rounded-lg ">
          Phone
        </button>
        <button className="min-w-[5em] min-h-[2.5em] bg-blue-700 hover:bg-blue-800 rounded-lg ">
          Laptop
        </button>
        <button className="min-w-[5em] min-h-[2.5em] bg-blue-700 hover:bg-blue-800 rounded-lg ">
          Tablet
        </button>
      </section>

      <div className=" absolute right-[-1px] top-[4em] bg-gradient-to-r from-transparent to-white h-[50px] w-[3rem]"></div>

      <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
          <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            We invest in the world’s potential
          </h1>
          <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
            Unveil the Ultimate Audio Journey: Discover Our Cutting-Edge
            Headphone Collection. Elevate Your Sound Experience Today!.
          </p>
          <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <a
              href="#"
              class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              Get started
              <svg
                class="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
            <a
              href="#"
              class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Learn more
            </a>
          </div>
        </div>
      </section>

      <section className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
       
          {productData.map((product) => (
            <div
              key={product.title}
              class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#" className="flex justify-center items-center">
                <Image
                  className="p-8 rounded-t-lg"
                  src="/Testing/HeadPhonesP.webp"
                  alt="product image"
                  width={300}
                  height={300}
                />
              </a>
              <div class="px-5 pb-5">
                <a href="#">
                  <h5 class="text-xl min-h-[56px] line-clamp-2 font-semibold tracking-tight text-gray-900 dark:text-white">
                    {product.title}
                  </h5>
                </a>
                <div class="flex items-center mt-2.5 mb-5">
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
                    class="w-4 h-4 text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                    5.0
                  </span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-2xl font-bold text-gray-900 dark:text-white">
                    R{product.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </section>
    </main>
  );
}
