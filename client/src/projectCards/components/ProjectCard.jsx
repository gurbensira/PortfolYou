
import React, { useState } from 'react';
import { deleteCard } from '../services/projectCardApiService';
import { useCurrentUser } from '../../users/providers/UserProvider';
import EditProjectCardForm from './EditProjectCardForm';
import { useSnackbar } from '../../providers/SnackbarProvider';

function ProjectCard({ card, onCardDeleted, onCardUpdated, isOwner = false }) {
    const { user: currentUser } = useCurrentUser();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const { success, error, warning } = useSnackbar();

    // Check if current user owns this card
    const canModify = isOwner || (currentUser && card.user_id === currentUser._id);

    const handleDelete = async () => {
        // Double-check ownership
        if (!canModify) {
            warning("You don't have permission to delete this project");
            return;
        }

        // Confirm deletion
        const confirmDelete = window.confirm(
            `Are you sure you want to delete "${card.title}"? This action cannot be undone.`
        );

        if (!confirmDelete) return;

        try {
            setIsDeleting(true);
            await deleteCard(card._id);
            success('Project deleted successfully');
            
            // Call the callback to refresh the cards list
            if (onCardDeleted) {
                onCardDeleted(card._id);
            }
            
        } catch (error) {
            console.error('Error deleting project:', error);
            error(err.response?.data || 'Failed to delete project.');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleCardUpdated = () => {
        setIsEditing(false);
        if (onCardUpdated) {
            onCardUpdated();
        }
    };

    // If editing, show the edit form instead of the card
    if (isEditing) {
        return (
            <div className='w-full'>
                <EditProjectCardForm 
                    card={card}
                    onCardUpdated={handleCardUpdated}
                    onCancel={handleCancelEdit}
                />
            </div>
        );
    }

    // Normal card view
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
                        <a 
                            href={card.web}
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

            {/* Action Buttons - Only show if user owns the card */}
            <div className='flex w-full justify-end p-3 gap-2 border-t border-gray-100'>
                {canModify ? (
                    <>
                        {/* Edit Button */}
                        <button
                            onClick={handleEdit}
                            className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                            title="Edit project"
                        >
                           
                            <span>Edit</span>
                        </button>

                        {/* Delete Button */}
                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-md transition-colors ${
                                isDeleting
                                    ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                                    : 'text-red-600 hover:bg-red-50'
                            }`}
                            title={isDeleting ? 'Deleting...' : 'Delete project'}
                        >
                            <span className="material-symbols-outlined text-lg">delete</span>
                            <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
                        </button>
                    </>
                ) : (
                    // Show disabled buttons for non-owners
                    <>
                    <button
                        disabled
                        className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-300 bg-gray-50 rounded-md cursor-not-allowed"
                        title="You don't own this project"
                    >
                        <span>Edit</span>
                    </button>
                    <button
                        className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-300 bg-gray-50 rounded-md cursor-not-allowed"
                        title="You don't own this project"
                    >
                         <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default ProjectCard;

