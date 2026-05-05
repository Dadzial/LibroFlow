import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from '../utils/ColorsParser';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
    theme: ThemeMode;
    toggleTheme: () => void;
    isDark: boolean;
    themeColors: typeof Colors.light;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const systemTheme = useColorScheme();
    const [theme, setTheme] = useState<ThemeMode>(systemTheme === 'dark' ? 'dark' : 'light');

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    const isDark = theme === 'dark';
    const themeColors = Colors[theme];

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isDark, themeColors }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within ThemeProvider');
    return context;
}