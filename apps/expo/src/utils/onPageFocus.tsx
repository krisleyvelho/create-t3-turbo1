import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

export function onFocusPage(callback: () => void) {
  useFocusEffect(
    useCallback(() => {
      callback();
      return () => {
        return null;
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, []),
  );
  return null;
}
