import React, { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getAllUsers } from '../../users/services/usersApiService'
import { recruiterService } from '../../users/services/recruitersApiService'
import UserCard from '../../users/components/UserCard'
import { useCurrentUser } from '../../users/providers/UserProvider';
import LoggedUserHeroSection from '../componentsForPages/LoggedUserHeroSection';
import HeroSection from '../componentsForPages/HeroSection';
import useUserSearch from '../../hooks/useUserSearch';
import useUserFilter from '../../hooks/useUserFilter';
import FilterBar from '../../components/FilterBar';

function HomePage() {
    const { user: currentUser } = useCurrentUser();
    const [searchParams] = useSearchParams();
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [usersToshow, setUsersToshow] = useState([])
    const [activeView, setActiveView] = useState('all');
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(null);
    
    const recruitersRef = useRef([]);
    const recruitersLoadedRef = useRef(false);

    const searchQuery = searchParams.get('search') || '';

    const {
        searchTerm,
        setSearchTerm,
        filteredUsers: searchedUsers,
        resultCount: searchResultCount,
        isSearching,
    } = useUserSearch(usersToshow);

    const {
        filters,
        updateFilter,
        clearFilters,
        filteredUsers: finalUsers,
        hasActiveFilters,
    } = useUserFilter(searchedUsers);

    useEffect(() => {
        setSearchTerm(searchQuery);
    }, [searchQuery, setSearchTerm]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);

                
                if (!recruitersLoadedRef.current) {
                    const recruitersResponse = await recruiterService.getAllRecruiters();
                    recruitersRef.current = recruitersResponse || [];
                    recruitersLoadedRef.current = true;
                }

              
                const developersResponse = await getAllUsers(page, 10);
                const developers = developersResponse.data.data;

                const developersWithType = developers.map(user => ({
                    ...user,
                    displayKey: `dev-${user._id}`
                }));

                const recruitersWithType = recruitersRef.current.map(user => ({
                    ...user,
                    displayKey: `rec-${user._id}`
                }));

               
                const combinedUsers = page === 1 
                    ? [...developersWithType, ...recruitersWithType]
                    : developersWithType;

                setAllUsers(combinedUsers);
                
                if (activeView === 'all') {
                    setUsersToshow(combinedUsers);
                }
                
                const originalPagination = developersResponse.data.pagination;
                const updatedPagination = {
                    ...originalPagination,
                    totalUsers: originalPagination.totalUsers + recruitersRef.current.length,
                };
                
                setPagination(updatedPagination);
            } catch (err) {
                setError('Failed to load users');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();

    }, [page, activeView]);

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
        setPage(1);
    };

    const handleShowFollowing = () => {
        if (currentUser?.following) {
            setUsersToshow(currentUser.following);
            setActiveView('following');
        }
    };

    const handleNextPage = () => {
        if (pagination?.hasMore) {
            setPage(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(prev => prev - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
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
            <div className='flex flex-col px-6'>
                {currentUser ? <LoggedUserHeroSection user={currentUser} /> : <HeroSection />}

                {isSearching && (
                    <div className="text-center mb-6">
                        <p className="text-lg text-gray-700">
                            Search results for <span className="font-semibold">"{searchTerm}"</span>
                        </p>
                        <p className="text-sm text-gray-600">
                            Found {searchResultCount} user{searchResultCount !== 1 ? 's' : ''}
                        </p>
                    </div>
                )}

                <div className='flex items-center justify-center gap-4 '>
                    <h2 onClick={handleShowAll} className={`text-xl sm:text-2xl md:text-3xl font-bold mb-8 text-center cursor-pointer transition-colors ${activeView === 'all' ? 'text-gray-800' : 'text-gray-400 hover:text-gray-600'
                        }`}>Our Community</h2>
                    <h2
                        onClick={handleShowFollowing}
                        className={`text-xl sm:text-2xl md:text-3xl font-bold mb-8 text-center cursor-pointer transition-colors ${activeView === 'following'
                            ? 'text-blue-600'
                            : 'text-gray-400 hover:text-blue-400'
                            }`}
                    >
                        Following
                    </h2>
                </div>

                <FilterBar
                    filters={filters}
                    updateFilter={updateFilter}
                    clearFilters={clearFilters}
                    hasActiveFilters={hasActiveFilters}
                    userCount={finalUsers.length}
                />
            </div>

            {finalUsers.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-600 text-lg">
                        {isSearching || hasActiveFilters
                            ? 'No users found matching your criteria'
                            : 'No users available'}
                    </p>
                    {(isSearching || hasActiveFilters) && (
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                clearFilters();
                            }}
                            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Clear Search & Filters
                        </button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 justify-items-center">
                    {finalUsers.map((user) => (
                        <UserCard key={user.displayKey || user._id} user={user} />
                    ))}
                </div>
            )}

            {activeView === 'all' && pagination && !isSearching && !hasActiveFilters && (
                <div className="flex justify-center items-center gap-4 mt-12 mb-8">
                    <button
                        onClick={handlePrevPage}
                        disabled={page === 1}
                        className={`px-6 py-2 rounded-lg font-medium transition-colors ${page === 1
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                            }`}
                    >
                        Previous
                    </button>

                    <span className="text-gray-700 font-medium">
                        Page {pagination.currentPage} of {pagination.totalPages}
                        <span className="text-gray-500 text-sm ml-2">
                            ({pagination.totalUsers} users total)
                        </span>
                    </span>

                    <button
                        onClick={handleNextPage}
                        disabled={!pagination.hasMore}
                        className={`px-6 py-2 rounded-lg font-medium transition-colors ${!pagination.hasMore
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                            }`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    )
}

export default HomePage