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

export const exportCSV = (data: Device[], fileName = "گزارش روزانه.csv") => {
    if (data.length === 0) return;

    const header = Object.keys(data[0]).join(",");
    const rows = data.map(row =>
        Object.values(row).map(val => `"${val}"`).join(",")
    ).join("\n");

    const csvContent = `${header}\n${rows}`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
};

