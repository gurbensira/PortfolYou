import { model, Schema } from "mongoose";
import { EMAIL, PHONE } from "../../helpers/mongooseValidators.js";
import { Address } from "../../helpers/submodels/Address.js";
import { Image } from "../../helpers/submodels/Image.js";
import { Name } from "../../helpers/submodels/Name.js";

const userSchema = new Schema({
  userType: {
  type: String,
  enum: ['regular', 'admin', 'recruiter'],
  default: 'regular',
},
  name: Name,
  phone: PHONE,
  email: EMAIL,
  profession: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  image: Image,
  address: Address,
  isAdmin: { type: Boolean, default: false },
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  
  recruiterInfo: {
  companyName: { type: String, trim: true },
  companyDescription: { type: String, trim: true },
  companyLogo: { type: String, default: "" },
  industry: { type: String, trim: true },
  companySize: {
    type: String,
    enum: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+', ''],
    default: '',
  },
  companyWebsite: { type: String, trim: true },
  jobTitle: { type: String, trim: true },
  yearsExperience: { type: Number, min: 0 },
  specializations: [{ type: String, trim: true }],
  linkedInProfile: { type: String, trim: true },
},
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = model("User", userSchema);

export default User;
