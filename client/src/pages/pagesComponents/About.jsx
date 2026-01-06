import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../../users/providers/UserProvider';

function About() {
    const navigate = useNavigate();
    const { user } = useCurrentUser();

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-5xl">

                {/* Hero Section */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg overflow-hidden mb-12">
                    <div className="px-8 py-16 text-white text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Welcome to PortfolYou
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 mb-6">
                            Your Digital Portfolio Platform
                        </p>
                        <p className="text-lg text-blue-50 max-w-3xl mx-auto">
                            Connect with creative professionals, showcase your work, and discover amazing projects from developers, designers, and creators worldwide.
                        </p>
                    </div>
                </div>

                {/* What is PortfolYou Section */}
                <div className="bg-white rounded-xl shadow-md p-8 mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">
                        What is PortfolYou?
                    </h2>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                        <p>
                            PortfolYou is a dynamic portfolio platform designed for creative professionals to showcase their work and connect with like-minded individuals. Whether you're a developer, designer, photographer, or any other creative professional, PortfolYou provides you with the tools to build your online presence and discover inspiring work from others.
                        </p>
                        <p>
                            Our platform combines the best aspects of social networking with professional portfolio management, allowing you to share your projects, follow other creators, and build a community around your craft.
                        </p>
                    </div>
                </div>

                {/* How to Use Section */}
                <div className="bg-white rounded-xl shadow-md p-8 mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">
                        How to Use PortfolYou
                    </h2>

                    <div className="space-y-8">
                        {/* Step 1 */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                                1
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    Create Your Account
                                </h3>
                                <p className="text-gray-600 mb-2">
                                    Sign up with your email, name, and professional information. Complete your profile with a photo, profession, and location to help others connect with you.
                                </p>
                                {!user && (
                                    <button
                                        onClick={() => navigate('/register')}
                                        className="text-blue-600 hover:text-blue-700 font-medium transition-colors cursor-pointer"
                                    >
                                        Get Started →
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                                2
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    Build Your Portfolio
                                </h3>
                                <p className="text-gray-600">
                                    Navigate to "My Profile" and click "Add Project" to create project cards. Each card can include a title, description, image, and external link to your work. Showcase your best projects to attract followers and opportunities.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                                3
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    Explore the Community
                                </h3>
                                <p className="text-gray-600">
                                    Browse the "Our Community" section on the homepage to discover other creative professionals. Click on user cards to view their profiles and portfolios. Find inspiration and connect with creators whose work resonates with you.
                                </p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                                4
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    Follow & Connect
                                </h3>
                                <p className="text-gray-600">
                                    Click the "Follow" button on user profiles to stay updated with their latest work. Switch between "Our Community" and "Following" views on the homepage to see either all users or just those you follow. Build your network strategically.
                                </p>
                            </div>
                        </div>

                        {/* Step 5 */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                                5
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    Manage Your Content
                                </h3>
                                <p className="text-gray-600">
                                    Update your profile anytime by clicking "Edit Profile" on your profile page. Edit or delete project cards to keep your portfolio current and relevant. Your profile is your digital business card - keep it fresh!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Project Cards Info */}
                <div className="bg-white rounded-xl shadow-md p-8 mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">
                        Creating Effective Project Cards
                    </h2>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                        <p>
                            Project cards are the heart of your PortfolYou portfolio. Each card represents a piece of work you want to showcase. To create compelling project cards:
                        </p>

                        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">📝</span>
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-2">Choose a Clear Title</h4>
                                    <p className="text-gray-600">
                                        Give your project a descriptive, memorable name that immediately conveys what it's about.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <span className="text-2xl">✏️</span>
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-2">Write a Compelling Description</h4>
                                    <p className="text-gray-600">
                                        Explain what the project does, what technologies you used, and what problems it solves. Keep it concise but informative.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <span className="text-2xl">🖼️</span>
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-2">Add Eye-Catching Images</h4>
                                    <p className="text-gray-600">
                                        Upload high-quality images or screenshots that showcase your work. Visual content helps your projects stand out.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <span className="text-2xl">🔗</span>
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-2">Include External Links</h4>
                                    <p className="text-gray-600">
                                        Add links to live demos, GitHub repositories, or detailed case studies so viewers can explore your work further.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <p>
                            You can edit or delete your project cards anytime from your profile page to keep your portfolio up to date with your latest and best work.
                        </p>
                    </div>
                </div>

                {/* Best Practices */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-md p-8 mb-8 border-2 border-blue-200">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">
                        💡 Best Practices
                    </h2>
                    <div className="space-y-3 text-gray-700">
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">✨</span>
                            <p><strong>Keep your profile complete:</strong> Add a professional photo, accurate location, and clear profession to help others find and connect with you.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">🔄</span>
                            <p><strong>Update regularly:</strong> Add new projects as you complete them and remove outdated work to keep your portfolio relevant.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">🎯</span>
                            <p><strong>Be selective:</strong> Quality over quantity - showcase your best work rather than everything you've ever created.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">🤝</span>
                            <p><strong>Engage authentically:</strong> Follow creators whose work genuinely interests you and whose style aligns with your professional goals.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">📍</span>
                            <p><strong>Provide context:</strong> Include details about your role, technologies used, and challenges overcome in each project description.</p>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-8 text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl text-blue-100 mb-6">
                        Join our community of creative professionals today!
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        {user ? (
                            <>
                                <button
                                    onClick={() => navigate('/my-profile')}
                                    className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg cursor-pointer"
                                >
                                    Go to My Profile
                                </button>
                                <button
                                    onClick={() => navigate('/')}
                                    className="px-8 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors cursor-pointer"
                                >
                                    Browse Community
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => navigate('/register')}
                                    className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg cursor-pointer"
                                >
                                    Create Account
                                </button>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="px-8 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors cursor-pointer"
                                >
                                    Sign In
                                </button>
                            </>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default About;