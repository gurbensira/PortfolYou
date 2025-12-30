import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../../users/services/usersApiService'
import UserCard from '../../users/components/UserCard'

function HomePage() {
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await getAllUsers();
                setAllUsers(response.data);
            } catch (err) {
                setError('Failed to load users');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

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
            <h1 className="text-3xl font-bold mb-8 text-center">Our Community</h1>
            <div className="flex flex-wrap gap-6 justify-center">
                {allUsers.map((user) => (
                    <UserCard key={user._id} user={user} />
                ))}
            </div>
        </div>
    )
}

export default HomePage