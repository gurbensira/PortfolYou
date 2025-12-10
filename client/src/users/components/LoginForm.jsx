import React from 'react'
import { useForm } from 'react-hook-form'
import { useCurrentUser } from '../providers/UserProvider';
import { getUser, setTokenInLocalStorage } from '../services/localStorageService';
import { login } from '../services/usersApiService';
import { useNavigate } from 'react-router-dom';

function LoginForm() {

    const { setToken, setUser, user } = useCurrentUser();
    const navigate = useNavigate();

    const onSubmit = async (user) => {
        try {
            const response = await login(user);
            setTokenInLocalStorage(response.data);
            setToken(response.data);
            setUser(getUser());
            navigate('/');
        } catch (error) {
            console.log(error);
            alert('The login failed');
        }
    }

    const { register, handleSubmit, formState: { errors } } = useForm();


    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className='min-h-[20vh] max-w-md border border-gray-300 rounded-lg bg-white flex-col flex items-center justify-center gap-4 p-6 shadow-sm'>
            <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Email"
                className='w-[85%] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <input
                {...register("password", { required: true, minLength: 6 })}
                type="password"
                placeholder="Password"
                className='w-[85%] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <button type="submit" className='w-[85%] py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium cursor-pointer'>
                Login
            </button>
        </form>
    )
}

export default LoginForm