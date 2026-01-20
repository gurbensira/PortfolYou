import React from 'react';
import ROUTES from "../../routes/routesDict";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from '../providers/UserProvider';
import { useState } from 'react';
import { toggleFollowUser } from '../services/usersApiService';
import { useMemo } from 'react';
import { FaUser, FaBriefcase, FaStar } from 'react-icons/fa';

function UserCard({ user }) {
    const fullName = useMemo(() => {
        return `${user.name?.first || ''} ${user.name?.middle ? user.name.middle + ' ' : ''}${user.name?.last || ''}`.trim();
    }, [user.name]);
    const { followers } = user;
    const navigate = useNavigate();
    const { user: currentUser, refetchUser } = useCurrentUser(); // Get logged-in user
    const [isFollow, setIsFollow] = useState(() => {
        if (!currentUser?._id || !followers?.length) return false;

        return followers.some(follower => {
            const followerId = typeof follower === 'string' ? follower : follower._id;
            return followerId === currentUser._id;
        });
    });



    const handleClick = () => {
        // Check if this is the logged-in user's own card
        if (currentUser && currentUser._id === user._id) {
            navigate(ROUTES.myProfile); // Go to "My Profile" page
        } else {
            navigate(`${ROUTES.userProfile}/${user._id}`); // Go to public profile
        }

    };

    const handleClickFollowBtn = async (e) => {
        if (!currentUser) return;
        e.preventDefault();
        e.stopPropagation();
        if (user._id === currentUser._id) return;

        try {
            setIsFollow((prev) => !prev);
            await toggleFollowUser(user._id);
            await refetchUser(); // Refetch to get updated following list
        } catch (error) {
            setIsFollow((prev) => !prev);
            console.error('Failed to follow/unfollow:', error);
        }
    };

    return (
        
        <div className='w-[85%] sm:w-[250px] md:w-[280px] lg:w-[300px] bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden'>
            <div className="relative">
  {/* User Type Badge - Top Right Corner */}
  <div className="absolute top-2 right-2 z-10">
    {user.userType === 'recruiter' && (
      <div className="bg-purple-500 text-white rounded-full p-2" title="Recruiter">
        <FaBriefcase className="text-sm" />
      </div>
    )}
    {(user.userType === 'admin' || user.isAdmin) && (
      <div className="bg-yellow-500 text-white rounded-full p-2" title="Admin">
        <FaStar className="text-sm" />
      </div>
    )}
    {user.userType === 'regular' && (
      <div className="bg-blue-500 text-white rounded-full p-2" title="Developer">
        <FaUser className="text-sm" />
      </div>
    )}
  </div>
  
  {/* Rest of your existing UserCard content */}
</div>


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

                {/* Fpllow Button */}
                <button
                    onClick={handleClickFollowBtn}
                    className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-full hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                    {!isFollow ? 'Follow' : 'Unfollow'}
                </button>
            </div>
        </div>
    )
}

export default UserCard;