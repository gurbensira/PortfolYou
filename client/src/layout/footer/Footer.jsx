import React from 'react'
import { Link } from 'react-router-dom'
import ROUTES from '../../routes/routesDict'

function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className='w-full bg-gray-50 border-t border-gray-200 mt-auto'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
                <div className='flex flex-col md:flex-row justify-between items-center gap-4'>

                    <div className='text-sm text-gray-600'>
                        © {currentYear} PortfolYou. All rights reserved.
                    </div>

                    <div className='flex gap-6 text-sm'>
                        <Link
                            to={ROUTES.about}
                            className='text-gray-600 hover:text-gray-900 transition-colors'
                        >
                            About
                        </Link>
                        <Link
                            to={ROUTES.contactPage}
                            className='text-gray-600 hover:text-gray-900 transition-colors'
                        >
                            Contact
                        </Link>
                        {/* <a
                            href='#'
                            className='text-gray-600 hover:text-gray-900 transition-colors'
                        >
                            Privacy
                        </a> */}
                        {/* <a
                            href='#'
                            className='text-gray-600 hover:text-gray-900 transition-colors'
                        >
                            Terms
                        </a> */}
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer