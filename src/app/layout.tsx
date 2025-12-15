"use client";
import { Box, styled } from "@mui/material";
import Navbar from "@/features/layout/components/Navbar";
import Sidebar from "@/features/layout/components/Sidebar";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/store";
import { ThemeProvider } from "@mui/material";
import theme from "@/theme";
import * as React from "react";
import {useBreakpointFires} from "@/shared/hooks/useResponsive";
import MobileSIdbar from "@/features/layout/components/MobileSIdbar";

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const { isMd } = useBreakpointFires();
    return (
        <html lang="fa">
        <body>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Box sx={{ display: "flex", minHeight: "100vh" }}>
                    {isMd ? <Sidebar/> : <MobileSIdbar />}
                    <Box sx={{ flexGrow: 1, display:  "flex", flexDirection: "column" }}>
                        <Navbar />
                        <DrawerHeader/>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: "flex",
                                width: "100%",
                                backgroundColor: theme.palette.background.paper,
                            }}
                        >
                            {children}
                        </Box>
                    </Box>
                </Box>
            </ThemeProvider>
        </Provider>
        </body>
        </html>
    );
}
