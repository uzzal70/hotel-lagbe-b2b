export const viewImage = (
  imageUrl,
  setSelectedImage,
  setIsModalOpen,
  setLoading,
  token
) => {
  setSelectedImage(null);
  setIsModalOpen(true);
  setLoading(true); // Set loading state to true

  // console.log('Fetching image...');

  fetch(imageUrl, {
    headers: {
      Accept: 'application/octet-stream', // Expecting binary data (image, PDF, etc.)
      Authorization: `Bearer ${token}`, // Ensure the token is valid
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      return response.blob(); // Get the response as a blob (binary large object)
    })
    .then((blob) => {
      const objectURL = URL.createObjectURL(blob);
      setSelectedImage(objectURL); // Set selectedImage to the object URL once image is loaded
      setLoading(false); // Set loading state to false after image is loaded
    })
    .catch((error) => {
      console.error('Error fetching image:', error);
      setLoading(false); // Set loading state to false in case of error
    });
};
