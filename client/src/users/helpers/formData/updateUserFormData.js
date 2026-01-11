const updateUserFormData = (userDetails) => {
    const formData = new FormData();

    // Name fields - only append if they have values
    if (userDetails.name?.first?.trim()) {
        formData.append('name[first]', userDetails.name.first.trim());
    }
    if (userDetails.name?.middle?.trim()) {
        formData.append('name[middle]', userDetails.name.middle.trim());
    }
    if (userDetails.name?.last?.trim()) {
        formData.append('name[last]', userDetails.name.last.trim());
    }

    // Profession - only append if it has a value
    if (userDetails.profession?.trim()) {
        formData.append('profession', userDetails.profession.trim());
    }

    // Phone - only append if it has a value
    if (userDetails.phone?.trim()) {
        formData.append('phone', userDetails.phone.trim());
    }

    // Image alt text - only append if it has a value
    if (userDetails.imageAlt?.trim()) {
        formData.append('image[alt]', userDetails.imageAlt.trim());
    }

    // Image file - only append if a file was selected
    if (userDetails.image && userDetails.image[0]) {
        formData.append('image', userDetails.image[0]);
    }

    // Address fields - only append if they have values
    if (userDetails.address?.state?.trim()) {
        formData.append('address[state]', userDetails.address.state.trim());
    }
    if (userDetails.address?.country?.trim()) {
        formData.append('address[country]', userDetails.address.country.trim());
    }
    if (userDetails.address?.city?.trim()) {
        formData.append('address[city]', userDetails.address.city.trim());
    }
    if (userDetails.address?.street?.trim()) {
        formData.append('address[street]', userDetails.address.street.trim());
    }
    if (userDetails.address?.houseNumber?.trim()) {
        formData.append('address[houseNumber]', userDetails.address.houseNumber.trim());
    }
    if (userDetails.address?.zip?.trim()) {
        formData.append('address[zip]', userDetails.address.zip.trim());
    }

    // isBusiness - only append if explicitly set
    if (userDetails.isBusiness !== undefined) {
        formData.append('isBusiness', userDetails.isBusiness);
    }

    return formData;
}

export default updateUserFormData;