import { Models } from "@/app/types";

const SETTINGS_KEY = "open-artifacts-settings";

export const getSettings = () => {
  if (typeof window === "undefined") {
    // Server-side fallback
    return {
      model: Models.claudeSonnet4,
    };
  }

  const stored = localStorage.getItem(SETTINGS_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return {
        model: parsed.model || Models.claudeSonnet4,
      };
    } catch {
      return {
        model: Models.claudeSonnet4,
      };
    }
  }

  return {
    model: Models.claudeSonnet4,
  };
};

export const updateSettings = (settings: { model: Models }) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }
};
