// components/ui/ImageCard.tsx
"use client";
import { Box, Skeleton, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

const ImageCard = ({ item, onClick }: { item: any; onClick: (url: string) => void }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <Box sx={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '16px 0px', borderRadius: '8px', backgroundColor: '#fff', }}>
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    height: 200,
                    cursor: "pointer",
                    borderRadius: 2,
                    overflow: "hidden",
                }}
                onClick={() => onClick(item.image)}
            >
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
            <Box sx={{ display: "flex", gap: 1, mt: 1, padding: "0 10px" }}>
                {item.tags.map((tag: string, index: number) => (
                    <Typography
                        key={index}
                        variant="body2"
                        sx={{
                            mr: 1,
                            background: "#1976D2",
                            color: "#fff",
                            padding: "4px",
                            borderRadius: "4px",
                            fontSize: "11px",
                        }}
                    >
                        {tag}
                    </Typography>
                ))}
            </Box>
        </Box>
    );
};

export default ImageCard;
