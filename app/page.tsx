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
} from "@mui/material";
import { useEffect, useState } from "react";
import ImageCard from "./components/ui/ImageCard";
import { getPublicIdFromUrl } from "@/utils/getPublicIdFromUrl";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EmptyImagePlaceholder from "./components/ui/EmptyImagePlaceholder";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#f1f1f1",
  '&:hover': {
    backgroundColor: "#f1f1f1",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(0),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
}));

const HomePage = () => {
  const [uploadedItems, setUploadedItems] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchText, setSearchText] = useState(""); // ✅ State to hold search query
  const { isUploaded } = useUpload();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;


  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("photoHubData") || "[]");
    setUploadedItems(data);
  }, [isUploaded]);

  const handleImageClick = (url: string) => {
    setSelectedImage(url);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = async () => {
    setIsLoading(true);
    const data = JSON.parse(localStorage.getItem("photoHubData") || "[]");
    const publicIds = data
      .map((item: any) => getPublicIdFromUrl(item.image))
      .filter(Boolean);

    try {
      await fetch("/api/deleteAllImages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicIds }),
      });

      localStorage.removeItem("photoHubData");
      setUploadedItems([]);
      setOpenDialog(false);
    } catch (err) {
      console.error("Failed to delete from Cloudinary:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSingleImage = async (publicId: string) => {
    try {
      const response = await fetch("/api/deleteSingleImage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId }),
      });

      if (!response.ok) throw new Error("Failed to delete image");

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

  // ✅ Filter images based on search text and tags
  const filteredItems = uploadedItems.filter((item) =>
    item.tags?.some((tag: string) =>
      tag.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const sourceItems = searchText ? filteredItems : uploadedItems;
  const reversedItems = [...sourceItems].reverse(); // Latest uploads first

  const totalPages = Math.ceil(reversedItems.length / itemsPerPage);

  // Calculate start and end index
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = reversedItems.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText]);


  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box sx={{ p: 2, flexGrow: 1 }}>
        {uploadedItems.length === 0 ? (
          <EmptyImagePlaceholder />
        ) : (
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", mb: 2, gap: 2 }}>
            <Search>
              <SearchIconWrapper >
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                sx={{ padding: { xs: "2px", md: 1 } }}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Search>

            <Button sx={{ ml: "auto", width: { xs: "50%", md: "auto" }, textTransform: "capitalize" }} variant="contained" color="error" onClick={handleOpenDialog}>
              <DeleteIcon sx={{ mr: 1 }} />
              Delete All
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
          {paginatedItems.map((item, index) => (
            <ImageCard
              key={index}
              item={item}
              onClick={handleImageClick}
              onDelete={handleDeleteSingleImage}
              searchText={searchText}
            />
          ))
          }
        </Box>
      </Box>

      {sourceItems.length > itemsPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'end', py: 4 }}>
          <Button
            variant="outlined"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            sx={{ mx: 1 }}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            sx={{ mx: 1 }}
          >
            Next
          </Button>
        </Box>
      )}

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
          <Button
            disabled={isLoading}
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete All
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default HomePage;
