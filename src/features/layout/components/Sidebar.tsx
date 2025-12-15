"use client";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from '@mui/material/Divider';
import {CSSObject, styled, Theme} from "@mui/material/styles";
import * as React from "react";
import MuiDrawer from "@mui/material/Drawer";
import {layoutSelectors} from "@/store/sidebarSlice";
import {useSelector} from 'react-redux';
import {useLayoutDispatch} from "@/store/sidebarSlice";
import { Document,Home, Star, Trash, Send } from "iconsax-react";
import theme from "@/theme";
import {useBreakpointFires} from "@/shared/hooks/useResponsive";
import { useRouter } from "next/navigation";
const drawerWidth = 240;
const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});
const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});
const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));
const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open ? openedMixin(theme) : closedMixin(theme)),
        '& .MuiDrawer-paper': open ? openedMixin(theme) : closedMixin(theme),
    })
);
const SidItems = [
    { name: "داشبورد", icon: <Home size="24" color={theme.palette.primary.main} />, route: "dashboard" },
    { name: "جدول گزارش", icon: <Star size="24" color={theme.palette.primary.main} />, route: "data-table" },
    { name: "ارسال ایمیل", icon: <Send size="24" color={theme.palette.primary.main} />, route: "send-email" },
    { name: "پیش‌نویس‌ها", icon: <Document size="24" color={theme.palette.primary.main} />, route: "drafts" },
    { name: "سطل زباله", icon: <Trash size="24" color={theme.palette.primary.main} />, route: "trash" },
];




export default function Sidebar() {
    const router = useRouter();
    const {toggleSidebar} = useLayoutDispatch();
    const open = useSelector(layoutSelectors.IsSidebarOpen)
    const { isMd } = useBreakpointFires();



    return (<>
        <Drawer variant="permanent" open={open}>
            {isMd ?
                <DrawerHeader>
                    <IconButton onClick={toggleSidebar}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </DrawerHeader>
                :
                null
            }

            <Divider/>
            <List>
                {SidItems.map((item, index) => (
                    <ListItem key={item.name} disablePadding sx={{display: 'block'}}>
                        <ListItemButton onClick={() => router.push(`/${item.route}`)}
                        sx={[
                                {
                                    minHeight: 48,
                                    px: 2.5,
                                },
                                open ? {justifyContent: 'initial',} : {justifyContent: 'center',},
                            ]}
                        >
                            <ListItemIcon
                                sx={[
                                    {
                                        minWidth: 0,
                                        justifyContent: 'center',
                                    },
                                    open ? {mr: 3,} : {mr: 'auto',},
                                ]}
                            >
                                {item.icon}
                            </ListItemIcon>


                            <ListItemText
                                primary={item.name}
                                sx={[open ? {opacity: 1,} : {opacity: 0,},]}
                            />
                        </ListItemButton>
                        {index === 2 ? <Divider /> : null}
                    </ListItem>

                ))}
            </List>
        </Drawer>
    </>);
}

