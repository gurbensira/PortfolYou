import React, { useState } from 'react'
import HeaderLink from './HeaderLink'
import ROUTES from '../../routes/routesDict'

function Header() {
    const [isOpen, setIsOpen] = useState(false)

    const navLinks = [
        { to: ROUTES.root, label: "Home" },
        { to: ROUTES.favorite, label: "Favorite" },
        { to: ROUTES.myProfile, label: "My profile" },
        { to: ROUTES.about, label: "About" },
        { to: ROUTES.login, label: "Login" },
        { to: ROUTES.register, label: "Register" },
        { to: ROUTES.sandbox, label: "SandBox" },
    ]

    return (
        <nav className='h-[8%] flex-shrink-0 w-full bg-green-200 sticky top-0 flex justify-evenly items-center'>
            <div className='px-4 w-full'>
                <button
                    className='md:hidden text-3xl'
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? '✕' : '☰'}
                </button>

                {/* Desktop */}
                <div className='hidden md:flex justify-evenly items-center gap-10'>
                    {navLinks.map((link) => (
                        <HeaderLink key={link.to} to={link.to} label={link.label} />
                    ))}
                </div>

                {/* Mobile */}
                {isOpen && (
                    <div className='absolute top-full left-0 w-full bg-green-200/90 md:hidden flex flex-col items-center gap-4 py-4 shadow-lg'>
                        {navLinks.map((link) => (
                            <HeaderLink key={link.to} to={link.to} label={link.label} />
                        ))}
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Header