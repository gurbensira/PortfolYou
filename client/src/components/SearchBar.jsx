import React from 'react';
import { FaSearch } from 'react-icons/fa';

function SearchBar({ 
  value, 
  onChange, 
  onSubmit,
  placeholder = "Search...", 
  className = "" 
}) {
  const handleSubmit = (e) => {
    e.preventDefault(); // ← Prevents page reload
    if (onSubmit) {
      onSubmit(value);
    }
  };

  // ← NEW: Handler for clicking the search icon
  const handleIconClick = () => {
    if (onSubmit && value.trim()) {
      onSubmit(value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
      />
      
      {/* ← CHANGED: Make icon clickable */}
      <button
        type="button"
        onClick={handleIconClick}
        className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer'
      >
        <FaSearch />
      </button>
    </form>
  );
}

export default SearchBar;