import React from 'react'
import { useForm } from 'react-hook-form'
import { useCurrentUser } from '../providers/UserProvider';
import { getUser, setTokenInLocalStorage } from '../services/localStorageService';
import { login } from '../services/usersApiService';
import { useNavigate } from 'react-router-dom';
import {useSnackbar} from '../../providers/SnackbarProvider'

function LoginForm() {
    const { setToken, setUser } = useCurrentUser();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, setError } = useForm();
    const { success, error } = useSnackbar();

    const onSubmit = async (user) => {
        try {
            const response = await login(user);
            setTokenInLocalStorage(response.data);
            setToken(response.data);
            setUser(getUser());
            success('Welcome back!');
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
            error('Login failed. Please check your credentials.');
            
            setError('root', {
                type: 'manual',
                message: error.response?.data || 'Login failed. Please check your credentials.'
            });
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className='min-h-[20vh] max-w-md border border-gray-300 rounded-lg bg-white flex-col flex items-center justify-center gap-4 p-6 shadow-sm'>

          
            {errors.root && (
                <div className="w-[85%] p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600 flex items-center">
                        <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.root.message}
                    </p>
                </div>
            )}

         
            <div className="w-[85%]">
                <input
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
                            message: "Please enter a valid email address"
                        }
                    })}
                    type="email"
                    placeholder="Email"
                    className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                />
                {errors.email && (
                    <p className="text-xs text-red-600 mt-1 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.email.message}
                    </p>
                )}
            </div>

        
            <div className="w-[85%]">
                <input
                    {...register("password", {
                        required: "Password is required"
                    })}
                    type="password"
                    placeholder="Password"
                    className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                />
                {errors.password && (
                    <p className="text-xs text-red-600 mt-1 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.password.message}
                    </p>
                )}
            </div>

          
            <button type="submit" className='w-[85%] py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium cursor-pointer'>
                Login
            </button>
        </form>
    )
}

export default LoginForm