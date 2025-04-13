"use client"

import React from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useUpload } from '@/providers/UploadProvider';

const EmptyImagePlaceholder = () => {
    const { setIsUploadOpen } = useUpload();
    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="mb-8">
                        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AddPhotoAlternateIcon className="w-10 h-10 text-blue-500" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">No Images Yet</h1>
                        <p className="text-gray-600 max-w-md mx-auto">
                            Start building your collection by uploading your first image
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="p-6 bg-gray-50 rounded-xl">
                            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <CloudUploadIcon className="w-6 h-6 text-green-500" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Easy Upload</h3>
                            <p className="text-sm text-gray-600">
                                Drag and drop or click to upload your images
                            </p>
                        </div>

                        <div className="p-6 bg-gray-50 rounded-xl">
                            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <LocalOfferIcon className="w-6 h-6 text-purple-500" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Auto Tagging</h3>
                            <p className="text-sm text-gray-600">
                                Images are automatically tagged for easy organization
                            </p>
                        </div>

                        <div className="p-6 bg-gray-50 rounded-xl">
                            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Share Easily</h3>
                            <p className="text-sm text-gray-600">
                                Share your images with anyone, anywhere
                            </p>
                        </div>
                    </div>

                    <button type="button" onClick={() => setIsUploadOpen(true)} className="px-6 py-3 bg-[#1976D2] text-white rounded-lg font-semibold hover:bg-[#1976D3]/90 hover:cursor-pointer transition-colors duration-200 inline-flex items-center gap-2">
                        <CloudUploadIcon className="w-5 h-5" />
                        Upload Your First Image
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EmptyImagePlaceholder;