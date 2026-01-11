// EditProfileForm.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import updateUserFormData from '../helpers/formData/updateUserFormData';
import { useNavigate } from 'react-router-dom';
import { editUserProfile } from '../services/usersApiService';

function EditProfileForm({userId, onProfileUpdated }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);
            
            const formData = updateUserFormData(data);
            const response = await editUserProfile(userId, formData);
            console.log('Profile updated successfully:', response);

            // Reset the form
            reset();

            // If callback provided (used in MyProfile), call it
            if (onProfileUpdated) {
                onProfileUpdated();
            }

        } catch (error) {
            console.error('Profile update failed:', error);
            alert('Failed to update profile. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className='w-full border border-gray-300 rounded-lg bg-white flex-col flex items-center justify-center gap-4 p-6 shadow-sm'>

            {/* Name fields */}
            <div className='w-full'>
               
                <div className='flex gap-2'>
                    <div className='flex-1'>
                        <input
                            {...register("name.first")}
                            type="text"
                            placeholder="First Name"
                            className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            disabled={isSubmitting}
                        />
                        {errors.name?.first && <span className='text-red-500 text-sm'>{errors.name.first.message}</span>}
                    </div>
                    <div className='flex-1'>
                        <input
                            {...register("name.middle")}
                            type="text"
                            placeholder="Middle Name (optional)"
                            className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className='flex-1'>
                        <input
                            {...register("name.last")}
                            type="text"
                            placeholder="Last Name"
                            className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            disabled={isSubmitting}
                        />
                        {errors.name?.last && <span className='text-red-500 text-sm'>{errors.name.last.message}</span>}
                    </div>
                </div>
            </div>

            {/* Phone */}
            <input
                {...register("phone", { 
                   
                    pattern: {
                        value: /^0[0-9]{1,2}-?\s?[0-9]{3}\s?[0-9]{4}$/,
                        message: "Please enter a valid phone number"
                    }
                })}
                type="tel"
                placeholder="Phone (e.g., 050-1234567)"
                className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                disabled={isSubmitting}
            />
            {errors.phone && <span className='text-red-500 text-sm w-full'>{errors.phone.message}</span>}

            {/* Profession */}
            <input
                {...register("profession")}
                type="text"
                placeholder="Profession (e.g., Photographer, Designer)"
                className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                disabled={isSubmitting}
            />
            {errors.profession && <span className='text-red-500 text-sm w-full'>{errors.profession.message}</span>}

            {/* Profile Image */}
            <div className='w-full'>
                <label className='block text-sm font-medium mb-2 text-gray-700'>Profile Image (optional)</label>
                <input
                    {...register("image")}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/svg+xml"
                    className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
                    disabled={isSubmitting}
                />
            </div>

            <button
                type="submit"
                className='w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed'
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Updating...' : 'Update Profile'}
            </button>
        </form>
    );
}

export default EditProfileForm;