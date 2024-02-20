import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import type { StoreDispatch, StoreState } from '../redux/stores';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useStoreDispatch: () => StoreDispatch = useDispatch
export const useStoreSelector: TypedUseSelectorHook<StoreState> = useSelector