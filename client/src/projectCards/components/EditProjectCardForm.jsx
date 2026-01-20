// EditProjectCardForm.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { updateCard } from '../services/projectCardApiService';
import createCardFormData from '../helpers/formData/createCardFormData';

function EditProjectCardForm({ card, onCardUpdated, onCancel }) {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState(card.image?.url || '');
    const [keepExistingImage, setKeepExistingImage] = useState(true);

    // Pre-fill form with existing card data
    useEffect(() => {
        if (card) {
            setValue('title', card.title || '');
            setValue('description', card.description || '');
            setValue('web', card.web || '');
            setValue('imageAlt', card.image?.alt || '');
        }
    }, [card, setValue]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setKeepExistingImage(false);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);
            
            // Create FormData for the update
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('web', data.web || '');
            
            // Handle image
            if (data.image && data.image[0]) {
                // New image uploaded
                formData.append('image', data.image[0]);
                formData.append('image[alt]', data.imageAlt || data.title);
            } else if (keepExistingImage) {
                // Keep existing image
                formData.append('image[url]', card.image?.url || '');
                formData.append('image[alt]', data.imageAlt || card.image?.alt || '');
            }

            const response = await updateCard(card._id, formData);
            console.log('Card updated successfully:', response);

            // Call the callback to refresh the cards list
            if (onCardUpdated) {
                onCardUpdated();
            }

        } catch (error) {
            console.error('Card update failed:', error);
            alert(error.response?.data || 'Failed to update card. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className='w-full border border-gray-300 rounded-lg bg-white flex-col flex items-center justify-center gap-4 p-6 shadow-sm'>

            <div className='w-full flex justify-between items-center mb-2'>
                <h3 className='text-lg font-semibold text-gray-800'>Edit Project</h3>
                <button
                    type="button"
                    onClick={onCancel}
                    className='text-gray-500 hover:text-gray-700 text-2xl font-light'
                >
                    ×
                </button>
            </div>

            <input
                {...register("title", { required: "Title is required" })}
                type="text"
                placeholder="Project Title"
                className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                disabled={isSubmitting}
            />
            {errors.title && <span className='text-red-500 text-sm w-full'>{errors.title.message}</span>}

            <textarea
                {...register("description", { required: "Description is required" })}
                placeholder="Project Description"
                rows="4"
                className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
                disabled={isSubmitting}
            />
            {errors.description && <span className='text-red-500 text-sm w-full'>{errors.description.message}</span>}

            <input
                {...register("web")}
                type="url"
                placeholder="Project URL (optional)"
                className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                disabled={isSubmitting}
            />

            <input
                {...register("imageAlt")}
                type="text"
                placeholder="Image description (optional)"
                className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                disabled={isSubmitting}
            />

            <div className='w-full'>
                <label className='block text-sm font-medium mb-2 text-gray-700'>Project Image</label>
                
                {/* Current Image Preview */}
                {imagePreview && (
                    <div className='mb-3 relative'>
                        <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className='w-full h-48 object-cover rounded-md border border-gray-300'
                        />
                        <div className='absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded'>
                            {keepExistingImage ? 'Current Image' : 'New Image'}
                        </div>
                    </div>
                )}

                <input
                    {...register("image")}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/svg+xml"
                    onChange={handleImageChange}
                    className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
                    disabled={isSubmitting}
                />
                <p className='text-xs text-gray-500 mt-1'>Leave empty to keep current image</p>
            </div>

            <div className='w-full flex gap-3'>
                <button
                    type="button"
                    onClick={onCancel}
                    className='flex-1 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors font-medium'
                    disabled={isSubmitting}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className='flex-1 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed'
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Updating...' : 'Update Project'}
                </button>
            </div>
        </form>
    );
}

export default EditProjectCardForm;