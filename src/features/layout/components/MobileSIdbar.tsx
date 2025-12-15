"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {layoutSelectors, useLayoutDispatch} from "@/store/sidebarSlice";
import {useSelector} from "react-redux";
import theme from "@/theme";
import { Document,Home, Star, Trash, Send } from "iconsax-react";
import { useRouter } from "next/navigation";
import Divider from "@mui/material/Divider";

const SidItems = [
    { name: "داشبورد", icon: <Home size="24" color={theme.palette.primary.main} />, route: "dashboard" },
    { name: "جدول 'گزارش'", icon: <Star size="24" color={theme.palette.primary.main} />, route: "data-table" },
    { name: "ارسال ایمیل", icon: <Send size="24" color={theme.palette.primary.main} />, route: "send-email" },
    { name: "پیش‌نویس‌ها", icon: <Document size="24" color={theme.palette.primary.main} />, route: "drafts" },
    { name: "سطل زباله", icon: <Trash size="24" color={theme.palette.primary.main} />, route: "trash" },
];
export default function MobileSIdbar() {
    const {toggleSidebar} = useLayoutDispatch();
    const open = useSelector(layoutSelectors.IsSidebarOpen)
    const router = useRouter();
    const list = () => (
        <Box
            role="presentation"
            onClick={toggleSidebar}
            onKeyDown={toggleSidebar}
            sx={{width: 250}}
        >
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
        </Box>
    );

    return (
        <div>
            <SwipeableDrawer
                anchor="left"
                open={open}
                onClose={toggleSidebar}
                onOpen={toggleSidebar}
                PaperProps={{
                    sx: {
                        direction: "ltr",
                        zIndex: (theme) => theme.zIndex.modal + 2,
                    },
                }}
            >
                {list()}
            </SwipeableDrawer>
        </div>
    );
}
