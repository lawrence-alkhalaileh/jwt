import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'
import { Link } from "react-router-dom";

export default function Register({ setAuth }) {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        firstName: ""
    })

    function handleChange(e) {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const body = {
                email: inputs.email,
                password: inputs.password,
                name: inputs.firstName
            };

            await axios.post(
                'http://localhost:5000/auth/register',
                body,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            );

            toast.success("Registration successful!");
            setAuth(true)

        } catch (error) {
            if (error.response && error.response.data === "User already exists") {
                toast.error("User already exists");
            } else {
                toast.error("An error occurred during registration");
            }
            console.error(error);
        }
    }
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                <h1 className="mb-6 text-center text-2xl font-bold text-gray-700">Register</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        onChange={(e) => handleChange(e)}
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring"
                        value={inputs.email}
                    />
                    <input
                        onChange={(e) => handleChange(e)}
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring"
                        value={inputs.password}
                    />
                    <input
                        onChange={(e) => handleChange(e)}
                        type="text"
                        name="firstName"
                        placeholder="Your Name"
                        className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring"
                        value={inputs.firstName}
                    />
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-600 p-3 text-white hover:bg-blue-700"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-gray-600 text-center">
                    have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    )
}

Register.propTypes = {
    setAuth: PropTypes.func.isRequired,
};