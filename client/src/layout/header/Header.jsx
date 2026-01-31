import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderLink from './HeaderLink'
import SearchBar from '../../components/SearchBar'
import ROUTES from '../../routes/routesDict'
import { useCurrentUser } from '../../users/providers/UserProvider';

function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('');
    const { setToken, setUser, user } = useCurrentUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        setToken(null)
        setUser(null)
        setIsOpen(false)
    }

    const handleSearch = (query) => {
        if (query.trim()) {
            navigate(`/?search=${encodeURIComponent(query.trim())}`);
            setSearchQuery('');
            setIsOpen(false);
        }
    };

    const navLinks = {
        left: [
            { to: ROUTES.root, label: "Home" },
            ...(user ? [
                
                { to: ROUTES.myProfile, label: "My profile" },
                { to: ROUTES.jobs, label: "Jobs" },
            ] : []),
            { to: ROUTES.about, label: "About" },
        ],
        right: user ? [
           
            ...(user?.userType === "recruiter" ? [{ to: ROUTES.recruiterDashboard, label: "Dashboard" }] : [])
        ] : [
            { to: ROUTES.login, label: "Login" },
            { to: ROUTES.register, label: "Register" },
        ]
    }

    const allLinks = [...navLinks.left, ...navLinks.right].filter(Boolean)

    return (
        <nav className='sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='h-16 flex justify-between items-center gap-4'>
                   
<a href="/">
                <div className='text-xl font-bold text-gray-800 flex items-center gap-2 flex-shrink-0'>
                    <img src="/icon.svg" alt="PortfolYou logo" className="w-8 h-8" />
                    <h2>PortfolYou</h2>
                </div></a>

                    <SearchBar
                        value={searchQuery}
                        onChange={setSearchQuery}
                        onSubmit={handleSearch}
                        placeholder="Search users..."
                        className='hidden md:block flex-1 max-w-md mx-4'
                    />

                    <div className='hidden md:flex items-center gap-1'>
                        {navLinks.left.map((link) => (
                            <HeaderLink key={link.to} to={link.to} label={link.label} />
                        ))}
                    </div>

                    <div className='hidden md:flex items-center gap-4'>
                       
                        {navLinks.right.filter(Boolean).map((link) => (
                            <HeaderLink key={link.to} to={link.to} label={link.label} />
                        ))}

                        {user && (
                            <button
                                onClick={handleLogout}
                                className='px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors'
                            >
                                Logout
                            </button>
                        )}
                    </div>

                  
                    <button
                        className='md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors'
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? '✕' : '☰'}
                    </button>
                </div>
            </div>

           
            {isOpen && (
                <div className='absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg md:hidden'>
                    <div className='px-4 py-4 space-y-3'>
                       
                        <SearchBar
                            value={searchQuery}
                            onChange={setSearchQuery}
                            onSubmit={handleSearch}
                            placeholder="Search users..."
                            className='mb-4'
                        />

                        {allLinks.map((link) => (
                            <div key={link.to} onClick={() => setIsOpen(false)}>
                                <HeaderLink to={link.to} label={link.label} />
                            </div>
                        ))}

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
