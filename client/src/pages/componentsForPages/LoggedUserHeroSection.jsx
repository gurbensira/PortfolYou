import React from 'react'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../routes/routesDict';

function LoggedUserHeroSection({ user }) {
    const navigate = useNavigate();

    // ← ADD: Safety check
    if (!user) {
        return null;
    }

    const timeOfDay = new Date().getHours();
    const greeting = timeOfDay < 12 ? 'Good morning' : timeOfDay < 18 ? 'Good afternoon' : 'Good evening';

    const followingCount = user.following?.length || 0;
    const followersCount = user.followers?.length || 0;

    return (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg overflow-hidden mb-12 relative">
            <div className="px-8 py-12 md:py-16 text-white">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-5xl font-bold mb-3">
                        {greeting}, {user.name?.first || 'there'}!
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100">
                        {followingCount > 0
                            ? `You're following ${followingCount} creative${followingCount === 1 ? '' : 's'}`
                            : 'Start building your creative network today'}
                    </p>
                </div>

                {/* Stats */}
                <div className="flex justify-center gap-8 md:gap-16 mb-8 flex-wrap">
                    <div className="text-center">
                        <p className="text-2xl md:text-3xl font-bold">{followingCount}</p>
                        <p className="text-blue-100 text-sm">Following</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl md:text-3xl font-bold">{followersCount}</p>
                        <p className="text-blue-100 text-sm">Followers</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 md:gap-4 justify-center flex-wrap">
                    <button
                        onClick={() => navigate(ROUTES.myProfile)}
                        className="bg-white text-blue-600 px-5 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-sm md:text-base cursor-pointer"
                    >
                        Go to your profile
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LoggedUserHeroSection