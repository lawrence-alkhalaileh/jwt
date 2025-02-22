import { Link } from "react-router-dom";

export default function Notfound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
            <h1 className="text-6xl font-bold text-gray-800 animate-bounce">404</h1>
            <h2 className="text-2xl text-gray-600 mt-4">Oops! The page you&apos;re looking for doesn&apos;t exist.</h2>
            <p className="text-gray-500 mt-2">It might have been removed or had its name changed.</p>

            <Link to="/"
                className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg rounded-lg shadow-md transition duration-300">
                Go Back Home
            </Link>
        </div>
    );
}
