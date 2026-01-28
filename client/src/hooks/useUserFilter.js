import { useState, useMemo } from 'react';

function useUserFilter(users) {
  const [filters, setFilters] = useState({
    userType: '', // 'regular' or 'recruiter'
    city: '',
    sortBy: 'newest' // 'newest', 'oldest', 'mostFollowed'
  });

  const filteredAndSortedUsers = useMemo(() => {
    let result = [...users];

    // Filter by user type
    if (filters.userType) {
      result = result.filter(user => {
        if (filters.userType === 'regular') {
          // ← FIXED: Include users with userType 'regular' OR no userType (legacy users)
          return user.userType === 'regular' || !user.userType || user.userType === '';
        }
        return user.userType === filters.userType;
      });
    }

    // Filter by city
    if (filters.city) {
      result = result.filter(user =>
        user.address?.city?.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    // Sort
    switch (filters.sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'mostFollowed':
        result.sort((a, b) => (b.followers?.length || 0) - (a.followers?.length || 0));
        break;
      default:
        break;
    }

    return result;
  }, [users, filters]);

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      userType: '',
      city: '',
      sortBy: 'newest'
    });
  };

  return {
    filters,
    updateFilter,
    clearFilters,
    filteredUsers: filteredAndSortedUsers,
    hasActiveFilters: filters.userType || filters.city || filters.sortBy !== 'newest'
  };
}

export default useUserFilter;