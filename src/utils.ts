import { useRef, useEffect } from "react";

export const regexPrice = /^\d+(\.\d{2})$/;

export const useIsMounted = () => {
    const mounted = useRef(false);
    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);
    return mounted;
}

export const setLocalData = <T>(key: string, t: T) => {
    localStorage.setItem(key, JSON.stringify(t));
}

export const getLocalData = (key: string) => {
    const data = localStorage.getItem(key);
    if (data)
        return JSON.parse(data);
    else
        return undefined
}