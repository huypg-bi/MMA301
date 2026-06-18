export const COLORS = {
    // Dark theme
    title_active: '#FFFFFF',
    body: '#E0E0E0',
    label: '#AAAAAA',
    placeholder: '#666666',
    line: '#2A2A2A',
    input_background: '#1A1A1A',
    background: '#141414',
    off_white: '#0A0A0A',

    // Accent colours (unchanged)
    primary: '#A8715A',
    secondary: '#DD8560',
} as const;

export type AppColor = keyof typeof COLORS;
