// MyProfile.jsx
import React, { useEffect, useState } from 'react';
import CreateProjectCardForm from '../../projectCards/components/CreateProjectCardForm';
import ProjectCard from '../../projectCards/components/ProjectCard';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../../users/providers/UserProvider';
import { getCardsByUserId } from '../../projectCards/services/projectCardApiService';
import { editUserProfile, getUserById } from '../../users/services/usersApiService';
import EditProfileForm from '../../users/components/EditProfileForm';

function MyProfile() {
    const { user: currentUser } = useCurrentUser();
    const navigate = useNavigate();

    const [profileData, setProfileData] = useState(null);
    const [userCards, setUserCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    useEffect(() => {
        // If not logged in, redirect to login
        if (!currentUser) {
            navigate('/login');
            return;
        }

        const fetchMyData = async () => {
            try {
                setLoading(true);

                // Fetch user profile and cards in parallel
                const [userResponse, cardsResponse] = await Promise.all([
                    getUserById(currentUser._id),
                    getCardsByUserId(currentUser._id)
                ]);

                setProfileData(userResponse.data);
                setUserCards(cardsResponse.data);

            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMyData();
    }, [currentUser, navigate]);

    // Refresh cards after creating a new one
    const handleCardCreated = async () => {
        try {
            const cardsResponse = await getCardsByUserId(currentUser._id);
            setUserCards(cardsResponse.data);
            setShowCreateForm(false); // Close the form
        } catch (error) {
            console.error('Error refreshing cards:', error);
        }
    };

    const handleUserEdit = async () => {
        try {
            const updateResponse = await getUserById(currentUser._id);
            setProfileData(updateResponse.data);
            setShowUpdateForm(false); // Close the form
        } catch (error) {
            console.error('Error refreshing cards:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="text-lg text-gray-600">Loading your profile...</div>
            </div>
        );
    }

    if (!profileData) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="text-gray-600">Profile not found</div>
            </div>
        );
    }

    const fullName = `${profileData.name?.first || ''} ${profileData.name?.middle ? profileData.name.middle + ' ' : ''}${profileData.name?.last || ''}`.trim();

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-6xl">

                {/* Profile Header Card */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                    {/* Cover Gradient */}
                    <div className="h-40 bg-gradient-to-r from-blue-500 to-purple-600"></div>

                    {/* Profile Info */}
                    <div className="px-6 pb-6">
                        {/* Profile Picture */}
                        <div className="-mt-20 mb-4 flex justify-between items-end">
                            <img
                                src={profileData.image?.url || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=random&size=200`}
                                alt={profileData.image?.alt || fullName}
                                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                            />

                            {/* Edit Profile Button */}
                            <button
                                onClick={() => setShowUpdateForm(!showUpdateForm)}
                            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                        >
                            {showCreateForm ? 'Cancel' : '+ Edit profile'}
                            </button>
                        </div>
                        {showUpdateForm && (
                        <div className="mb-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border-2 border-blue-200">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Edit profile</h3>
                                <button
                                    onClick={() => setShowUpdateForm(false)}
                                    className="text-gray-500 hover:text-gray-700 text-2xl font-light"
                                >
                                    ×
                                </button>
                            </div>
                            <EditProfileForm onProfileUpdated={handleUserEdit} userId={currentUser._id} />
                        </div>
                    )}

                        {/* Name */}
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            {fullName}
                        </h1>

                        {/* Profession */}
                        <p className="text-xl text-gray-600 mb-2">
                            {profileData.profession || 'Creative Professional'}
                        </p>

                        {/* Location */}
                        {profileData.address?.city && (
                            <p className="text-gray-500 flex items-center gap-1 mb-4">
                                <span>📍</span>
                                <span>
                                    {profileData.address.city}
                                    {profileData.address.country && `, ${profileData.address.country}`}
                                </span>
                            </p>
                        )}

                        {/* Personal Information */}
                        <div className="bg-gray-50 rounded-lg p-4 mt-4">
                            <h3 className="font-semibold text-gray-800 mb-3">Contact Information</h3>
                            <div className="space-y-2 text-sm">
                                <div>
                                    <span className="font-medium text-gray-700">Email:</span>
                                    <span className="ml-2 text-gray-600">{profileData.email}</span>
                                </div>
                                {profileData && (
                                    <div>
                                        <span className="font-medium text-gray-700">Phone:</span>
                                        <span className="ml-2 text-gray-600">{profileData.phone}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Portfolio Section */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">
                                My Portfolio
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                {userCards.length} {userCards.length === 1 ? 'project' : 'projects'}
                            </p>
                        </div>

                        {/* Add Project Button */}
                        <button
                            onClick={() => setShowCreateForm(!showCreateForm)}
                            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                        >
                            {showCreateForm ? 'Cancel' : '+ Add Project'}
                        </button>
                    </div>

                    {/* Create Card Form - Shows when button clicked */}
                    {showCreateForm && (
                        <div className="mb-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border-2 border-blue-200">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Create New Project</h3>
                                <button
                                    onClick={() => setShowCreateForm(false)}
                                    className="text-gray-500 hover:text-gray-700 text-2xl font-light"
                                >
                                    ×
                                </button>
                            </div>
                            <CreateProjectCardForm onCardCreated={handleCardCreated} />
                        </div>
                    )}

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
                                Click "Add Project" to create your first portfolio project
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MyProfile;