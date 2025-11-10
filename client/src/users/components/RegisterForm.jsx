import React from 'react'

function RegisterForm() {
    return (
        <form className='h-[40vh] max-w-md border border-black rounded-md bg-white flex-col flex items-center justify-center gap-5'>
            <input type="text" placeholder="Username" className='w-[85%] border rounded-md' />
            <input type="email" placeholder="Email" className='w-[85%] border rounded-md' />
            <input type="password" placeholder="Password" className='w-[85%] border rounded-md' />
            <button type="submit" className='w-[85%] py-2 bg-blue-500 text-white rounded-md'>Register</button>
        </form>
    )
}

export default RegisterForm