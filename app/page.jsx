"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { auth } from "@/config/FireBase";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { onSnapshot, collection, } from "firebase/firestore";
import { db } from "@/config/FireBase";


export default function Home() {
  const router = useRouter();
  const [authUser, setAuthUser] = useState(auth.currentUser);
  const [modalOpen, setModalOpen] = useState(false)
  const [productData, setProductData] = useState([])
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
           setProductData(FilterdInfo)
           console.log(FilterdInfo);// Set to the first item in the array
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
    <main className="flex min-h-screen relative top-0 bg-white space-y-4 pt-[4em] text-black flex-col items-center justify-start p-2 font-sans">
      <header className="w-full fixed top-0 flex p-2 px-4 shadow-md h-[64px] z-20">
        <nav className="w-1/2 flex items-center text-[34px] font-medium">
          Letro
        </nav>
        <nav className="w-1/2 flex items-center justify-end">
          <div
            onClick={() => {
              if (authUser) {
                setModalOpen(modalOpen === false ? true : false)
              } else {router.push("/LogIn")}
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

      <div onClick={() => {setModalOpen(false)}} className={`${modalOpen === false ? "hidden" : "block"} w-screen h-screen fixed bottom-0 left-0 z-10`}>
            <div className="absolute top-[68px] flex flex-col justify-between h-[20em] w-[15em] p-2 right-6 bg-white shadow-2xl">
              <div className="flex items-center gap-2">
                <Image src={authUser?.photoURL} alt='user image' height={35} width={35} className="rounded-full h-[40px] w-auto object-contain"/>
                <div>
                <h1 className="font-medium">{authUser?.displayName}</h1>
                <h2 className="text-[15px]">{authUser?.email}</h2>
                </div>
              </div>

              <button onClick={logout} className="w-full h-10 bg-sky-500 rounded-lg text-white">Sign Out</button>
            </div>
      </div>

      <div className="w-full text-white flex text-[21px] space-x-2 overflow-x-scroll hide-scrollbar">
        <button className="min-w-[3.8em] h-[2.2em] bg-sky-500 rounded-lg ">
          All
        </button>
        <button className="min-w-[4.6em] h-[2.2em] bg-sky-500 rounded-lg ">
          Phone
        </button>
        <button className="min-w-[4.6em] h-[2.2em] bg-sky-500 rounded-lg ">
          Laptop
        </button>
        <button className="min-w-[4.6em] h-[2.2em] bg-sky-500 rounded-lg ">
          Tablet
        </button>
         
      </div>
      <div className=" absolute right-[-1px] top-[4em] bg-gradient-to-r from-transparent to-white h-[50px] w-[3rem]">

         </div>

      <section className="w-full grid grid-cols-2 gap-2">
      {productData.map((product) => (
        
          <div key={product.Title} className="max-h-[282px] p-2 bg-gradient-to-br from-neutral-100 to-neutral-300 shadow-lg flex flex-col justify-start gap-2 ">
          <div className="h-[45%] flex justify-center items-center">
            <Image
              src={"/Testing/HeadPhonesP.webp"}
              alt="w"
              width={200}
              height={100}
              className="object-contain h-full"
            />
          </div>
          <div className="flex flex-col h-[10em] justify-between">
            <h1 className="text-[20px] font-medium line-clamp-2 leading-tight">
              {product.title}
            </h1>
            <p className=" line-clamp-2">
              {product.description}
            </p>
            <h2 className="text-[24px] font-bold text-end text-sky-500">
              R{product.price}
            </h2>
          </div>
        </div>
        
      ))}
      </section>
    </main>
  );
}
