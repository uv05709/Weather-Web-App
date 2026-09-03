"use client";

import { useSyncExternalStore, useCallback } from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const serializedInitial = JSON.stringify(initialValue);

  const subscribe = useCallback(
    (callback: () => void) => {
      const storageHandler = (e: StorageEvent) => {
        if (e.key === key) callback();
      };
      window.addEventListener("storage", storageHandler);

      const customHandler = () => callback();
      window.addEventListener(`ls-update-${key}`, customHandler);

      return () => {
        window.removeEventListener("storage", storageHandler);
        window.removeEventListener(`ls-update-${key}`, customHandler);
      };
    },
    [key]
  );

  const getSnapshot = useCallback(() => {
    try {
      return window.localStorage.getItem(key) ?? serializedInitial;
    } catch {
      return serializedInitial;
    }
  }, [key, serializedInitial]);

  const getServerSnapshot = useCallback(() => {
    return serializedInitial;
  }, [serializedInitial]);

  const rawValue = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  let value: T;
  try {
    value = JSON.parse(rawValue) as T;
  } catch {
    value = initialValue;
  }

  const setValue = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      try {
        const currentRaw = window.localStorage.getItem(key);
        const current = currentRaw ? (JSON.parse(currentRaw) as T) : initialValue;
        const resolved = newValue instanceof Function ? newValue(current) : newValue;
        window.localStorage.setItem(key, JSON.stringify(resolved));
        window.dispatchEvent(new Event(`ls-update-${key}`));
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, initialValue]
  );

  return [value, setValue];
}
