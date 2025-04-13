"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface UploadContextType {
    isUploaded: boolean;
    setIsUploaded: React.Dispatch<React.SetStateAction<boolean>>;
    isUploadOpen: boolean;
    setIsUploadOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UploadContext = createContext<UploadContextType | undefined>(undefined);

const UploadProvider = ({ children }: { children: ReactNode }) => {
    const [isUploaded, setIsUploaded] = useState(false);
    const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);

    return (
        <UploadContext.Provider value={{ isUploaded, setIsUploaded, isUploadOpen, setIsUploadOpen }}>
            {children}
        </UploadContext.Provider>
    );
};

export const useUpload = () => {
    const context = useContext(UploadContext);
    if (!context) {
        throw new Error("useUpload must be used within an UploadProvider");
    }
    return context;
};

export { UploadContext, UploadProvider };
