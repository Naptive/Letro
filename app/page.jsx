import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-white space-y-4 pt-[6em] text-black flex-col items-center justify-start p-2 font-sans">
      <header className="w-full fixed top-0 flex p-2 px-4 shadow-md">
        <nav className="w-1/2 h-[64px] flex items-center text-[34px] font-medium">
          Letro
        </nav>
        <nav className="w-1/2 flex items-center justify-end">
          <div className="bg-gray-500 h-[50px] absolute right-[-6px] rounded-l-full w-[70px]"></div>
        </nav>
      </header>

      <div className="w-full text-white flex text-[21px] space-x-2 overflow-x-scroll">
        <button className="min-w-[3.8em] h-[2.5em] bg-sky-500 rounded-lg ">All</button>
        <button className="min-w-[5em] h-[2.5em] bg-sky-500 rounded-lg ">Phone</button>
        <button className="min-w-[5em] h-[2.5em] bg-sky-500 rounded-lg ">Laptop</button>
        <button className="min-w-[5em] h-[2.5em] bg-sky-500 rounded-lg ">Tablet</button>
        
      </div>

      <section className="w-full grid grid-cols-2 gap-2">
        <div className="h-min p-2 bg-gradient-to-br from-neutral-100 to-neutral-300 shadow-lg flex flex-col justify-start gap-2">
          <div className="h-[50%] flex justify-center items-center">
            <Image
              src={"/Testing/HeadPhonesP.webp"}
              alt="w"
              width={200}
              height={100}
              className="object-contain h-[135px]"
            />
          </div>
          <div>
            <h1 className="text-[28px] font-medium line-clamp-2 leading-tight">xl-3 Head-Wear Ultimate sound</h1>
            <h2 className="text-[28px] font-bold text-sky-500">R300</h2>
          </div>
        </div>

        <div className="h-min p-2 bg-gradient-to-br from-neutral-100 to-neutral-300 shadow-lg flex flex-col justify-start gap-2">
          <div className="h-[50%] flex justify-center items-center">
            <Image
              src={"/Testing/HeadPhones2.webp"}
              alt="w"
              width={200}
              height={100}
              className="object-contain h-[135px]"
            />
          </div>
          <div>
            <h1 className="text-[28px] font-medium line-clamp-2 leading-tight">xl-1 Head-Wear</h1>
            <h2 className="text-[28px] font-bold text-sky-500">R300</h2>
          </div>
        </div>

        
      </section>
    </main>
  );
}
