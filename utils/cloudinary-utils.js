/**
 * Cloudinary Utilities
 * Helper functions untuk upload ke Cloudinary
 * TIDAK MENGUBAH konfigurasi Cloudinary yang sudah ada
 */

import { cloudinaryConfig } from '../config/cloudinary.js';

/**
 * Upload image to Cloudinary
 * @param {File} file - File object to upload
 * @param {Function} onProgress - Progress callback (optional)
 * @returns {Promise<string>} URL of uploaded image
 */
export async function uploadImage(file, onProgress) {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', cloudinaryConfig.uploadPreset);

    const xhr = new XMLHttpRequest();
    
    return new Promise((resolve, reject) => {
      // Progress tracking
      if (onProgress) {
        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            const percentComplete = (e.loaded / e.total) * 100;
            onProgress(percentComplete);
          }
        });
      }

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          resolve(response.secure_url);
        } else {
          reject(new Error('Upload failed'));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Network error'));
      });

      xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/auto/upload`);
      xhr.send(formData);
    });
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
}

/**
 * Validate image file
 * @param {File} file - File to validate
 * @param {Object} options - Validation options
 * @returns {boolean} Whether file is valid
 */
export function validateImageFile(file, options = {}) {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
  } = options;

  if (!file) {
    throw new Error('No file provided');
  }

  if (!allowedTypes.includes(file.type)) {
    throw new Error(`File type not allowed. Allowed types: ${allowedTypes.join(', ')}`);
  }

  if (file.size > maxSize) {
    throw new Error(`File size exceeds ${Math.round(maxSize / 1024 / 1024)}MB limit`);
  }

  return true;
}

/**
 * Preview image before upload
 * @param {File} file - Image file to preview
 * @returns {Promise<string>} Data URL of image
 */
export function previewImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
