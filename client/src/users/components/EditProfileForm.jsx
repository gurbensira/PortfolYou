// EditProfileForm.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import updateUserFormData from '../helpers/formData/updateUserFormData';
import normalizeUserDataForForm from '../helpers/formData/normalizeUserDataForForm';
import { useNavigate } from 'react-router-dom';
import { editUserProfile, getUserById } from '../services/usersApiService';
import { useSnackbar } from '../../providers/SnackbarProvider'; // ← ADD

function EditProfileForm({userId, onProfileUpdated }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { success, error } = useSnackbar();

    // Load existing user data when component mounts
    useEffect(() => {
        const loadUserData = async () => {
            try {
                setIsLoading(true);
                const response = await getUserById(userId);
                const userData = response.data;
                
                // Use helper to normalize data for form
                const formData = normalizeUserDataForForm(userData);
                reset(formData);
                
            } catch (error) {
                console.error('Error loading user data:', error);
                error('Failed to load profile data');
            } finally {
                setIsLoading(false);
            }
        };

        if (userId) {
            loadUserData();
        }
    }, [userId, reset, error]);

    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);
            
            // Use helper to prepare data for API
            const formData = updateUserFormData(data);
            const response = await editUserProfile(userId, formData);
            console.log('Profile updated successfully:', response);
            success('Profile updated successfully!');

            // If callback provided (used in MyProfile), call it
            if (onProfileUpdated) {
                onProfileUpdated();
            }

        } catch (error) {
            console.error('Profile update failed:', error);
            error('Failed to update profile. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="w-full text-center py-8">
                <p className="text-gray-600">Loading profile data...</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className='w-full border border-gray-300 rounded-lg bg-white flex-col flex items-center justify-center gap-4 p-6 shadow-sm'>

            {/* Name fields */}
            <div className='w-full'>
                <label className='block text-sm font-medium mb-2 text-gray-700'>Name</label>
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
            <div className='w-full'>
                <label className='block text-sm font-medium mb-2 text-gray-700'>Phone</label>
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
            </div>

            {/* Profession */}
            <div className='w-full'>
                <label className='block text-sm font-medium mb-2 text-gray-700'>Profession</label>
                <input
                    {...register("profession")}
                    type="text"
                    placeholder="Profession (e.g., Photographer, Designer)"
                    className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    disabled={isSubmitting}
                />
                {errors.profession && <span className='text-red-500 text-sm w-full'>{errors.profession.message}</span>}
            </div>

            {/* Address Section */}
            <div className='w-full border-t pt-4'>
                <label className='block text-sm font-medium mb-2 text-gray-700'>Address (optional)</label>
                <div className='grid grid-cols-2 gap-3'>
                    <input
                        {...register("address.street")}
                        type="text"
                        placeholder="Street"
                        className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        disabled={isSubmitting}
                    />
                    <input
                        {...register("address.houseNumber")}
                        type="text"
                        placeholder="House Number"
                        className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        disabled={isSubmitting}
                    />
                    <input
                        {...register("address.city")}
                        type="text"
                        placeholder="City"
                        className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        disabled={isSubmitting}
                    />
                    <input
                        {...register("address.state")}
                        type="text"
                        placeholder="State/Province"
                        className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        disabled={isSubmitting}
                    />
                    <input
                        {...register("address.country")}
                        type="text"
                        placeholder="Country"
                        className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        disabled={isSubmitting}
                    />
                    <input
                        {...register("address.zip")}
                        type="text"
                        placeholder="ZIP/Postal Code"
                        className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        disabled={isSubmitting}
                    />
                </div>
            </div>

            {/* Profile Image */}
            <div className='w-full border-t pt-4'>
                <label className='block text-sm font-medium mb-2 text-gray-700'>Profile Image</label>
                <input
                    {...register("image")}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/svg+xml"
                    className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
                    disabled={isSubmitting}
                />
                <p className="text-xs text-gray-500 mt-1">Leave empty to keep current image</p>
                
                <input
                    {...register("imageAlt")}
                    type="text"
                    placeholder="Image description (alt text)"
                    className='w-full border border-gray-300 rounded-md px-3 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
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