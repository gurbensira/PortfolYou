import React from 'react'
import { useForm } from 'react-hook-form'
import { registerUser } from '../services/usersApiService'

function RegisterForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await registerUser(data);
            console.log('Registration successful:', response);
            // Handle success
        } catch (error) {
            console.error('Registration failed:', error);
            // Handle error
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className='h-[40vh] max-w-md border border-black rounded-md bg-white flex-col flex items-center justify-center gap-5'>
            <input
                {...register("username", { required: true })}
                type="text"
                placeholder="Username"
                className='w-[85%] border rounded-md'
            />
            <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Email"
                className='w-[85%] border rounded-md'
            />
            <input
                {...register("password", { required: true, minLength: 6 })}
                type="password"
                placeholder="Password"
                className='w-[85%] border rounded-md'
            />
            <button type="submit" className='w-[85%] py-2 bg-blue-500 text-white rounded-md'>
                Submit
            </button>
        </form>
    )
}

export default RegisterForm