"use client";
import {useMemo} from 'react';
import {AppDispatch, RootState} from '@/store/index';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const createDispatch = <T extends object>(factory: (dispatch: AppDispatch) => T) => (
    (): T => {
        const dispatch = useAppDispatch();
        return useMemo(() => factory(dispatch), [dispatch]);
    }
);
