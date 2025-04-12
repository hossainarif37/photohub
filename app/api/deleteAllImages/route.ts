import { NextResponse } from 'next/server';
import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

// Use a named export instead of default export
export async function POST(request: Request) {
    const { publicIds } = await request.json();

    if (!publicIds || !Array.isArray(publicIds)) {
        return NextResponse.json({ message: "Invalid publicIds" }, { status: 400 });
    }

    try {
        const result = await cloudinary.v2.api.delete_resources(publicIds);
        return NextResponse.json({ result });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}