import React from 'react'
import CreateProjectCardForm from '../../projectCards/components/CreateProjectCardForm'


function MyProfile() {
    return (
        <div className='min-h-full w-full flex flex-col'>
            <h2 className='text-2xl py-5 text-center'>MyProfile</h2>
            <div className='h-full flex-1 flex justify-center items-center py-8'>
                <div className='h-full w-full max-w-md px-4'>
                    <CreateProjectCardForm />
                </div>
            </div>

        </div>
    )
}

export default MyProfile