import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../../users/services/usersApiService'
import UserCard from '../../users/components/UserCard'
import { useCurrentUser } from '../../users/providers/UserProvider';

function HomePage() {
    const { user: currentUser } = useCurrentUser();
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [usersToshow, setUsersToshow] = useState([])
    const [activeView, setActiveView] = useState('all'); // Track active view


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await getAllUsers();
                setAllUsers(response.data);
                setUsersToshow(response.data)
            } catch (err) {
                setError('Failed to load users');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();

    }, [currentUser?._id]);

    // Silent refetch when following changes (no loading state)
    useEffect(() => {
        const silentRefetch = async () => {
            try {
                const response = await getAllUsers();
                setAllUsers(response.data);
                // Update usersToshow if we're in 'all' view
                if (activeView === 'all') {
                    setUsersToshow(response.data);
                }
            } catch (err) {
                console.error('Silent refetch failed:', err);
            }
        };

        // Only refetch if user is logged in and following array exists
        if (currentUser?.following) {
            silentRefetch();
        }
    }, [currentUser?.following, activeView]);

    // Update displayed users when view changes
    useEffect(() => {
        if (activeView === 'following' && currentUser?.following) {
            setUsersToshow(currentUser.following);
        } else if (activeView === 'all') {
            setUsersToshow(allUsers);
        }
    }, [activeView, allUsers, currentUser?.following]);

    const handleShowAll = () => {
        setUsersToshow(allUsers);
        setActiveView('all');
    };

    const handleShowFollowing = () => {
        if (currentUser?.following) {
            setUsersToshow(currentUser.following);
            setActiveView('following');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg">Loading users...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-8">
            <div className='flex items-center justify-center gap-4'>
                <h2 onClick={handleShowAll} className={`text-xl sm:text-2xl md:text-3xl font-bold mb-8 text-center cursor-pointer transition-colors ${activeView === 'all' ? 'text-gray-800' : 'text-gray-400 hover:text-gray-600'
                    }`}>Our Community</h2>
                <h2
                    onClick={handleShowFollowing}
                    className={`text-xl sm:text-2xl md:text-3xl font-bold mb-8 text-center cursor-pointer transition-colors ${activeView === 'following'
                        ? 'text-blue-600' // Active - blue
                        : 'text-gray-400 hover:text-blue-400' // Inactive - light gray
                        }`}
                >
                    Following
                </h2>
            </div>
            <div className="flex flex-wrap gap-6 justify-center">
                {usersToshow.map((user) => (
                    <UserCard key={user._id} user={user} />
                ))}
            </div>
        </div>
    )
}

export default HomePage