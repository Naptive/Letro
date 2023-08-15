"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { auth } from "@/config/FireBase";
import { Suspense, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "@/config/FireBase";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [authUser, setAuthUser] = useState(auth.currentUser);
  const [modalOpen, setModalOpen] = useState(false);
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setSearchData] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false)
  const [inputValue, setInput] = useState('')
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setAuthUser(user);
    });

    return () => {
      unsubscribe(); // Cleanup the listener on unmount
    };
  }, []);

  useEffect(() => {
    const localStorageData = localStorage.getItem('firebaseData');
    if (localStorageData) {
      setProductData(JSON.parse(localStorageData));
      setIsLoading(false);
      console.log('Data loaded from local storage');
    } else {
      const cleanUp = onSnapshot(
        collection(db, "ProductInformation"),
        (querySnapshot) => {
          const FilterdInfo = querySnapshot.docs.map((doc) => ({ 
            ...doc.data(),
            id: doc.id,
          }));
          console.log(FilterdInfo);
          if (FilterdInfo.length > 0) {
            setIsLoading(false);
            setProductData(FilterdInfo)
            localStorage.setItem('firebaseData', JSON.stringify(FilterdInfo));
            console.log(`from database ${FilterdInfo}`); // Set to the first item in the array
          }
        }
      );
      // Unsubscribe the listener when the component unmounts
      return () => cleanUp();
    }
     
  }, []);

  const scrollToSection = () => {
    const targetSection = document.getElementById("targetSection");
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("logged out");
    } catch (error) {
      alert(error);
    }
  };

  const handleSearch = (e) => {
    const i = e.target.value;
    setInput(i)
    const b = productData.filter((value) => {
       return value.title.toLowerCase().includes(i.toLowerCase())
    })
    if (i === "") {
      setSearchData([])
    } else {
      setSearchData(b)
    }
  };

  const clear = () => {
      setInput("")
      setSearchData([])
  }

  return (
    <main className="flex scroll-smooth hide-scrollbar overflow-y-scroll overflow-x-hidden h-screen relative top-0 left-0 bg-[#f4f4f4] space-y-2 pt-[4.5em] text-black flex-col items-center justify-start pb-2 pl-2 pr-1 font-sans">
      <header className="w-full backdrop-blur-lg  fixed top-0 flex p-2 px-4 shadow-md h-[64px] z-20">
        <nav className="w-1/2 flex items-center text-[34px] font-medium">
          Letro
        </nav>
        <nav className="w-1/2 flex items-center justify-end pr-14">
          <div onClick={() => setSearchOpen(!searchOpen ? true : false)}>
            <Image src={'/Icons/searchIcon.svg'} alt="search icon" width={30} height={30}/>
          </div>
          <div
            onClick={() => {
              if (authUser) {
                setModalOpen(modalOpen === false ? true : false);
              } else {
                router.push("/LogIn");
              }
            }}
            className={`h-[45px] absolute right-[-6px] rounded-l-full w-[70px] p-1`}
          >
            <div className="h-full">
              {authUser === null ? (
                <Image
                  src={"/Icons/NoAuth.svg"}
                  alt="The Icon That Shows you are not Logged In"
                  height={40}
                  width={40}
                  className="h-full w-auto object-contain rounded-full"
                  priority
                />
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
            className="w-full h-10 bg-blue-700 rounded-lg text-white"
          >
            Sign Out
          </button>
        </div>
      </div>

      <section className={`${!searchOpen ? "hidden" : "fixed"} top-0 left-0 bg-[#f4f4f4] w-full z-40 h-full flex gap-2 flex-col items-center justify-start pt-[4.5em]`}>
        
        <nav className=" absolute top-0 w-full h-[64px] flex items-center justify-evenly">

          <button  onClick={() => {
            setSearchOpen(false)
            clear()
          }}>
            <Image src={'/Icons/LeftArow.svg'} alt="close search section" width={40} height={40}/>
          </button>
        <input
          onChange={handleSearch}
          value={inputValue}
          type="text"
          placeholder="Search"
          className="bg-white shadow rounded-md border-none w-[238px] min-h-[50px]"
        />

        <button onClick={clear}>
        <Image src={'/Icons/Cross.svg'} alt="close search section" width={40} height={40}/>
         </button>
        </nav>

        {searchData.length != 0 && (
          <section className="w-[90%] h-min flex flex-col gap-3 bg-white p-5 shadow-lg rounded-md">
            {searchData.map((product, vite) => (
              <Link key={vite} href={`/${product.id}`}>
              <div className="flex gap-4 items-center">
              <Image
                src={product.imageOne || "/Testing/HeadPhonesP.webp"}
                alt={product.title}
                width={50}
                height={50}
                className=" object-contain"
                priority
              />

              <h1>
                {product.title}
              </h1>
             
            </div>
              </Link>
            ))}
          </section>
        )}
      </section>

      <div className="w-full overflow-x-scroll p-0 hide-scrollbar min-h-[60px] flex items-center text-white space-x-2">
        <button className="min-w-[3.8em] h-[2.5em] bg-blue-700 hover:bg-blue-800 rounded-lg ">
          All
        </button>
        <button className="w-max whitespace-nowrap px-3 min-h-[2.5em] bg-blue-700 hover:bg-blue-800 rounded-lg ">
          Over-Ear
        </button>
        <button className="w-max whitespace-nowrap px-3 min-h-[2.5em] bg-blue-700 hover:bg-blue-800 rounded-lg ">
          Noise-Canceling
        </button>
        <button className="w-max whitespace-nowrap px-3 min-h-[2.5em] bg-blue-700 hover:bg-blue-800 rounded-lg ">
          Bluetooth
        </button>
        <button className="w-max whitespace-nowrap px-3 min-h-[2.5em] bg-blue-700 hover:bg-blue-800 rounded-lg ">
          Gaming
        </button>
      </div>

      <div className=" absolute right-[-2px] top-[4em] bg-gradient-to-r from-transparent to-[#f4f4f4] h-[65px] w-[4rem]"></div>

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
              onClick={scrollToSection}
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

      {isLoading ? (
        <section
          id="targetSection"
          className="w-full min-h-[24rem] max-h-none flex justify-center items-center"
        >
          <div role="status">
            <svg
              aria-hidden="true"
              class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </section>
      ) : (
        <section
          id="targetSection"
          className="w-full max-h-none grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
        >
          {productData.map((product) => (
            <Link href={`/${product.id}`} key={product.title}>
              <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#" className="flex justify-center items-center">
                  <Image
                    className="p-8 object-contain rounded-t-lg h-[160px] w-auto"
                    src={product.imageOne || "/Testing/HeadPhonesP.webp"}
                    alt="product image"
                    width={300}
                    height={300}
                    priority
                  />
                </a>
                <div class="px-5 pb-5">
                  <a href="#">
                    <h5 class="text-xl min-h-[56px] line-clamp-2 font-semibold tracking-tight text-gray-900 dark:text-white">
                      {product.title}
                    </h5>
                  </a>

                  <div class="flex items-center mt-2.5 mb-5">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <svg
                        key={index}
                        class={`w-4 h-4 ${
                          index < Math.floor(product.rating)
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
                      {product.rating}
                    </span>
                  </div>

                  <div class="flex items-center justify-between">
                    <span class="text-2xl font-bold text-gray-900 dark:text-white">
                      R{product.price}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </section>
      )}

      <Footer />
    </main>
  );
}
