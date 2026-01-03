import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById } from '../../users/services/usersApiService';

function UserProfile() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [profileUser, setProfileUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await getUserById(userId);
                setProfileUser(response.data); // axios returns data in response.data

            } catch (err) {
                console.error('Error fetching user:', err);
                setError(err.response?.data?.message || 'Failed to load user profile');
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUser();
        }
    }, [userId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-lg">Loading profile...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen gap-4">
                <div className="text-red-500 text-lg">{error}</div>
                <button
                    onClick={() => navigate(-1)}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Go Back
                </button>
            </div>
        );
    }

    if (!profileUser) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div>User not found</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold">
                {profileUser.name.first} {profileUser.name.last}
            </h1>
            <p className="text-gray-600">{profileUser.profession}</p>
            {/* Add rest of your profile UI here */}
        </div>
    );
}

export default UserProfile;