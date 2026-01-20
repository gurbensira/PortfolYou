// normalizeUserDataForForm.js
// This helper transforms user data from the API into the format expected by the form

const normalizeUserDataForForm = (userData) => {
    if (!userData) return null;

    return {
        name: {
            first: userData.name?.first || '',
            middle: userData.name?.middle || '',
            last: userData.name?.last || ''
        },
        phone: userData.phone || '',
        profession: userData.profession || '',
        imageAlt: userData.image?.alt || '',
        address: {
            state: userData.address?.state || '',
            country: userData.address?.country || '',
            city: userData.address?.city || '',
            street: userData.address?.street || '',
            // Convert to string in case it's stored as number
            houseNumber: userData.address?.houseNumber ? String(userData.address.houseNumber) : '',
            // Convert to string in case it's stored as number
            zip: userData.address?.zip ? String(userData.address.zip) : ''
        },
        isBusiness: userData.isBusiness || false,
        // Note: image file field is not included (file inputs can't be pre-populated)
    };
};

export default normalizeUserDataForForm;