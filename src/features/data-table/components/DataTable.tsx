"use client";
import React, { useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import {Box, TextField, MenuItem, Stack, Button} from "@mui/material";
import { useBreakpointFires } from "@/shared/hooks/useResponsive";
import Typography from "@mui/material/Typography";
import { exportCSV } from "@/utils/exportCSV";

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
interface DeviceTableProps {
    data: Device[];
}



export default function DeviceTable({ data }: DeviceTableProps) {
    const { isMd , isSm , isXs } = useBreakpointFires();
    const tableSize =  isMd ? "100%" : isSm ? "100%" : isXs ? "50vh" : "80vh";

    const [searchName, setSearchName] = useState("");
    const [filterId, setFilterId] = useState("");
    const [filterPerformance, setFilterPerformance] = useState("");

    const filteredItems = data.filter(item => {
        const matchName = item.name.toLowerCase().includes(searchName.toLowerCase());
        const matchId = filterId ? item.id === Number(filterId) : true;
        const matchPerformance = filterPerformance
            ? item.performance === filterPerformance
            : true;
        return matchName && matchId && matchPerformance;
    });

    const columns: TableColumn<Device>[] = useMemo(() => [
        { name: "ID", selector: row => row.id, sortable: true, width: "80px" , center: true},
        { name: "نام دستگاه", selector: row => row.name, sortable: false , center: true },
        {
            name: "عملکرد دستگاه",
            selector: row => row.performance,
            sortable: true,
            center: true,
            cell: row => (
                <span style={{ color: row.performance === "فعال" ? "green" : "red" }}>
                {row.performance}
            </span>
            )
        },
        { name: "نوع", selector: row => row.type },
        { name: "مصرف (وات)", selector: row => row.consumption, sortable: true, center: true },
        { name: "وضعیت", selector: row => row.status }
    ], []);

    const tableFontSize = isMd ? 14 : 10;
    const tablePadding = isMd ? "12px" : "6px";

    return (
        <Stack sx={{ borderRadius: 2, boxShadow: 2, backgroundColor: "background.paper", p: 2, width: tableSize }}>
            <Typography variant="h6" mb={2}>
                جدول مصرف و عملکرد دستگاه‌ها
            </Typography>

            <Box
                display="flex"
                gap={1}
                mb={2}
                flexWrap="nowrap"
                overflow="auto"
                width={tableSize}
                justifyContent= "space-between"
            >
                <Stack direction="row" spacing={isMd ? 2 : 0}
                    mt={1}
                >
                <TextField
                    label="جستجو نام"
                    size="small"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    sx={{ width: isMd ? 170 : 140 , scale: isMd ? 1 : .8 }}
                    InputLabelProps={{ sx: { fontSize: isMd ? 12 : 10 } }}
                />

                <TextField
                    label="فیلتر ID"
                    size="small"
                    type="number"
                    value={filterId}
                    onChange={(e) => setFilterId(e.target.value)}
                    sx={{ width: isMd ? 100 : 80  , scale: isMd ? 1 : .8}}
                    InputLabelProps={{ sx: { fontSize: isMd ? 12 : 10 } }}
                />

                <TextField
                    label="عملکرد دستگاه"
                    size="small"
                    select
                    value={filterPerformance}
                    onChange={(e) => setFilterPerformance(e.target.value)}
                    sx={{ minWidth: isMd ? 150 : 100 , scale: isMd ? 1 : .8 }}
                    InputLabelProps={{ sx: { fontSize: isMd ? 12 : 10 } }}
                >
                    <MenuItem value="">همه</MenuItem>
                    <MenuItem value="فعال">فعال</MenuItem>
                    <MenuItem value="غیرفعال">غیرفعال</MenuItem>
                </TextField>
                </Stack>
                <Button sx={{ scale: isMd ? 1 : .8}} variant={"contained"} onClick={() => exportCSV(filteredItems)}>
                    دانلود
                </Button>
            </Box>
                <Box
                    sx={{
                        border: "1px solid rgba(0,0,0,0.2)",
                        borderRadius: 2,
                        width: tableSize,
                        overflow: "scroll",
                    }}
                >
                    <DataTable
                        columns={columns}
                        data={filteredItems}
                        pagination
                        highlightOnHover
                        striped
                        responsive={false}
                        noDataComponent="داده‌ای برای نمایش وجود ندارد"
                        customStyles={{
                            table: {
                                style: {
                                    fontFamily: "'Vazir', sans-serif",
                                    fontSize: tableFontSize,
                                    overflow: "scroll",
                                },
                            },
                            headCells: {
                                style: {
                                    fontFamily: "'Vazir', sans-serif",
                                    fontWeight: "bold",
                                    fontSize: tableFontSize,
                                    padding: tablePadding,
                                },
                            },
                            cells: {
                                style: {
                                    fontFamily: "'Vazir', sans-serif",
                                    fontSize: tableFontSize,
                                    padding: tablePadding,
                                },
                            },
                            pagination: {
                                style: {
                                    fontSize: tableFontSize,
                                    minHeight: "40px",
                                },
                            },

                        }}
                    />

                </Box>
        </Stack>
    );
}
