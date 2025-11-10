import React from 'react'

function Main({ children }) {
    return (
        <div className='flex-1 overflow-y-auto'>{children}</div>
    )
}

export default Main

// 'h-[84%] overflow-y-auto'