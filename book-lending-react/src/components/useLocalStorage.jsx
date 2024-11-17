import { useState } from 'react';

export function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            if (key == 'user') {
                return item ? JSON.parse(item) : initialValue;
            } else {
                return item ? item : initialValue;
            }
        } catch (error) {
            console.error("Error reading from localStorage", error);
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, valueToStore);
            // window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error("Error setting localStorage value", error);
        }
    };

    return [storedValue, setValue];
}
