

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
     
            houseNumber: userData.address?.houseNumber ? String(userData.address.houseNumber) : '',
           
            zip: userData.address?.zip ? String(userData.address.zip) : ''
        },
        isBusiness: userData.isBusiness || false,
        
    };
};

export default normalizeUserDataForForm;