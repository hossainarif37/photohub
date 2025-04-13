"use client";
import {
    Box,
    Button,
    Container,
    Skeleton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const HomePageSkeleton = () => {
    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Box sx={{ p: 2, flexGrow: 1 }}>
                {/* Skeleton for top search and delete bar */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        justifyContent: "space-between",
                        mb: 2,
                        gap: 2,
                    }}
                >
                    {/* Search bar skeleton */}
                    <Skeleton variant="rectangular" height={40} sx={{ borderRadius: 1, width: { xs: '100%', md: 300 }, padding: 3 }} />

                    {/* Delete button skeleton */}
                    <Skeleton variant="rectangular" height={40} width={150} sx={{ borderRadius: 1, padding: 3 }} />
                </Box>

                {/* Grid of image card skeletons */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                        gap: 4,
                        mt: 5,
                    }}
                >
                    {Array.from({ length: 12 }).map((_, index) => (
                        <Box key={index}>
                            <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
                            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(40px, 3fr))", gap: 2 }}>
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <Skeleton
                                        variant="text"
                                        width="100%"
                                        sx={{
                                            padding: "8px",
                                            borderRadius: "14px",
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Pagination Skeleton */}
            <Box sx={{ display: 'flex', justifyContent: 'end', py: 4 }}>
                <Skeleton variant="rectangular" width={100} height={36} sx={{ mx: 1, borderRadius: 1 }} />
                <Skeleton variant="rectangular" width={100} height={36} sx={{ mx: 1, borderRadius: 1 }} />
            </Box>
        </Container>
    );
};

export default HomePageSkeleton;
