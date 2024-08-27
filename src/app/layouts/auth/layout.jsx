import Image from "next/image";
import "./auth.css"

export default function AuthLayout({ children }) {
  return (
    <main className="bg-main-light-primary dark:bg-main-dark-primary flex min-h-screen">
      <div className="flex flex-1 flex-col items-center justify-center bg-main-gradient xl:rounded-br-xl xl:rounded-tr-xl">
        <Image
          className="max-xl:-my-3 max-xl:mx-auto max-xl:w-40 max-sm:mt-1 w-auto h-auto"
          width={645}
          height={430}
          src="/images/main-vector.svg"
          alt="Finance image"
          priority
        />
        <div className="hidden rounded-3xl border-2 bg-white px-8 max-sm:px-4 py-12 max-xl:block max-md:w-[calc(100%-2rem)] max-sm:mb-4">
          {children}
        </div>
      </div>
      <div className="grid flex-1 place-content-center bg-main-light-primary dark:bg-main-dark-primary  py-4 max-xl:hidden">
        <div className="rounded-3xl border-2 dark:border-main-dark-secondary bg-main-light-primary dark:bg-main-dark-secondary dark:!text-white  px-8 py-12">
          {children}
        </div>
      </div>
    </main>
  );
}
