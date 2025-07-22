import Link from "next/link";

export default function Home() {
  return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="bg-white rounded-xl shadow-xl p-10 flex flex-col items-center gap-8 w-full max-w-md">
          <h1 className="text-3xl font-bold">Welcome to BillUp!</h1>
          <p className="text-gray-700 text-center">
            Pay all your bills in one place.<br />
            Sign in or create an account to get started.
          </p>
          <div className="flex gap-4 w-full">
            <Link
                href="/login"
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-center hover:bg-blue-700 transition"
            >
              Login
            </Link>
            <Link
                href="/registration"
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg text-center hover:bg-gray-300 transition"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
  );
}
