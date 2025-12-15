"use client";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {layoutSelectors, useLayoutDispatch} from "@/store/sidebarSlice";
import {useSelector} from "react-redux";
import {useBreakpointFires} from "@/shared/hooks/useResponsive";

const drawerWidth = 240;
interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
    isMd?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open' && prop !== 'isMd',
})<AppBarProps>(({ theme, open, isMd }) => ({
    zIndex: isMd ? theme.zIndex.drawer + 1 : theme.zIndex.appBar ,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: open ? drawerWidth : 0 ,
    width: open && isMd ? `calc(100% - ${drawerWidth}px)` : '100%',
}));

export default function MiniDrawer() {
    const {toggleSidebar} = useLayoutDispatch();
    const open = useSelector(layoutSelectors.IsSidebarOpen)
    const {isMd } = useBreakpointFires();

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" open={open} isMd={isMd} elevation={0}>
            <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleSidebar}
                        edge="start"
                        sx={[
                            {
                                marginRight: 5,
                            },
                            open && { display: 'none' },
                        ]}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Mini variant drawer
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}