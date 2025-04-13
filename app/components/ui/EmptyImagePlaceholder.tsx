"use client"

import React from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useUpload } from '@/providers/UploadProvider';

const EmptyImagePlaceholder = () => {
    const { setIsUploadOpen } = useUpload();

    return (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 py-10">
            <div className="w-full max-w-4xl">
                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center">
                    <div className="mb-8">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AddPhotoAlternateIcon className="text-blue-500 text-3xl sm:text-4xl" />
                        </div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">No Images Yet</h1>
                        <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto">
                            Start building your collection by uploading your first image
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <div className="p-4 sm:p-6 bg-gray-50 rounded-xl">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <CloudUploadIcon className="text-green-500 text-xl" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2">Easy Upload</h3>
                            <p className="text-sm text-gray-600">
                                Drag and drop or click to upload your images
                            </p>
                        </div>

                        <div className="p-4 sm:p-6 bg-gray-50 rounded-xl">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <LocalOfferIcon className="text-purple-500 text-xl" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2">Auto Tagging</h3>
                            <p className="text-sm text-gray-600">
                                Images are automatically tagged for easy organization
                            </p>
                        </div>

                        <div className="p-4 sm:p-6 bg-gray-50 rounded-xl">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2">Share Easily</h3>
                            <p className="text-sm text-gray-600">
                                Share your images with anyone, anywhere
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsUploadOpen(true)}
                        className="text-sm md:text-base px-5 sm:px-6 py-2.5 sm:py-3 bg-[#1976D2] text-white rounded-lg font-semibold hover:bg-[#1976D3]/90 hover:cursor-pointer transition-colors duration-200 inline-flex items-center gap-2 whitespace-nowrap"
                    >
                        <CloudUploadIcon className="text-base sm:text-lg" />
                        <span className="truncate">Upload Your First Image</span>
                    </button>

                </div>
            </div>
        </div>
    );
};

export default EmptyImagePlaceholder;
