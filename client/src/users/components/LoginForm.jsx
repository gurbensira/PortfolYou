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
            className='h-[40vh] max-w-md border border-black rounded-md bg-white flex-col flex items-center justify-center gap-5'>
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
                Login
            </button>
        </form>
    )
}

export default LoginForm