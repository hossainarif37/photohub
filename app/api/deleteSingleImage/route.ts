// app/api/deleteSingleImage/route.ts
import { NextResponse } from 'next/server';
import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
    const { publicId } = await request.json();

    if (!publicId || typeof publicId !== 'string') {
        return NextResponse.json({ message: "Invalid publicId" }, { status: 400 });
    }

    try {
        const result = await cloudinary.v2.api.delete_resources([publicId]);
        return NextResponse.json({ result });
    } catch (err: any) {
        console.error("Error deleting image:", err);
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}