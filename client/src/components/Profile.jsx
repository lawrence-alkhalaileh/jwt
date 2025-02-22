import PropTypes from 'prop-types';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function Profile({ setAuth }) {
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('http://localhost:5000/profile', { withCredentials: true });
                setUserPosts(response.data.posts);
            } catch (error) {
                console.error("Error fetching user posts:", error);
            }
        };

        checkAuth();
    }, []);


    async function logout() {

        try {
            const response = await axios.post('http://localhost:5000/auth/logout', {}, { withCredentials: true })
            toast.warning(response.data.message)
            setAuth(false)
        } catch (error) {
            console.error("Logout failed:", error);

        }
    }

    return (
        <>
            <div className="flex justify-start m-5">
                <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-4"
                >
                    Log out
                </button>
            </div>
            <div className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center mb-6">User Profile</h1>
                {userPosts.length > 0 ? (
                    userPosts.map(post => (
                        <div key={post.id} className="bg-white rounded-md p-4 mb-4 shadow-sm border border-gray-200">
                            <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
                            <p className="mt-2 text-gray-600">{post.content}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No posts available.</p>
                )}
            </div>
        </>
    );
}

Profile.propTypes = {
    setAuth: PropTypes.func.isRequired,
};