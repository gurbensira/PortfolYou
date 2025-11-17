import React from 'react'
import LoginForm from '../../users/components/LoginForm'


function LoginPage() {
    return (
        <div className='min-h-full w-full flex flex-col'>
            <h2 className='text-2xl py-5 text-center'>LoginPage</h2>
            <div className='h-full flex-1 flex justify-center items-center py-8'>
                <div className='h-full w-full max-w-md px-4'>
                    <LoginForm />
                </div>
            </div>

        </div>
    )
}

export default LoginPage