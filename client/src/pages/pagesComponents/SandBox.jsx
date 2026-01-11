import React from 'react'
import EditProfileForm from '../../users/components/EditProfileForm'

function SandBox() {
    return (
        <div className='min-h-screen w-full flex flex-col'>
            <h2>sandbox</h2>
            <div className='flex-row gap-5 min-h-screen w-full flex flex-col justify-center items-center'>
                <EditProfileForm/>
            </div>
        </div>
    )
}

export default SandBox