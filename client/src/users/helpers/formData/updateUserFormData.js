const updateUserFormData = (userDetails) => {
    const formData = new FormData();


    if (userDetails.name?.first?.trim()) {
        formData.append('name[first]', userDetails.name.first.trim());
    }
    if (userDetails.name?.middle?.trim()) {
        formData.append('name[middle]', userDetails.name.middle.trim());
    }
    if (userDetails.name?.last?.trim()) {
        formData.append('name[last]', userDetails.name.last.trim());
    }

    
    if (userDetails.profession?.trim()) {
        formData.append('profession', userDetails.profession.trim());
    }

 
    if (userDetails.phone?.trim()) {
        formData.append('phone', userDetails.phone.trim());
    }

    
    if (userDetails.imageAlt?.trim()) {
        formData.append('image[alt]', userDetails.imageAlt.trim());
    }

    
    if (userDetails.image && userDetails.image[0]) {
        formData.append('image', userDetails.image[0]);
    }

  
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
    
    
    if (userDetails.address?.houseNumber) {
        const houseNum = typeof userDetails.address.houseNumber === 'string' 
            ? userDetails.address.houseNumber.trim() 
            : String(userDetails.address.houseNumber);
        
        if (houseNum) {
            formData.append('address[houseNumber]', houseNum);
        }
    }
    
  
    if (userDetails.address?.zip) {
        const zipCode = typeof userDetails.address.zip === 'string' 
            ? userDetails.address.zip.trim() 
            : String(userDetails.address.zip);
        
        if (zipCode) {
            formData.append('address[zip]', zipCode);
        }
    }

 
    if (userDetails.isBusiness !== undefined) {
        formData.append('isBusiness', userDetails.isBusiness);
    }

    return formData;
}

export default updateUserFormData;