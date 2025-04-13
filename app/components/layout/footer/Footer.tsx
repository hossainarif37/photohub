import React from 'react';
import { Box, Container, Typography, Link, Stack, Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import AdbIcon from '@mui/icons-material/Adb';

const Footer = () => {
    return (
        <Box sx={{ bgcolor: '#1976d2', color: 'white', pt: 8, pb: 3 }}>
            <Container maxWidth="lg">
                {/* Main footer content */}
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    gap: { xs: 4, md: 2 }
                }}>
                    {/* Brand Section */}
                    <Box sx={{ width: { xs: '100%', md: '30%' } }}>
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
                                    fontSize: { xs: '1rem', sm: '2rem' }
                                }}
                            >
                                PhotoHUB
                            </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            A simple image gallery built with Next.js, TypeScript, and MUI. Upload, preview, and manage your images seamlessly with Cloudinary integration.
                        </Typography>
                    </Box>

                    {/* Navigation Links */}
                    <Box>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Explore
                        </Typography>
                        <Stack spacing={2}>
                            <Link href="#" color="inherit" sx={{ opacity: 0.7, '&:hover': { opacity: 1 } }}>
                                Home
                            </Link>
                            <Link href="#" color="inherit" sx={{ opacity: 0.7, '&:hover': { opacity: 1 } }}>
                                Gallery
                            </Link>
                            <Link href="#" color="inherit" sx={{ opacity: 0.7, '&:hover': { opacity: 1 } }}>
                                Upload
                            </Link>
                            <Link href="#" color="inherit" sx={{ opacity: 0.7, '&:hover': { opacity: 1 } }}>
                                Features
                            </Link>
                        </Stack>
                    </Box>

                    {/* Support Links */}
                    <Box>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Support
                        </Typography>
                        <Stack spacing={2}>
                            <Link href="mailto:codemine24@gmail.com" color="inherit" sx={{ opacity: 0.7, '&:hover': { opacity: 1 } }}>
                                Contact Us
                            </Link>
                            <Link href="#" color="inherit" sx={{ opacity: 0.7, '&:hover': { opacity: 1 } }}>
                                Help Center
                            </Link>
                            <Link href="#" color="inherit" sx={{ opacity: 0.7, '&:hover': { opacity: 1 } }}>
                                Feedback
                            </Link>
                        </Stack>
                    </Box>

                    {/* Legal Links */}
                    <Box>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Legal
                        </Typography>
                        <Stack spacing={2}>
                            <Link href="#" color="inherit" sx={{ opacity: 0.7, '&:hover': { opacity: 1 } }}>
                                Privacy Policy
                            </Link>
                            <Link href="#" color="inherit" sx={{ opacity: 0.7, '&:hover': { opacity: 1 } }}>
                                Terms of Service
                            </Link>
                        </Stack>
                    </Box>

                    {/* Connect Links  */}
                    <Box>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Connect
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <Link href="#" color="inherit" sx={{ opacity: 0.7, '&:hover': { opacity: 1 } }}>
                                <FacebookIcon />
                            </Link>
                            <Link href="#" color="inherit" sx={{ opacity: 0.7, '&:hover': { opacity: 1 } }}>
                                <InstagramIcon />
                            </Link>
                            <Link href="#" color="inherit" sx={{ opacity: 0.7, '&:hover': { opacity: 1 } }}>
                                <GitHubIcon />
                            </Link>
                            <Link href="#" color="inherit" sx={{ opacity: 0.7, '&:hover': { opacity: 1 } }}>
                                <LinkedInIcon />
                            </Link>
                        </Stack>
                    </Box>
                </Box>

                <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)', my: 6 }} />

                <Typography variant="body2" align="center" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    © {new Date().getFullYear()} PhotoHUB. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;