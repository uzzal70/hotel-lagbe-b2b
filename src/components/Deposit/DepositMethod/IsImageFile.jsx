export const IsImageFile = (file) => {
  // Check if the file type starts with "image/"
  return file.type.startsWith('image/');
};
