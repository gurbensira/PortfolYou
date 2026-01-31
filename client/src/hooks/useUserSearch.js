import { useState, useMemo } from 'react';

function useUserSearch(users) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) {
      return users;
    }

    const search = searchTerm.toLowerCase();

    return users.filter(user => {
      const firstName = user.name?.first?.toLowerCase() || '';
      const lastName = user.name?.last?.toLowerCase() || '';
      const fullName = `${firstName} ${lastName}`;
      const profession = user.profession?.toLowerCase() || '';
      const city = user.address?.city?.toLowerCase() || '';
      const country = user.address?.country?.toLowerCase() || '';
      
     
      const companyName = user.recruiterInfo?.companyName?.toLowerCase() || '';
      const industry = user.recruiterInfo?.industry?.toLowerCase() || '';

      return (
        firstName.includes(search) ||
        lastName.includes(search) ||
        fullName.includes(search) ||
        profession.includes(search) ||
        city.includes(search) ||
        country.includes(search) ||
        companyName.includes(search) ||
        industry.includes(search)
      );
    });
  }, [users, searchTerm]);

  const clearSearch = () => setSearchTerm('');

  return {
    searchTerm,
    setSearchTerm,
    filteredUsers,
    clearSearch,
    resultCount: filteredUsers.length,
    isSearching: searchTerm.trim() !== '',
  };
}

export default useUserSearch;