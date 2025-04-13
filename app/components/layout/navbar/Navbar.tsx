"use client";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FileUploadDialog from '../../ui/FileUploadDialog';

const Navbar = () => {
    const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);

    const handleUploadOpen = () => {
        setIsUploadOpen(true);
    }

    return (
        <AppBar position="static">
            <Container maxWidth="lg" >
                <Toolbar disableGutters sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AdbIcon sx={{ mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#"
                            sx={{
                                mr: 2,
                                display: 'flex',
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: { xs: '.2rem', md: '.3rem' },
                                color: 'inherit',
                                textDecoration: 'none',
                                fontSize: { xs: '1rem', sm: '1.5rem' }
                            }}
                        >
                            PhotoHUB
                        </Typography>
                    </Box>

                    <Button
                        onClick={handleUploadOpen}
                        variant="outlined"
                        sx={{
                            color: '#f3f3f3',
                            borderColor: '#f3f3f3',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: { xs: '4px', md: '10px' },
                            textTransform: 'capitalize',
                            fontWeight: 400
                        }}
                    >
                        <CloudUploadIcon sx={{ fontSize: { xs: '16px', md: '28px' } }} />
                        <Typography
                            variant='body1'
                            sx={{ fontSize: { xs: '12px', md: '20px' } }}
                        >
                            Upload Files
                        </Typography>
                    </Button>


                    {
                        isUploadOpen && (
                            <FileUploadDialog
                                open={isUploadOpen}
                                setOpen={setIsUploadOpen}
                            />
                        )
                    }
                </Toolbar>
            </Container>
        </AppBar >
    );
}
export default Navbar;
