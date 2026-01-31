import { useForm, useFieldArray } from 'react-hook-form';
import { FaPlus, FaMinus } from 'react-icons/fa';

function JobForm({ onSubmit, defaultValues, isLoading, submitText = 'Post Job' }) {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: defaultValues || {
      requirements: [''],
      responsibilities: [''],
      techStack: [''],
    }
  });

  const { fields: reqFields, append: appendReq, remove: removeReq } = useFieldArray({
    control,
    name: 'requirements'
  });

  const { fields: respFields, append: appendResp, remove: removeResp } = useFieldArray({
    control,
    name: 'responsibilities'
  });

  const { fields: techFields, append: appendTech, remove: removeTech } = useFieldArray({
    control,
    name: 'techStack'
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">Job Title *</label>
        <input
          type="text"
          {...register('title', { required: 'Required', minLength: 5 })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
          placeholder="e.g., Senior React Developer"
        />
        {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Job Description *</label>
        <textarea
          {...register('description', { required: 'Required', minLength: 20 })}
          rows="6"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
          placeholder="Describe the role and what makes this opportunity exciting..."
        />
        {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Requirements *</label>
        {reqFields.map((field, index) => (
          <div key={field.id} className="flex gap-2 mb-2">
            <input
              {...register(`requirements.${index}`, { required: index === 0 })}
              className="flex-1 px-4 py-2 border rounded-lg"
              placeholder={`Requirement ${index + 1}`}
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeReq(index)}
                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                <FaMinus />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendReq('')}
          className="mt-2 flex items-center gap-2 text-green-600 hover:text-green-800"
        >
          <FaPlus /> Add Requirement
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Responsibilities *</label>
        {respFields.map((field, index) => (
          <div key={field.id} className="flex gap-2 mb-2">
            <input
              {...register(`responsibilities.${index}`, { required: index === 0 })}
              className="flex-1 px-4 py-2 border rounded-lg"
              placeholder={`Responsibility ${index + 1}`}
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeResp(index)}
                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                <FaMinus />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendResp('')}
          className="mt-2 flex items-center gap-2 text-green-600 hover:text-green-800"
        >
          <FaPlus /> Add Responsibility
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Tech Stack *</label>
        {techFields.map((field, index) => (
          <div key={field.id} className="flex gap-2 mb-2">
            <input
              {...register(`techStack.${index}`, { required: index === 0 })}
              className="flex-1 px-4 py-2 border rounded-lg"
              placeholder={`Technology ${index + 1}`}
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeTech(index)}
                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                <FaMinus />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendTech('')}
          className="mt-2 flex items-center gap-2 text-green-600 hover:text-green-800"
        >
          <FaPlus /> Add Technology
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Experience Level *</label>
          <select
            {...register('experienceLevel', { required: 'Required' })}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Select level</option>
            <option value="Junior">Junior</option>
            <option value="Mid">Mid-level</option>
            <option value="Senior">Senior</option>
            <option value="Lead">Lead</option>
            <option value="Any">Any Level</option>
          </select>
          {errors.experienceLevel && <p className="text-red-600 text-sm mt-1">{errors.experienceLevel.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Employment Type *</label>
          <select
            {...register('employmentType', { required: 'Required' })}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Select type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
          {errors.employmentType && <p className="text-red-600 text-sm mt-1">{errors.employmentType.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Location *</label>
          <input
            type="text"
            {...register('location', { required: 'Required' })}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="e.g., Tel Aviv, Israel"
          />
          {errors.location && <p className="text-red-600 text-sm mt-1">{errors.location.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Location Type *</label>
          <select
            {...register('locationType', { required: 'Required' })}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Select type</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </select>
          {errors.locationType && <p className="text-red-600 text-sm mt-1">{errors.locationType.message}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Min Salary</label>
          <input
            type="number"
            {...register('salaryRange.min')}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Max Salary</label>
          <input
            type="number"
            {...register('salaryRange.max')}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Currency</label>
          <input
            type="text"
            {...register('salaryRange.currency')}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="USD"
            defaultValue="USD"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Application URL *</label>
        <input
          type="url"
          {...register('applicationUrl', { required: 'Required' })}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="https://company.com/apply/job-id"
        />
        {errors.applicationUrl && <p className="text-red-600 text-sm mt-1">{errors.applicationUrl.message}</p>}
        <p className="text-sm text-gray-500 mt-1">Where candidates should apply</p>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400"
      >
        {isLoading ? 'Processing...' : submitText}
      </button>
    </form>
  );
}

export default JobForm;