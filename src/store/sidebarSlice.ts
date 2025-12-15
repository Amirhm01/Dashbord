"use client";
import { createSlice } from '@reduxjs/toolkit';
import { createDispatch } from '@/store/hooks';
import { RootState } from '@/store';


interface SidebarState {
    open: boolean;
}
const initialState: SidebarState = {
    open: false,
};
const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.open = !state.open;
        },
    },
});

/* selectors (اسم قبلی + آیتم‌ها اضافه شد) */
export const layoutSelectors = {
    IsSidebarOpen: (state: RootState) => state.sidebar.open,
};

/* dispatch hook (دست نخورده) */
export const useLayoutDispatch = createDispatch((dispatch) => ({
    toggleSidebar: () => dispatch(toggleSidebar()),
}));

export const { toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
