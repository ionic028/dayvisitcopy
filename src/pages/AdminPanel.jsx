// src/components/AdminLogin.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    

    const handleLogin = (e) => {
        e.preventDefault();

        // Check if credentials are correct (this is a simple example, replace with your own logic)
        if (username === 'a' && password === 'a') {
            localStorage.setItem('loggedInAdmin', true);
           toast.success("Your are Logged In Day Visit Dashboard");
            navigate('/dashboard'); // Redirect to dashboard upon successful login
        } else {
            toast('Invalid username or password');  
            
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center select-none justify-center bg-gray-50">     
             <div className='flex flex-col items-center gap-2'>
                <img className='w-10 h-10' src="public/tiger.webp" alt="" />
                <h1 className="text-2xl font-bold mb-6 uppercase text-gray-800">Day Visit</h1>
             </div>
            <div className="w-full max-w-sm bg-white  p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-md"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full p-3 border border-gray-300 rounded-md"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
