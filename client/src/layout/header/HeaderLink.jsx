import React from 'react'
import { Link } from 'react-router-dom'

function HeaderLink({ to, label }) {
    return (
        <div>
            <Link to={to} className='hover:text-blue-500 hover:underline transition-colors' >
                {label}
            </Link>
        </div>
    )
}

export default HeaderLink