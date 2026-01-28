import React from 'react';
import { FaFilter, FaTimes } from 'react-icons/fa';

function FilterBar({ filters, updateFilter, clearFilters, hasActiveFilters, userCount }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FaFilter className="text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
          {userCount !== undefined && (
            <span className="text-sm text-gray-500">
              ({userCount} result{userCount !== 1 ? 's' : ''})
            </span>
          )}
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium"
          >
            <FaTimes />
            Clear Filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* User Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            User Type
          </label>
          <select
            value={filters.userType}
            onChange={(e) => updateFilter('userType', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Users</option>
            <option value="regular"   >Developers</option>
            <option value="recruiter">Recruiters</option>
          </select>
        </div>

        {/* City Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location / City
          </label>
          <input
            type="text"
            value={filters.city}
            onChange={(e) => updateFilter('city', e.target.value)}
            placeholder="Enter city name..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Sort Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilter('sortBy', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="mostFollowed">Most Followed</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;