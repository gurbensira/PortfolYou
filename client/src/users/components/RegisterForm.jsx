import React from 'react'
import { useForm } from 'react-hook-form'
import { login, registerUser } from '../services/usersApiService'
import createUserFormData from '../helpers/formData/createUserFormData';
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from '../providers/UserProvider';
import { getUser, setTokenInLocalStorage } from '../services/localStorageService';
import {useSnackbar} from '../../providers/SnackbarProvider'

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@%$#^&*\-_]).{8,}$/;

function RegisterForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { setToken, setUser } = useCurrentUser();
    const navigate = useNavigate();
    const { success, error } = useSnackbar();

    const onSubmit = async (data) => {
        try {
            const normalizedData = createUserFormData(data);
            const response = await registerUser(normalizedData);

            const loginData = {
                email: data.email,
                password: data.password
            };

            const loginResponse = await login(loginData);

            setTokenInLocalStorage(loginResponse.data);
            setToken(loginResponse.data);
            setUser(getUser());
success('Account created successfully! Welcome to PortfolYou!');
            navigate('/');

        } catch (error) {
            console.error('Registration failed:', error);
            error(err.response?.data || 'Registration failed. Please try again.');
            alert(error.response?.data);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className='min-h-[40vh] max-w-md border border-gray-300 rounded-lg bg-white flex-col flex items-center justify-center gap-4 p-6 shadow-sm'>

            {/* First Name */}
            <div className="w-[85%]">
                <input
                    {...register("first", {
                        required: "First name is required",
                        minLength: {
                            value: 2,
                            message: "First name must be at least 2 characters"
                        }
                    })}
                    type="text"
                    placeholder="First name"
                    className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${errors.first ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                />
                {errors.first && (
                    <p className="text-xs text-red-600 mt-1">{errors.first.message}</p>
                )}
            </div>

            {/* Middle Name */}
            <div className="w-[85%]">
                <input
                    {...register("middle")}
                    type="text"
                    placeholder="Middle name (optional)"
                    className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
            </div>

            {/* Last Name */}
            <div className="w-[85%]">
                <input
                    {...register("last", {
                        required: "Last name is required",
                        minLength: {
                            value: 2,
                            message: "Last name must be at least 2 characters"
                        }
                    })}
                    type="text"
                    placeholder="Last name"
                    className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${errors.last ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                />
                {errors.last && (
                    <p className="text-xs text-red-600 mt-1">{errors.last.message}</p>
                )}
            </div>

            {/* Profession */}
            <div className="w-[85%]">
                <input
                    {...register("profession", {
                        required: "Profession is required",
                        minLength: {
                            value: 2,
                            message: "Profession must be at least 2 characters"
                        }
                    })}
                    type="text"
                    placeholder="Profession"
                    className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${errors.profession ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                />
                {errors.profession && (
                    <p className="text-xs text-red-600 mt-1">{errors.profession.message}</p>
                )}
            </div>

            {/* Email */}
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
                    <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
                )}
            </div>

            {/* Phone */}
            <div className="w-[85%]">
                <input
                    {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                            value: /0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/,
                            message: "Please enter a valid phone number (e.g., 050-123-4567)"
                        }
                    })}
                    type="tel"
                    placeholder="Phone (e.g., 050-123-4567)"
                    className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                />
                {errors.phone && (
                    <p className="text-xs text-red-600 mt-1">{errors.phone.message}</p>
                )}
            </div>

            {/* Password */}
            <div className="w-[85%]">
                <input
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters"
                        },
                        pattern: {
                            value: passwordRegex,
                            message: "Password must contain at least 1 uppercase, 1 lowercase, 4 numbers, and 1 special character (!@%$#^&*-_)"
                        }
                    })}
                    type="password"
                    placeholder="Password"
                    className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                />
                {errors.password && (
                    <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>
                )}
                {/* Password Requirements Helper Text */}
                <div className="mt-2 p-2 bg-gray-50 rounded border border-gray-200">
                    <p className="text-xs text-gray-600 font-medium mb-1">Password must contain:</p>
                    <ul className="text-xs text-gray-600 space-y-0.5">
                        <li>• At least 8 characters</li>
                        <li>• 1 uppercase letter (A-Z)</li>
                        <li>• 1 lowercase letter (a-z)</li>
                        <li>• 1 number (0-9)</li>
                        <li>• 1 special character (!@%$#^&*-_)</li>
                    </ul>
                </div>
            </div>

            {/* Profile Image Alt */}
            <div className="w-[85%]">
                <input
                    {...register("imageAlt")}
                    type="text"
                    placeholder="Profile image description (optional)"
                    className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
            </div>

            {/* Profile Image Upload */}
            <div className='w-[85%]'>
                <label className='block text-sm font-medium mb-2 text-gray-700'>Profile Image (optional)</label>
                <input
                    {...register("image")}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/svg+xml"
                    className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
                />
            </div>

            {/* Submit Button */}
            <button type="submit" className='w-[85%] py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium cursor-pointer'>
                Submit
            </button>
        </form>
    )
}

export default RegisterForm