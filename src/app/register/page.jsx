import Link from "next/link";

export default function Register() {
  return (
    <form action="/">
      <div>
        <h1 className="text-3xl font-semibold">Signup</h1>
        <h2 className="text-xl font-medium">to get started</h2>
      </div>
      <div className="mt-12">
        <div className="flex flex-col gap-6">
          <div>
            <input
              className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none md:w-[455px]"
              type="text"
              placeholder="Username"
            />
          </div>
          <div>
            <input
              className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none md:w-[455px]"
              type="text"
              placeholder="itsnaeemanjum@gmail.com"
            />
          </div>
          <div>
            <input
              className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none md:w-[455px]"
              type="password"
              placeholder="Password"
            />
          </div>
          <div>
            <input
              className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none md:w-[455px]"
              type="password"
              placeholder="Confirm Password"
            />
          </div>
        </div>
        <div className="mt-6 flex items-center gap-2">
          <label
            className="relative -mx-3 flex cursor-pointer items-center rounded-full p-3"
            htmlFor="checkbox-terms"
          >
            <input
              type="checkbox"
              className="border-blue-gray-200 peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-purple-500 checked:bg-purple-500 checked:before:bg-purple-500"
              id="checkbox-terms"
              required
            />
            <div className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </label>
          <a href="/">Agree to our terms and conditions</a>
        </div>
        <div className="mt-8">
          <button
            className="w-full rounded-lg bg-button-gradient p-4 text-white"
            name="submit"
            type="submit"
          >
            Continue
          </button>
        </div>
        <div className="mt-8 flex justify-center gap-1">
          <p>Already registered?</p>
          <Link className="font-semibold" href="/login">
            Login
          </Link>
        </div>
      </div>
    </form>
  );
}
