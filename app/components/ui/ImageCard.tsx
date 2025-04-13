"use client";
import { Box, Skeleton, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import { useState } from "react";
import { getPublicIdFromUrl } from "@/utils/getPublicIdFromUrl";
import CloseIcon from '@mui/icons-material/Close';

const ImageCard = ({
    item,
    onClick,
    onDelete,
    searchText
}: {
    item: any;
    onClick: (url: string) => void;
    onDelete?: (publicId: string) => Promise<void>;
    searchText: string;
}) => {
    const [loaded, setLoaded] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [openImageDialog, setOpenImageDialog] = useState(false);

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent image click event
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleConfirmDelete = async () => {
        if (!onDelete) return;

        setIsDeleting(true);
        try {
            const publicId = getPublicIdFromUrl(item.image);
            if (publicId) {
                await onDelete(publicId);
            }
        } catch (error) {
            console.error("Failed to delete image:", error);
        } finally {
            setIsDeleting(false);
            setOpenDialog(false);
        }
    };

    // Function to highlight the matching portion of the tag
    const renderHighlightedTag = (tag: string) => {
        if (!searchText) return tag;

        const lowerTag = tag.toLowerCase();
        const lowerSearch = searchText.toLowerCase();

        if (!lowerTag.includes(lowerSearch)) return tag;

        const startIndex = lowerTag.indexOf(lowerSearch);
        const endIndex = startIndex + lowerSearch.length;

        return (
            <>
                {tag.substring(0, startIndex)}
                <span style={{ backgroundColor: '#ffff00', color: '#000' }}>
                    {tag.substring(startIndex, endIndex)}
                </span>
                {tag.substring(endIndex)}
            </>
        );
    };

    return (
        <Box
            sx={{
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                padding: '16px 0px',
                borderRadius: '8px',
                backgroundColor: '#fff',
                position: 'relative'
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    height: 200,
                    cursor: "pointer",
                    borderRadius: 2,
                    overflow: "hidden",
                }}
                onClick={() => {
                    onClick(item.image)
                    setOpenImageDialog(true)
                }}
            >
                {/* Delete Icon - Only visible on hover */}
                {isHovering && (
                    <IconButton
                        size="small"
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                            zIndex: 2,
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 0, 0, 0.15)',
                            },
                        }}
                        onClick={handleDeleteClick}
                    >
                        <DeleteIcon fontSize="small" color="error" />
                    </IconButton>
                )}

                {!loaded && (
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        height="100%"
                        sx={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
                    />
                )}
                <Image
                    src={item.image}
                    alt="Uploaded"
                    fill
                    style={{ objectFit: "cover" }}
                    onLoad={() => setLoaded(true)}
                />
            </Box>
            <Box sx={{ display: "flex", gap: 1, mt: 1, padding: "0 10px", flexWrap: "wrap" }}>
                {item.tags.map((tag: string, index: number) => (
                    <Typography
                        key={index}
                        variant="body2"
                        sx={{
                            mr: 1,
                            background: "#1976D2",
                            color: "#fff",
                            padding: "4px 8px",
                            borderRadius: "25px",
                            fontSize: "11px",
                        }}
                    >
                        {renderHighlightedTag(tag)}
                    </Typography>
                ))}
            </Box>

            {/* Delete Confirmation Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this image? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button
                        onClick={handleConfirmDelete}
                        color="error"
                        variant="contained"
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openImageDialog} onClose={() => setOpenImageDialog(false)} maxWidth="md" fullWidth>
                <DialogActions>
                    <Button onClick={() => setOpenImageDialog(false)}>
                        <CloseIcon />
                    </Button>
                </DialogActions>
                <DialogContent sx={{ position: "relative", p: 2 }}>
                    <Image
                        src={item.image}
                        alt="Large view"
                        width={1000}
                        height={600}
                        style={{ width: "100%", height: "auto", objectFit: "contain" }}
                    />
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default ImageCard;