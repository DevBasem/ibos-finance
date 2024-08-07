import Image from "next/image";

export default function AuthLayout({ children }) {
  return (
    <main className="flex min-h-screen">
      <div className="flex flex-1 flex-col items-center justify-center bg-main-gradient xl:rounded-br-xl xl:rounded-tr-xl">
        <Image
          className="max-xl:-my-3 max-xl:mx-auto max-xl:w-40 max-sm:mt-1"
          width={645}
          height={430}
          src="/images/main-vector.png"
          alt="Finance image"
          priority
        />
        <div className="hidden rounded-3xl border-2 bg-white px-8 py-12 max-xl:block max-md:w-[calc(100%-2rem)] max-sm:mb-4">
          {children}
        </div>
      </div>
      <div className="grid flex-1 place-content-center bg-[#F5F6FA] py-4 max-xl:hidden">
        <div className="rounded-3xl border-2 bg-white px-8 py-12">
          {children}
        </div>
      </div>
    </main>
  );
}
