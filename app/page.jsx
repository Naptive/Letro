import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-white pt-[8em] text-black flex-col items-center justify-start p-2 font-sans">
      <header className="w-full fixed top-0 flex p-2 px-4 shadow-md">
        <nav className="w-1/2 h-[64px] flex items-center text-[34px] font-medium">
          Letro
        </nav>
        <nav className="w-1/2 flex items-center justify-end">
          <div className="bg-gray-500 h-[50px] absolute right-[-6px] rounded-l-full w-[70px]"></div>
        </nav>
      </header>

      <section className="w-full h-min grid grid-flow-row gap-2 p-2">
        <div className="w-full h-[10em] shadow-lg flex bg-gradient-to-br from-neutral-100 p-2 to-neutral-200">
          <div className="h-full w-[40%] bg-white">
            <Image
              src={"/Testing/HeadPhones2.webp"}
              alt="HeadPhones"
              width={160}
              height={30}
              className=" object-contain h-full"
            />
          </div>
          <div className="h-full w-[60%] p-2 px-4">
            <h1 className="text-[28px] font-medium">Title</h1>
            <p className="text-[20px] text-neutral-400 line-clamp-2">
              The ultimate Sound for your ears
            </p>
            <h2 className="text-[24px] text-end font-semibold">R299</h2>
          </div>
        </div>
      </section>

      <section className="w-full h-min overflow-x-scroll p-2 grid grid-flow-col gap-2">
        <div className="h-[15em] p-2 w-[15em] bg-gradient-to-br from-neutral-100 to-neutral-200 shadow-lg flex flex-col justify-start gap-2">
          <div className="h-[50%] flex justify-center items-center">
          <Image
            src={"/Testing/HeadPhonesP.webp"}
            alt="w"
            width={200}
            height={100}
            className="object-contain h-full"
          />
          </div>
          <div>
            <h1 className="text-[28px] font-medium">Title</h1>
            <p className=" line-clamp-2 text-[20px] pr-2 text-neutral-400">Best sound for the ears posable ulra experiance</p>
          </div>
        </div>
        
      </section>
    </main>
  );
}
