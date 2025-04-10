"use client";

import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    Typography,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import { useCallback, useRef, useState } from "react";
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
};

const HiddenInput = styled("input")({
    display: "none",
});

const FileUploadDialog: React.FC<Props> = ({ open, setOpen }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [imageError, setImageError] = useState("");
    const [tagError, setTagError] = useState("");


    const handleClose = () => {
        setOpen(false);
        setSelectedFiles([]);
        setTags([]);
        setTagInput("");
    };

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            setSelectedFiles([...selectedFiles, ...Array.from(files)]);
            setImageError(""); // Clear error on valid input
        }

    };

    const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
        const files = event.dataTransfer.files;
        if (files) {
            setSelectedFiles([...selectedFiles, ...Array.from(files)]);
            setImageError(""); // Clear error on valid input
        }

    }, [selectedFiles]);

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleAddTag = () => {
        const trimmedTag = tagInput.trim();
        if (trimmedTag && !tags.includes(trimmedTag)) {
            setTags([...tags, trimmedTag]);
            setTagError(""); // Clear tag error
        }

        setTagInput("");
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleRemoveImage = (index: number) => {
        const newFiles = [...selectedFiles];
        newFiles.splice(index, 1);
        setSelectedFiles(newFiles);
    };

    const handleClearAllImages = () => {
        setSelectedFiles([]);
    };

    const handleSubmit = () => {
        let isValid = true;

        if (selectedFiles.length === 0) {
            setImageError("Please select at least one image.");
            isValid = false;
        } else {
            setImageError("");
        }

        if (tags.length === 0) {
            setTagError("Please add at least one tag.");
            isValid = false;
        } else {
            setTagError("");
        }

        if (!isValid) return;

        console.log("Uploaded Files:", selectedFiles);
        console.log("Tags:", tags);
        handleClose();
    };


    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Upload Image</DialogTitle>
            <DialogContent>
                {/* Drop zone */}
                <Box
                    onClick={handleClick}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    sx={{
                        border: `2px dashed ${imageError && !isDragging ? "red" : "#ccc"}`,
                        borderRadius: 2,
                        padding: 4,
                        textAlign: "center",
                        backgroundColor: isDragging ? "#f0f0f0" : "#fff",
                        cursor: "pointer",
                        transition: "background-color 0.2s",
                        mb: 1,
                        color: `${(imageError && !isDragging) && "red"}`
                    }}
                >
                    <IconButton disabled sx={{ fontSize: 48, color: "#888" }}>
                        <ImageIcon fontSize="inherit" />
                    </IconButton>
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                        Drag & drop images here
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        Drop your images here or click to browse. Supports JPG, PNG, GIF,
                        and WebP.
                    </Typography>
                    <Button variant="contained" onClick={handleClick}>
                        Select Files
                    </Button>
                    <HiddenInput
                        type="file"
                        accept="image/jpeg,image/png,image/gif,image/webp"
                        multiple
                        ref={inputRef}
                        onChange={handleFileSelect}
                    />
                </Box>
                {imageError && (
                    <Typography variant="body2" color="error" sx={{ mb: 1 }}>
                        {imageError}
                    </Typography>
                )}


                {/* Image Preview */}
                {selectedFiles.length > 0 && (
                    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
                        {selectedFiles.map((file, index) => (
                            <Box
                                key={index}
                                sx={{
                                    position: "relative",
                                    width: 80,
                                    height: 80,
                                    borderRadius: 1,
                                    overflow: "hidden",
                                    border: "1px solid #ddd",
                                }}
                            >
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={`preview-${index}`}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                                <IconButton
                                    size="small"
                                    onClick={() => handleRemoveImage(index)}
                                    sx={{
                                        position: "absolute",
                                        top: -10,
                                        right: -10,
                                        backgroundColor: "#fff",
                                        boxShadow: 1,
                                        ":hover": {
                                            backgroundColor: "#f0f0f0",
                                        },
                                    }}
                                >
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        ))}
                        <Button sx={{ ":hover": { color: "error.main" }, color: "error.main" }} onClick={handleClearAllImages}>
                            <DeleteIcon color="error" />
                            <Typography variant="body2">Clear</Typography>
                        </Button>
                    </Box>
                )}

                {/* Tags */}
                <Box display="flex" gap={1} mb={2} mt={3}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Add Tag"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddTag();
                            }
                        }}
                        error={!!tagError}
                        helperText={tagError}
                    />

                    <Button variant="outlined" onClick={handleAddTag}>
                        Add
                    </Button>
                </Box>

                <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                    {tags.map((tag) => (
                        <Chip
                            key={tag}
                            label={tag}
                            onDelete={() => handleRemoveTag(tag)}
                            deleteIcon={<CloseIcon />}
                            color="primary"
                            variant="outlined"
                        />
                    ))}
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" variant="contained" onClick={handleSubmit}>
                    Upload
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FileUploadDialog;
