import { generateFileHash } from "@/utils/generateFileHash";

export const uploadToCloudinary = async (file: File) => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
        throw new Error("Cloudinary credentials not found");
    }

    const fileHash = await generateFileHash(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("public_id", fileHash);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
    });

    const data = await res.json();

    // If Cloudinary finds a duplicate, it still returns the existing URL
    return data.secure_url;
};
