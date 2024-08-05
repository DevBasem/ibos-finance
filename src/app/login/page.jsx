import Link from "next/link";

export default function Login() {
  return (
    <form action="/">
      <div>
        <h1 className="text-3xl font-semibold">Login</h1>
        <h2 className="text-xl font-medium">to get started</h2>
      </div>
      <div className="mt-12">
        <div className="flex flex-col gap-6">
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none md:w-[455px]"
              placeholder="itsnaeemanjum@gmail.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none md:w-[455px]"
              placeholder="Password"
              required
            />
          </div>
        </div>
        <div className="mt-6">
          <a href="/">Forgot Password?</a>
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
          <p>New User?</p>
          <Link className="font-semibold" href="/register">
            Register
          </Link>
        </div>
      </div>
    </form>
  );
}
