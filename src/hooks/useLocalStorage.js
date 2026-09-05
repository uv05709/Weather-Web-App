"use client";

import { useSyncExternalStore, useCallback } from "react";

export function useLocalStorage(key, initialValue) {
  const serializedInitial = JSON.stringify(initialValue);

  const subscribe = useCallback(
    (callback) => {
      const storageHandler = (e) => {
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

  let value;
  try {
    value = JSON.parse(rawValue);
  } catch {
    value = initialValue;
  }

  const setValue = useCallback(
    (newValue) => {
      try {
        const currentRaw = window.localStorage.getItem(key);
        const current = currentRaw ? JSON.parse(currentRaw) : initialValue;
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
