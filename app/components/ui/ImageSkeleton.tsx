import { Skeleton } from "@mui/material";

const ImageSkeleton = () => {
    return (
        <Skeleton
            variant="rectangular"
            width={200}
            height={200}
            sx={{ position: "absolute", top: 0, left: 0 }}
        />
    );
};

export default ImageSkeleton;