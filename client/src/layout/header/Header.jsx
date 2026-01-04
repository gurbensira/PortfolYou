import React, { useState } from 'react'
import HeaderLink from './HeaderLink'
import ROUTES from '../../routes/routesDict'
import { useCurrentUser } from '../../users/providers/UserProvider';

function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const { setToken, setUser, user } = useCurrentUser();

    const handleLogout = () => {
        setToken(null)
        setUser(null)
        setIsOpen(false)
    }

    const navLinks = {
        left: [
            { to: ROUTES.root, label: "Home" },
            ...(user ? [
                { to: ROUTES.favorite, label: "Favorite" },
                { to: ROUTES.myProfile, label: "My profile" },
            ] : []),
            { to: ROUTES.about, label: "About" },
        ],
        right: user ? [

            { to: ROUTES.sandbox, label: "SandBox" },
        ] : [

            { to: ROUTES.login, label: "Login" },
            { to: ROUTES.register, label: "Register" },
        ]
    }

    const allLinks = [...navLinks.left, ...navLinks.right]

    return (
        <nav className='sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='h-16 flex justify-between items-center'>
                    {/* Logo/Brand */}
                    <div className='text-xl font-bold text-gray-800'>
                        PortfolYou
                    </div>

                    {/* Desktop Navigation */}
                    <div className='hidden md:flex items-center gap-1'>
                        {navLinks.left.map((link) => (
                            <HeaderLink key={link.to} to={link.to} label={link.label} />
                        ))}
                    </div>

                    <div className='hidden md:flex items-center gap-4'>
                        {navLinks.right.map((link) => (
                            <HeaderLink key={link.to} to={link.to} label={link.label} />
                        ))}

                        {/* Show Logout button when logged in */}
                        {user && (
                            <button
                                onClick={handleLogout}
                                className='px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors'
                            >
                                Logout
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className='md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors'
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? '✕' : '☰'}
                    </button>
                </div>
            </div>

            {/* Mobile dropdown */}
            {isOpen && (
                <div className='absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg md:hidden'>
                    <div className='px-4 py-4 space-y-3'>
                        {allLinks.map((link) => (
                            <div key={link.to} onClick={() => setIsOpen(false)}>
                                <HeaderLink to={link.to} label={link.label} />
                            </div>
                        ))}

                        {/* Show Logout button in mobile menu when logged in */}
                        {user && (
                            <button
                                onClick={handleLogout}
                                className='w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors'
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Header