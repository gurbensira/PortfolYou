import React from 'react'
import { NavLink } from 'react-router-dom'

function HeaderLink({ to, label }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`
            }
        >
            {label}
        </NavLink>
    )
}

export default HeaderLink