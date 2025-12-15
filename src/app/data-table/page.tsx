"use client";
import {Stack} from "@mui/system";
import DeviceTable from "@/features/data-table/components/DataTable";
import type { Device } from "@/features/data-table/components/DataTable";
import {useEffect, useState} from "react";
import {useBreakpointFires} from "@/shared/hooks/useResponsive";




export default function Dashboard() {
    const { isMd , isSm , isXs } = useBreakpointFires();
    const [data, setData] = useState<Device[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/mock/deviceTable.json");
                const jsonData: Device[] = await res.json();
                setData(jsonData);
            } catch (error) {
                console.error("Error fetching device data:", error);
            }
        };
        fetchData();
    }, []);
    return (
        <Stack
            sx={{
                p: isMd ? 5 : 0,
                width: isMd ? "100%" : isSm ? "90%" : isXs ? "100%" : "80vh",
                bgcolor: "background.default",
                alignItems: "center",
            }}
        >
            <DeviceTable data={data} />
        </Stack>

    );
}
