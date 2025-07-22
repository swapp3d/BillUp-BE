import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-gray-200 px-4 py-3 flex gap-4 items-center shadow">
            <Link href="/" className="font-bold text-lg text-blue-700">BillUp</Link>
            <Link href="/login" className="hover:underline">Login</Link>
            <Link href="/registration" className="hover:underline">Register</Link>
            {/* Add more links as needed, like /account, /dashboard, etc. */}
        </nav>
    );
}