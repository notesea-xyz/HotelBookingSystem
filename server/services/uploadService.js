import cloudinary from '../config/cloudinary.js'

export const uploadImage = async (file, folder = 'hotel-booking') => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: folder,
      resource_type: 'auto',
    })

    return {
      url: result.secure_url,
      publicId: result.public_id,
    }
  } catch (error) {
    throw new Error('Image upload failed')
  }
}

export const uploadMultipleImages = async (files, folder = 'hotel-booking') => {
  try {
    const uploadPromises = files.map((file) =>
      cloudinary.uploader.upload(file.path, {
        folder: folder,
        resource_type: 'auto',
      })
    )

    const results = await Promise.all(uploadPromises)

    return results.map((result) => ({
      url: result.secure_url,
      publicId: result.public_id,
    }))
  } catch (error) {
    throw new Error('Multiple images upload failed')
  }
}

export const deleteImage = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    throw new Error('Image deletion failed')
  }
}
