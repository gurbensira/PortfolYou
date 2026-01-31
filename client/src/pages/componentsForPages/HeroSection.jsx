import React from 'react'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../routes/routesDict';

function HeroSection() {
    const navigate = useNavigate();

    return (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg overflow-hidden mb-12">
            <div className="px-8 py-16 text-white text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Welcome to PortfolYou
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 mb-6">
                    Showcase Your Work, Connect With Creatives
                </p>
                <p className="text-lg text-blue-50 max-w-3xl mx-auto mb-8">
                    Join thousands of developers, designers, and creators sharing their portfolios and building meaningful connections worldwide.
                </p>

                <div className="flex gap-4 justify-center flex-wrap">
                    <button
                        onClick={() => navigate(ROUTES.register)}
                        className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-base md:text-lg shadow-lg cursor-pointer"
                    >
                        Get Started Free
                    </button>
                    <button
                        onClick={() => navigate(ROUTES.login)}
                        className="bg-transparent text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors border-2 border-white text-base md:text-lg cursor-pointer"
                    >
                        Sign In
                    </button>
                </div>

                <p className="text-blue-100 text-sm mt-6">
                    No credit card required • Free forever
                </p>
            </div>
        </div>
    )
}

export default HeroSection