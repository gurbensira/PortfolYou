
import React from 'react';
import { useForm } from 'react-hook-form';
import { createCard } from '../helpers/services/projectCardApiService';
import createCardFormData from '../helpers/formData/createCardFormData';
import { useNavigate } from 'react-router-dom';

function CreateProjectCardForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const formData = createCardFormData(data);  // Clean and simple!
            const response = await createCard(formData);
            console.log('Card created successfully:', response);
            navigate('/');
        } catch (error) {
            console.error('Card creation failed:', error);
            alert('Failed to create card');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className='min-h-[40vh] max-w-md border border-gray-300 rounded-lg bg-white flex-col flex items-center justify-center gap-4 p-6 shadow-sm'>

            <input
                {...register("title", { required: true })}
                type="text"
                placeholder="Project Title"
                className='w-[85%] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {errors.title && <span className='text-red-500 text-sm w-[85%]'>Title is required</span>}

            <textarea
                {...register("description", { required: true })}
                placeholder="Project Description"
                rows="4"
                className='w-[85%] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
            />
            {errors.description && <span className='text-red-500 text-sm w-[85%]'>Description is required</span>}

            <input
                {...register("web")}
                type="url"
                placeholder="Project URL (optional)"
                className='w-[85%] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />

            <input
                {...register("imageAlt")}
                type="text"
                placeholder="Image description (optional)"
                className='w-[85%] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />

            <div className='w-[85%]'>
                <label className='block text-sm font-medium mb-2 text-gray-700'>Project Image</label>
                <input
                    {...register("image", { required: true })}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/svg+xml"
                    className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
                />
                {errors.image && <span className='text-red-500 text-sm'>Image is required</span>}
            </div>

            <button type="submit" className='w-[85%] py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium'>
                Create Project Card
            </button>
        </form>
    );
}

export default CreateProjectCardForm