import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


export default function Login({ setAuth }) {

    const [inputs, setInputs] = useState({ email: '', password: '' });

    const { email, password } = inputs

    const onChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                'http://localhost:5000/auth/login',
                { email, password },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            );

            if (response.data === "logged in") {
                toast.success("Log in successful!");
                setAuth(true)
            } else {
                toast.error(response.data)
            }

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h1>
                <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
                    <input
                        onChange={e => onChange(e)}
                        value={email}
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        onChange={e => onChange(e)}
                        value={password}
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-gray-600 text-center">
                    Don&apos;t have an account?{" "}
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>

    );
}


Login.propTypes = {
    setAuth: PropTypes.func.isRequired,
};
