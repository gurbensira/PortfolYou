const createUserFormData = (userDetails) => {
    const formData = new FormData();


    formData.append('name[first]', userDetails.first);
    if (userDetails.middle) {
        formData.append('name[middle]', userDetails.middle);
    }
    formData.append('name[last]', userDetails.last);

    formData.append('phone', userDetails.phone);
    formData.append('email', userDetails.email);
    formData.append('password', userDetails.password);

    if (userDetails.imageAlt) {
        formData.append('image[alt]', userDetails.imageAlt);
    }
    if (userDetails.image && userDetails.image[0]) {
        formData.append('image', userDetails.image[0]);
    }

    if (userDetails.state) formData.append('address[state]', userDetails.state);
    if (userDetails.country) formData.append('address[country]', userDetails.country);
    if (userDetails.city) formData.append('address[city]', userDetails.city);
    if (userDetails.street) formData.append('address[street]', userDetails.street);
    if (userDetails.houseNumber) formData.append('address[houseNumber]', userDetails.houseNumber);
    if (userDetails.zip) formData.append('address[zip]', userDetails.zip);

    formData.append('isBusiness', userDetails.isBusiness || false);

    return formData;
}

export default createUserFormData;