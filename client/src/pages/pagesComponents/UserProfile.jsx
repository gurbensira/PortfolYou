import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById } from '../../users/services/usersApiService';
import { getCardsByUserId } from '../../projectCards/services/projectCardApiService';
import ProjectCard from '../../projectCards/components/ProjectCard';

function UserProfile() {
    const { userId } = useParams();
    const navigate = useNavigate();

    const [profileUser, setProfileUser] = useState(null);
    const [userCards, setUserCards] = useState([]); // Add state for cards
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch both user and cards in parallel
                const [userResponse, cardsResponse] = await Promise.all([
                    getUserById(userId),
                    getCardsByUserId(userId)
                ]);

                setProfileUser(userResponse.data);
                setUserCards(cardsResponse.data);

            } catch (err) {
                console.error('Error fetching user data:', err);
                setError(err.response?.data || 'Failed to load user profile');
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    // Loading state
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="text-lg text-gray-600">Loading profile...</div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 gap-4">
                <div className="text-red-500 text-lg">{error}</div>
                <button
                    onClick={() => navigate(-1)}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Go Back
                </button>
            </div>
        );
    }

    // No user found
    if (!profileUser) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="text-gray-600">User not found</div>
            </div>
        );
    }

    // Build full name
    const fullName = `${profileUser.name?.first || ''} ${profileUser.name?.middle ? profileUser.name.middle + ' ' : ''}${profileUser.name?.last || ''}`.trim();

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-6xl">

                {/* Profile Header Card */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                    {/* Cover Gradient */}
                    <div className="h-40 bg-gradient-to-r from-blue-500 to-purple-600"></div>

                    {/* Profile Info */}
                    <div className="px-6 pb-6">
                        {/* Profile Picture - overlaps the gradient */}
                        <div className="-mt-20 mb-4">
                            <img
                                src={profileUser.image?.url || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=random&size=200`}
                                alt={profileUser.image?.alt || fullName}
                                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                            />
                        </div>

                        {/* Name */}
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            {fullName}
                        </h1>

                        {/* Profession */}
                        <p className="text-xl text-gray-600 mb-2">
                            {profileUser.profession || 'Creative Professional'}
                        </p>

                        {/* Location */}
                        {profileUser.address?.city && (
                            <p className="text-gray-500 flex items-center gap-1">
                                <span>📍</span>
                                <span>
                                    {profileUser.address.city}
                                    {profileUser.address.country && `, ${profileUser.address.country}`}
                                </span>
                            </p>
                        )}

                        {/* Description (optional - for future use) */}
                        {profileUser.description && (
                            <div className="bg-gray-50 rounded-lg p-4 mt-4">
                                <p className="text-gray-700 leading-relaxed">
                                    {profileUser.description}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Portfolio Section */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Portfolio
                        </h2>
                        <span className="text-sm text-gray-500">
                            {userCards.length} {userCards.length === 1 ? 'project' : 'projects'}
                        </span>
                    </div>

                    {/* Projects Grid */}
                    {userCards.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {userCards.map((card) => (
                                <ProjectCard key={card._id} card={card} />
                            ))}
                        </div>
                    ) : (
                        // Empty state
                        <div className="text-center py-16">
                            <div className="text-gray-300 text-6xl mb-4">📁</div>
                            <p className="text-gray-500 text-lg font-medium">
                                No projects yet
                            </p>
                            <p className="text-gray-400 text-sm mt-2">
                                This user hasn't added any portfolio projects
                            </p>
                        </div>
                    )}
                </div>

                {/* Back Button */}
                <div className="mt-8 text-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                        ← Back to Users
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;