// ProjectCard.jsx
import React from 'react'

function ProjectCard({ card }) {
    return (
        <div className='w-full bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200'>
            {/* Project Image */}
            <div className="h-48 overflow-hidden bg-gray-200">
                <img
                    src={card.image?.url || card.image || 'https://via.placeholder.com/400x300?text=Project'}
                    alt={card.image?.alt || card.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Project Info */}
            <div className="p-4">
                {/* Title */}
                <h2 className='text-lg font-semibold text-gray-800 mb-2'>
                    {card.title || 'Untitled Project'}
                </h2>

                {/* Description */}
                <p className='text-sm text-gray-600 mb-3 line-clamp-3'>
                    {card.description || 'No description available'}
                </p>

                {/* Link */}
                {card.web && (
                    <div className='flex items-center gap-2 mt-auto'>
                        <span className='text-sm font-semibold text-gray-700'>Link:</span>

                        <a href={card.web}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-800 underline truncate"
                        >
                            {card.web.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                        </a>
                    </div>
                )}

                {/* Tags (if your cards have them) */}
                {card.tags && card.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {card.tags.slice(0, 3).map((tag, index) => (
                            <span
                                key={index}
                                className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div >
    )
}

export default ProjectCard

