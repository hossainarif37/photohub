"use client";
import { useUpload } from "@/providers/UploadProvider";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ImageCard from "./components/ui/ImageCard";
import { getPublicIdFromUrl } from "@/utils/getPublicIdFromUrl";

const HomePage = () => {
  const [uploadedItems, setUploadedItems] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { isUploaded } = useUpload();
  const [isLoading, setIsLoading] = useState(false);

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

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = async () => {
    setIsLoading(true);
    // Retrieve the data from localStorage
    const data = JSON.parse(localStorage.getItem("photoHubData") || "[]");

    // Extract the public IDs from the image URLs
    const publicIds = data
      .map((item: any) => getPublicIdFromUrl(item.image))
      .filter(Boolean);

    try {
      // Make API call to delete images from Cloudinary
      await fetch("/api/deleteAllImages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicIds }),
      });

      // Clear the localStorage and reset state
      localStorage.removeItem("photoHubData");
      setUploadedItems([]);
      setOpenDialog(false);
    } catch (err) {
      console.error("Failed to delete from Cloudinary:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // New function to handle single image deletion
  const handleDeleteSingleImage = async (publicId: string) => {
    try {
      // Make API call to delete a single image from Cloudinary
      const response = await fetch("/api/deleteSingleImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete image");
      }

      // Update local storage and state
      const data = JSON.parse(localStorage.getItem("photoHubData") || "[]");
      const updatedData = data.filter(
        (item: any) => getPublicIdFromUrl(item.image) !== publicId
      );
      localStorage.setItem("photoHubData", JSON.stringify(updatedData));
      setUploadedItems(updatedData);
    } catch (err) {
      console.error("Failed to delete image:", err);
    }
  };

  return (
    <Container>
      <Box sx={{ p: 2 }}>
        {uploadedItems.length > 0 && (
          <Box sx={{ mb: 2, textAlign: "right" }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleOpenDialog}
            >
              Delete All Images
            </Button>
          </Box>
        )}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 4,
          }}
        >
          {uploadedItems.map((item, index) => (
            <ImageCard
              key={index}
              item={item}
              onClick={handleImageClick}
              onDelete={handleDeleteSingleImage}
            />
          ))}
        </Box>
      </Box>

      {/* Confirmation Dialog for Delete All */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete all uploaded images? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button disabled={isLoading} onClick={handleConfirmDelete} color="error" variant="contained">
            Delete All
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default HomePage;