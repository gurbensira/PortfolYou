
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import createCardFormData from '../helpers/formData/createCardFormData';
import { useNavigate } from 'react-router-dom';
import { createCard } from '../services/projectCardApiService';
import {useSnackbar } from '../../providers/SnackbarProvider'

function CreateProjectCardForm({ onCardCreated }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { success, error } = useSnackbar();

    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);
            const formData = createCardFormData(data);
            const response = await createCard(formData);
            console.log('Card created successfully:', response);
            
            success('Project card created successfully!');
            reset();

          
            if (onCardCreated) {
                onCardCreated();
            } else {
            
                navigate('/');
            }

        } catch (error) {
            console.error('Card creation failed:', error);
            error('Failed to create project card. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className='w-full border border-gray-300 rounded-lg bg-white flex-col flex items-center justify-center gap-4 p-6 shadow-sm'>

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
                <input
                    {...register("image", { required: "Image is required" })}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/svg+xml"
                    className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
                    disabled={isSubmitting}
                />
                {errors.image && <span className='text-red-500 text-sm'>{errors.image.message}</span>}
            </div>

            <button
                type="submit"
                className='w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed'
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Creating...' : 'Create Project Card'}
            </button>
        </form>
    );
}

export default CreateProjectCardForm;