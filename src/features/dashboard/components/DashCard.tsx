import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import {Activity, DollarCircle, Cpu, PercentageCircle} from 'iconsax-react';
import theme from "@/theme";
import { IconButton } from '@mui/material';
import {Stack} from "@mui/system";
import {useEffect, useState} from "react";
import {useBreakpointFires} from "@/shared/hooks/useResponsive";
export type DevicePerformance = "فعال" | "غیرفعال";
export type DeviceStatus = "سالم" | "نیاز به بررسی";
export interface Device {
    id: number;
    name: string;
    type: string;
    consumption: number;
    performance: DevicePerformance;
    status: DeviceStatus;
}



export default function DashCard() {
    const {isMd } = useBreakpointFires();
    const [, setData] = useState<Device[]>([]);
    const [activeDevices, setActiveDevices] = useState<number>(0);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/mock/deviceTable.json");
                const jsonData: Device[] = await res.json();
                setData(jsonData);
                const activeDevices = jsonData.filter(device => device.performance === "فعال");
                setActiveDevices(activeDevices.length)
            } catch (error) {
                console.error("Error fetching device data:", error);
            }

        };
        fetchData();
        const intervalId = setInterval(fetchData, 3000); // هر 30 ثانیه
        return () => clearInterval(intervalId);
    }, []);
    const cards = [
        {
            id: 1,
            title: 'مصرف فعلی',
            description: '۱۲۰،۰۰۰،۰۰۰',
            icon: (
                <DollarCircle
                    size={40}
                    variant="Bold"
                    color={theme.palette.primary.main}
                />
            ),
        },
        {
            id: 2,
            title: 'مصرف امروز',
            description: '۲۰٪',
            icon: (
                <PercentageCircle
                    size={40}
                    variant="Bold"
                    color={theme.palette.primary.main}
                />
            ),
        },
        {
            id: 3,
            title: 'دستگاه‌های فعال',
            description: activeDevices,
            icon: (
                <Cpu
                    size={40}
                    variant="Bold"
                    color={theme.palette.primary.main}
                />
            ),
        },
        {
            id: 4,
            title: 'درصد انحراف از الگو',
            description: '۳۲٪',
            icon: (
                <Activity
                    size={40}
                    variant="Bold"
                    color={theme.palette.primary.main}
                />
            ),
        },
    ];


    return (
        <Box
            sx={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: isMd
                    ? 'repeat(4, 1fr)'
                    : 'repeat(2, 1fr)',
                gap: 4,
            }}
        >
            {cards.map((card, index) => (
                <Card key={index} sx={{ display: 'flex', height: 70, px: 2 , py:1 ,}}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <Stack direction="column" spacing={1}>
                            <Typography variant={isMd ? "subtitle1" : "caption"} sx={{ fontWeight: 'bold' }}>{card.title}</Typography>
                            <Typography variant="body2" color="text.secondary">{card.description}</Typography>
                        </Stack>
                        <IconButton
                            sx={{
                                borderRadius: '50%',
                                backgroundColor: 'theme.palette.primary.main',
                                width: isMd ? 50 : 40,
                                height: isMd ? 50 : 40,
                            }}
                        >
                            {card.icon}
                        </IconButton>
                    </Box>
                </Card>

            ))}
        </Box>

    );
}

