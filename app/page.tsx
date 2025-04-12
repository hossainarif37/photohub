"use client";

import { useUpload } from "@/providers/UploadProvider";
import { Box, Container, Modal, Typography } from "@mui/material";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import ImageSkeleton from "./components/ui/ImageSkeleton";
import ImageCard from "./components/ui/ImageCard";

const HomePage = () => {
  const [uploadedItems, setUploadedItems] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { isUploaded } = useUpload();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("photoHubData") || "[]");
    setUploadedItems(data);
  }, [isUploaded]);

  const handleImageClick = (url: string) => {
    setSelectedImage(url);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  console.log('IsUpload', isUploaded);

  return (
    <Container>
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 4,
          }}
        >

          {uploadedItems.map((item, index) => (
            <ImageCard key={index} item={item} onClick={handleImageClick} />
          ))}

        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;