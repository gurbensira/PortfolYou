import React from 'react'
import { useForm } from 'react-hook-form'
import { registerUser } from '../services/usersApiService'
import normalaizeUser from '../helpers/normalization/normalizeUser';

function RegisterForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const normalizedData = normalaizeUser(data);
            const response = await registerUser(normalizedData);
            console.log('Registration successful:', response);
            // Handle success
        } catch (error) {
            console.error('Registration failed:', error);
            // Handle error
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className='min-h-[40vh] max-w-md border border-gray-300 rounded-lg bg-white flex-col flex items-center justify-center gap-4 p-6 shadow-sm'>
            <input
                {...register("first", { required: true })}
                type="text"
                placeholder="First name"
                className='w-[85%] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <input
                {...register("middle")}
                type="text"
                placeholder="Middle name"
                className='w-[85%] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <input
                {...register("last", { required: true })}
                type="text"
                placeholder="Last name"
                className='w-[85%] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Email"
                className='w-[85%] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <input
                {...register("phone", {
                    required: true
                })}
                type="tel"
                placeholder="Phone (e.g., 050-123-4567)"
                className='w-[85%] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <input
                {...register("password", { required: true, minLength: 6 })}
                type="password"
                placeholder="Password"
                className='w-[85%] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <button type="submit" className='w-[85%] py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium cursor-pointer'>
                Submit
            </button>
        </form>
    )
}

export default RegisterForm