// API Configuration
export const API_BASE_URL = import.meta.env.VITE_SOCKS_API_URL;

// Pagination
export const ITEMS_PER_PAGE = 10;

// Form Options
export const SOCK_SIZES = ["Small", "Medium", "Large"];
export const SOCK_CONDITIONS = ["Used", "New"];
export const FOOT_OPTIONS = ["Left", "Right", "Both"];

// Default Values
export const DEFAULT_SOCK_DATA = {
  userId: "",
  sockDetails: {
    size: "Small",
    color: "",
    pattern: "",
    material: "",
    condition: "New",
    forFoot: "Left",
  },
  additionalFeatures: {
    waterResistant: false,
    padded: false,
    antiBacterial: false,
  },
  addedTimestamp: "",
};