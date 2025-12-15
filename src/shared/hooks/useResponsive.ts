import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

/* ------------------ Device Type (by breakpoints) ------------------ */
export function useDeviceType() {
    const theme = useTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isLaptop = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const isDesktop = useMediaQuery(theme.breakpoints.between("lg", "xl"));
    const isXLMonitor = useMediaQuery(theme.breakpoints.up("xl"));

    return {
        isMobile,
        isTablet,
        isLaptop,
        isDesktop,
        isXLMonitor,
    } as const;
}

/* ------------------ Device Size (semantic) ------------------ */
export function useDeviceSize() {
    const isPortrait = useMediaQuery("(orientation: portrait)");
    const isMobile = useMediaQuery("(max-width: 600px)");
    const isTablet = useMediaQuery("(min-width: 600px) and (max-width: 960px)");

    const deviceType: "mobile" | "tablet" | "desktop" =
        isMobile ? "mobile" : isTablet ? "tablet" : "desktop";

    return {
        isMobile,
        isTablet,
        isDesktop: deviceType === "desktop",
        isPortrait,
        deviceType,
    } as const;
}

/* ------------------ Raw Breakpoint Fires ------------------ */
export function useBreakpointFires() {
    const theme = useTheme();

    return {
        isXs: useMediaQuery(theme.breakpoints.up("xs")),
        isSm: useMediaQuery(theme.breakpoints.up("sm")),
        isMd: useMediaQuery(theme.breakpoints.up("md")),
        isLg: useMediaQuery(theme.breakpoints.up("lg")),
        isXl: useMediaQuery(theme.breakpoints.up("xl")),
    } as const;
}
