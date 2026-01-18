import { model, Schema } from "mongoose";

const jobPostingSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 20,
  },
  requirements: [{
    type: String,
    trim: true,
  }],
  responsibilities: [{
    type: String,
    trim: true,
  }],
  techStack: [{
    type: String,
    trim: true,
  }],
  experienceLevel: {
    type: String,
    enum: ['Junior', 'Mid', 'Senior', 'Lead', 'Any'],
    required: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  locationType: {
    type: String,
    enum: ['Remote', 'Hybrid', 'On-site'],
    required: true,
  },
  salaryRange: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'USD',
    },
  },
  employmentType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
    required: true,
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  applicationUrl: {
    type: String,
    required: true,
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update timestamp on save
jobPostingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const JobPosting = model("JobPosting", jobPostingSchema);

export default JobPosting;