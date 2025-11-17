# PortfolYou - Registration Form TODO

## 🚨 BEFORE PRODUCTION - Critical Items

### Backend Validation (Make Fields Required Again)

#### Validation Constants (IMPORTANT!)
**File: `/server/validation/validationConstants.js` (or similar)**
- [ ] Change `DEFAULT_VALIDATION.required` from `false` to `true`
- [ ] Verify `PHONE.required` is set to `true`
- [ ] Verify `EMAIL.required` is `true` (already correct)
- [ ] Verify `URL.required` matches your needs

#### Mongoose Schema (User Model)
- [ ] Change `phone` field to `required: true`
- [ ] Change `address` object to `required: true`
- [ ] Change `address.country` to `required: true`
- [ ] Change `address.city` to `required: true`
- [ ] Change `address.street` to `required: true`
- [ ] Change `address.houseNumber` to `required: true`

#### Joi Validation Schema
- [ ] Change `phone` from `.allow()` to `.required()`
- [ ] Change `address` from `.allow()` to `.required()`
- [ ] Change `image` from `.allow()` to `.required()` (if needed for your app)

### Frontend Form - Add Missing Fields

#### Required Fields to Add
- [x] Add phone input field
  - [x] Add validation (Israeli phone format: `0[0-9]{1,2}-?\s?[0-9]{3}\s?[0-9]{4}`)
  - [ ] Add proper error messages
  
- [ ] Add address fields:
  - [ ] Country input
  - [ ] City input
  - [ ] Street input
  - [ ] House number input
  - [ ] State input (optional)
  - [ ] ZIP code input

- [ ] Add image fields (optional):
  - [ ] Image URL input
  - [ ] Image alt text input

- [ ] Add business account checkbox:
  - [ ] `isBusiness` boolean field

#### Form Improvements
- [ ] Add proper error display for validation errors
- [ ] Add loading state while submitting
- [ ] Add success message/redirect after registration
- [ ] Style error messages properly
- [ ] Add form reset after successful submission

### Testing Checklist
- [ ] Test registration with all required fields
- [ ] Test validation error messages display correctly
- [ ] Test phone number validation with valid Israeli numbers
- [ ] Test email validation
- [ ] Test password minimum length (6 characters)
- [ ] Test name fields validation (min 2 chars)
- [ ] Test that `middleName` can be empty
- [ ] Test address validation
- [ ] Test image URL validation (if required)

### Security & Best Practices
- [ ] Ensure passwords are hashed on backend
- [ ] Add password confirmation field to form
- [ ] Consider adding password strength indicator
- [ ] Add CSRF protection if not already implemented
- [ ] Review error messages don't leak sensitive info

---

## 📝 Notes

**Current State (Development):**
- Phone field: Optional (for testing)
- Address fields: Optional (for testing)
- Form only has: first name, middle name, last name, email, password

**Target State (Production):**
- Phone field: Required
- Address fields: Required
- Complete form with all fields and proper validation

**File Locations:**
- Frontend Form: `/src/components/RegisterForm.jsx` (or similar)
- Normalization: `/src/helpers/normalization/normalizeUser.js`
- Joi Schemas: `/server/validation/userValidationSchema.js`
- **Validation Constants: `/server/validation/validationConstants.js` ⚠️ KEY FILE**
- Mongoose Model: `/server/users/models/User.js` (or similar)

**⚠️ Important:** The `DEFAULT_VALIDATION` constant with `required: false` is likely used across multiple fields in your Mongoose schema. This is why many fields became optional. When you're ready for production, change this to `required: true` and it will cascade to all fields using this constant!

---

## 🎯 Quick Start After Current Testing

1. Add phone field to `RegisterForm.jsx`
2. Add address section to `RegisterForm.jsx`
3. Update Mongoose schema - make fields required
4. Update Joi schema - make fields required
5. Test complete registration flow
6. Deploy!

# PortfolYou - Login Form TODO

### Backend 

[] - make a login endpoint

### Frontend

- [] make onSubmit function in the form
- [] make login function in userApiService
