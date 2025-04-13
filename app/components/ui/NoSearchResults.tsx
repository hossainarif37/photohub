// components/ui/NoSearchResults.tsx
import { Box, Typography } from "@mui/material";
import SearchOffIcon from '@mui/icons-material/SearchOff';

const NoSearchResults = ({ query }: { query: string }) => {
    return (
        <Box
            sx={{
                textAlign: "center",
                mt: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
            }}
        >
            <SearchOffIcon sx={{ fontSize: 80, color: "grey.500" }} />
            <Typography variant="h6" color="textSecondary">
                No results found for "<strong>{query}</strong>"
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Try checking your spelling or use different keywords.
            </Typography>
        </Box>
    );
};

export default NoSearchResults;
