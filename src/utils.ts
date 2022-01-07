export const regexPrice = /^\d+(\.\d{1,2})?$/;

export function setLocalData<T>(key: string, t: T) {
    localStorage.setItem(key, JSON.stringify(t));
}

export function getLocalData<T>(key: string): T | undefined {
    const data = localStorage.getItem(key);
    if (data)
        return JSON.parse(data);
    else
        return undefined
}