const createCardFormData = (data) => {
    const formData = new FormData();

    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('web', data.web || '');

    if (data.imageAlt) {
        formData.append('image[alt]', data.imageAlt);
    }

    if (data.image && data.image[0]) {
        formData.append('image', data.image[0]);
    }

    return formData;
};

export default createCardFormData;