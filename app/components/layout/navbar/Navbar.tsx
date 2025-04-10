"use client";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { MouseEvent, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { alpha, InputBase, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FileUploadDialog from '../../ui/FileUploadDialog';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
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
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '36ch',
            '&:focus': {
                width: '44ch',
            },
        },
    },
}));

const Navbar = () => {
    const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);

    const handleUploadOpen = () => {
        setIsUploadOpen(true);
    }

    console.log(isUploadOpen);

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


                    {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'center' } }}>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Box> */}


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


                    {isUploadOpen && <FileUploadDialog open={isUploadOpen} setOpen={setIsUploadOpen} />}
                </Toolbar>
            </Container>
        </AppBar >
    );
}
export default Navbar;
