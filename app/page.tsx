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

const HomePage = () => {
  const [uploadedItems, setUploadedItems] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
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

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    localStorage.removeItem("photoHubData");
    setUploadedItems([]);
    setOpenDialog(false);
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
            <ImageCard key={index} item={item} onClick={handleImageClick} />
          ))}
        </Box>
      </Box>

      {/* Confirmation Dialog */}
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
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete All
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default HomePage;
