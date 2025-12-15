"use client";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import {useBreakpointFires} from "@/shared/hooks/useResponsive";

interface ChartRow {
    date: string;
    [device: string]: string | number;
}

interface DashChartProps {
    chartData: ChartRow[];
    selectedDevices: string[];
    colors: string[];
}

export default function DashChart({ chartData, selectedDevices, colors }: DashChartProps) {
    const {isMd} = useBreakpointFires();
    return (
        <ResponsiveContainer width={"100%"} height={350} style={{ }}>
            <LineChart data={chartData} margin={{ top: 0, right: isMd ? 40 : 0, left: isMd ? 0 : -25, bottom: 50 }}>
                <CartesianGrid strokeDasharray="2" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis type="number" tick={{ fontSize: 12 }} padding={{ top: 20, bottom: 20 }} />
                <Tooltip />
                <Legend
                    verticalAlign={isMd ? "top" : "bottom"}
                    align="right"
                    iconType="circle"
                    formatter={(value) => (
                        <span style={{ fontFamily: "Vazir", fontSize: 12 }}>
                        {value}
                        </span>
                    )}
                    wrapperStyle={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 8,
                        marginTop: isMd ? -20 : -30,
                        marginRight: isMd ? 0 : -10,
                    }}
                />

                {selectedDevices.map((device, index) => (
                    <Line
                        key={device}
                        type="monotone"
                        dataKey={device}
                        name={device}
                        stroke={colors[index]}
                        strokeWidth={2}
                        dot={{ r: 3 }}
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
}
