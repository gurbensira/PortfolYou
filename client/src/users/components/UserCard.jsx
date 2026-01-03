import React from 'react';
import ROUTES from "../../routes/routesDict";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from '../providers/UserProvider';

function UserCard({ user }) {
    const fullName = `${user.name?.first || ''} ${user.name?.middle ? user.name.middle + ' ' : ''}${user.name?.last || ''}`.trim();
    const navigate = useNavigate();
    const { user: currentUser } = useCurrentUser(); // Get logged-in user

    const handleClick = () => {
        // Check if this is the logged-in user's own card
        if (currentUser && currentUser._id === user._id) {
            navigate(ROUTES.myProfile); // Go to "My Profile" page
        } else {
            navigate(`${ROUTES.userProfile}/${user._id}`); // Go to public profile
        }
    };

    return (
        <div className='w-[85%] sm:w-[250px] md:w-[280px] lg:w-[300px] bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden'>
            {/* Profile Image Section */}
            <div className="h-32 bg-gradient-to-br from-blue-500 to-purple-600 relative">
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                    <img
                        src={user.image?.url || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(fullName) + '&background=random&size=200'}
                        alt={user.image?.alt || fullName}
                        className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md"
                    />
                </div>
            </div>

            {/* User Info Section */}
            <div className="pt-14 px-4 pb-4 text-center">
                <h2 className='text-xl font-bold text-gray-800'>{fullName}</h2>
                <p className='text-sm text-gray-500 mt-1'>{user.profession || 'Creative Professional'}</p>

                {user.address?.city && (
                    <p className='text-xs text-gray-400 mt-1'>
                        {user.address.city}{user.address.country ? `, ${user.address.country}` : ''}
                    </p>
                )}

                {/* View Profile Button */}
                <button
                    onClick={handleClick}
                    className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-full hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                    {currentUser && currentUser._id === user._id ? 'View My Profile' : 'View Profile'}
                </button>
            </div>
        </div>
    )
}

export default UserCard;