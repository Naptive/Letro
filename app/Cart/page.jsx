"use client";
import { auth } from "@/config/FireBase";
import { signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Cart() {
  let cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];

  const [authUser, setAuthUser] = useState(auth.currentUser);
  const [modalOpen, setModalOpen] = useState(false);
  const [amount, setAmount] = useState(1)
  const [searchOpen, setSearchOpen] = useState(false);
  const [inputValue, setInput] = useState("");
  const [searchData, setSearchData] = useState([]);
  const clear = () => {
    setInput("");
    setSearchData([]);
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
    setInput(i);
    const b = productData.filter((value) => {
      return value.title.toLowerCase().includes(i.toLowerCase());
    });
    if (i === "") {
      setSearchData([]);
    } else {
      setSearchData(b);
    }
  };

  return (
    <main className=" p-2 pt-[74px] space-y-2 bg-[#f4f4f4] relative h-screen w-full">
      <header className=" w-full backdrop-blur-lg  fixed top-0 left-0 flex p-2 px-4 shadow-md h-[64px] z-20">
        <nav className="w-1/2 flex items-center text-[34px] font-medium">
          Letro
        </nav>
        <nav className="w-1/2 flex items-center justify-end pr-14">
          <div
            onClick={() => setSearchOpen(!searchOpen ? true : false)}
            className="cursor-pointer"
          >
            <Image
              src={"/Icons/searchIcon.svg"}
              alt="search icon"
              width={30}
              height={30}
            />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              router.push("/Cart");
            }}
          >
            <Image
              src={"/Icons/goToCart.svg"}
              alt="link to page icon"
              width={30}
              height={30}
            />
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
            <div className="h-full cursor-pointer">
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
                  src={authUser?.photoURL || "/Testing/userPic.webp"}
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
        <div className="absolute top-[68px] flex flex-col justify-between h-[15em] w-[15em] p-2 right-6 bg-white shadow-2xl">
          <div className="flex items-center gap-2">
            <Image
              src={authUser?.photoURL || "/Testing/userPic.webp"}
              alt="user image"
              height={35}
              width={35}
              className="rounded-full h-[40px] w-auto object-contain"
            />
            <div>
              <h1 className="font-medium">{authUser?.displayName || ""}</h1>
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

      <section
        className={`${
          !searchOpen ? "hidden" : "fixed"
        } top-0 left-0 bg-[#f4f4f4] w-full z-40 h-full flex gap-2 flex-col items-center justify-start pt-[4.5em]`}
      >
        <nav className="bg-[#f4f4f4] absolute top-[-6px] pt-2 w-full h-[64px] flex items-center justify-evenly">
          <button
            onClick={() => {
              setSearchOpen(false);
              clear();
            }}
          >
            <Image
              src={"/Icons/LeftArow.svg"}
              alt="close search section"
              width={40}
              height={40}
            />
          </button>
          <input
            onChange={handleSearch}
            value={inputValue}
            type="text"
            placeholder="Search"
            className="bg-white shadow rounded-md border-none w-[238px] min-h-[50px]"
          />

          <button onClick={clear}>
            <Image
              src={"/Icons/Cross.svg"}
              alt="close search section"
              width={40}
              height={40}
            />
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

                  <h1>{product.title}</h1>
                </div>
              </Link>
            ))}
          </section>
        )}
      </section>

      <section className="w-full h-min grid grid-cols-1">
        {cartItems.map((cart) => (
          <div
            key={cart.id}
            className="h-[108px] flex m-2"
          >
            <Image
              src={cart.imageOne}
              alt={cart.title}
              width={100}
              height={100}
              className="h-full w-auto object-contain py-3"
            />
            <div className="py-4 px-3 relative">
              <h1 className="text-lg min-h-[56px] line-clamp-2 font-semibold leading-snug text-gray-900 dark:text-white">
                {cart.title}
              </h1>
              <h5 className="text-xl font-bold text-gray-900 dark:text-white">
                {cart.price}
              </h5>
              <div className=" absolute bottom-2 flex border items-center border-gray-300 right-3 ">
                   <button onClick={() => setAmount(amount - 1)} className="h-8 w-10 text-[18px]">-</button>
                   <h1 className="h-min text-[17px]">{amount}</h1>
                   <button onClick={() => setAmount(amount + 1)} className="h-8 w-10 text-[18px]">+</button>
              </div>
            </div>
          </div>
        ))}
      </section>

      <button className=" absolute bottom-4 w-[90%] left-1/2 rounded-lg transform -translate-x-1/2 bg-blue-700 text-white h-[48px]">Confirm Order</button>
    </main>
  );
}

export default Cart;
