"use client";
import { useEffect, useState } from "react";
import {FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, OutlinedInput, Box} from "@mui/material";
import DashChart from "@/features/dashboard/components/DashChart";
import {Stack} from "@mui/system";
import DashCard from "@/features/dashboard/components/DashCard";
import theme from "@/theme";
import {useBreakpointFires} from "@/shared/hooks/useResponsive";

interface DeviceConsumption {
    date: string;
    device: string;
    consumption: number;
}
interface ChartRow {
    date: string;
    [device: string]: string | number;
}

export default function DashPage() {
    const DEVICES = ["ماشین اصلی", "خط تولید لباس", "ماشین بسته‌بندی"];
    const COLORS = [theme.palette.primary.main, "#2e7d32", "#d32f2f"];
    const [selectedDevices, setSelectedDevices] = useState<string[]>(["ماشین اصلی"]);
    const [data, setData] = useState<DeviceConsumption[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/mock/deviceConsumption.json");
                const jsonData: DeviceConsumption[] = await res.json();
                setData(jsonData);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
        const intervalId = setInterval(fetchData, 3000);
        return () => clearInterval(intervalId);
    }, []);

    const filteredData = data.filter(d => selectedDevices.includes(d.device));
    const months = Array.from(new Set(filteredData.map(d => d.date)))
        .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    const chartData: ChartRow[] = months.map(month => {
        const row: ChartRow = { date: new Date(month).toLocaleDateString("fa-IR", { month: "short" }) };
        selectedDevices.forEach(device => {
            const deviceData = filteredData.find(d => d.device === device && d.date === month);
            row[device] = deviceData ? deviceData.consumption : 0;
        });
        return row;
    });
    const {isMd} = useBreakpointFires();
    return (
        <Stack sx={{
            p: isMd ? 5 : 2,
            gap: 3,
            width: "100%",
        }}>
            <Box>
                <DashCard />
            </Box>
            <Stack direction="column" spacing={1} sx={{boxShadow: isMd ? 2 : 0 ,px:isMd ? 3 : 0, py: isMd ? 3 : 3 ,borderRadius: isMd ? 2 : 0 ,borderTop: isMd ? "none" : "1px solid"}}>
            <FormControl sx={{ minWidth: 200 , }}>
                <InputLabel id="device-select-label" >انتخاب دستگاه‌ها</InputLabel>
                <Select
                    labelId="device-select-label"
                    multiple
                    value={selectedDevices}
                    onChange={(e) => {
                        const value = e.target.value;
                        setSelectedDevices(typeof value === "string" ? value.split("-") : value);
                    }}
                    input={<OutlinedInput label="انتخاب دستگاه . . . . ." />}
                    renderValue={(selected) => (selected as string[]).join("- ")}
                    sx={{
                        width: 350,
                        fontSize: 12,
                        '& .MuiSelect-outlined': {
                            padding: '8px',
                        },
                    }}
                >
                    {DEVICES.map((device) => (
                        <MenuItem key={device} value={device}>
                            <Checkbox checked={selectedDevices.includes(device)} size="small" />
                            <ListItemText primary={device} primaryTypographyProps={{ fontSize: 12 }} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <DashChart
                chartData={chartData}
                selectedDevices={selectedDevices}
                colors={COLORS}
            />
            </Stack>
        </Stack>
    );
}
